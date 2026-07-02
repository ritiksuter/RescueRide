import { getPineconeIndex } from "../config/pinecone.js";
import logger from "../utils/logger.js";

const BATCH_SIZE =
  Number(process.env.PINECONE_BATCH_SIZE) || 10;

/**
 * Store embedded chunks in Pinecone
 */
const storeVectorsInPinecone = async ({
  documentId,
  fileName,
  uploadedBy,
  embeddedChunks = [],
}) => {
  try {
    if (!documentId) {
      throw new Error("documentId is required");
    }

    if (!embeddedChunks.length) {
      throw new Error("No embedded chunks provided");
    }

    const namespace = `doc-${documentId}`;

    const pineconeNamespace =
      getPineconeIndex().namespace(namespace);

    const vectors = embeddedChunks.map((chunk) => ({
      id: `${documentId}-chunk-${chunk.chunkIndex}`,
      values: chunk.embedding,
      metadata: {
        documentId: String(documentId),
        fileName: fileName || "",
        uploadedBy: String(uploadedBy || ""),
        chunkIndex: chunk.chunkIndex,

        // Chunk size is already ~800 chars, no need to slice to 4000
        text: chunk.content,
      },
    }));

    logger.info(
      `Uploading ${vectors.length} vectors to Pinecone...`
    );

    for (
      let i = 0;
      i < vectors.length;
      i += BATCH_SIZE
    ) {
      const batch = vectors.slice(
        i,
        i + BATCH_SIZE
      );

      const payloadSize = Buffer.byteLength(
        JSON.stringify(batch),
        "utf8"
      );

      logger.info(
        `Batch ${i / BATCH_SIZE + 1} | ${batch.length} vectors | ${(payloadSize / 1024).toFixed(2)} KB`
      );

      await pineconeNamespace.upsert(batch);
    }

    logger.info(
      `Successfully stored ${vectors.length} vectors in namespace: ${namespace}`
    );

    return {
      namespace,
      totalVectors: vectors.length,
    };
  } catch (error) {
    logger.error(
      `Pinecone Storage Failed: ${error.message}`,
      error
    );

    throw error;
  }
};

export default storeVectorsInPinecone;