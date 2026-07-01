import { getPineconeIndex } from "../config/pinecone.js";
import logger from "../utils/logger.js";

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
      throw new Error(
        "No embedded chunks provided"
      );
    }

    const pineconeIndex = getPineconeIndex();

    // One namespace per document
    const namespace = `doc-${documentId}`;

    const vectors = embeddedChunks.map(
      (chunk) => ({
        id: `${documentId}-chunk-${chunk.chunkIndex}`,

        // Embedding vector
        values: chunk.embedding,

        // Metadata used during retrieval
        metadata: {
          documentId: String(documentId),
          fileName: fileName || "",
          uploadedBy: String(uploadedBy || ""),
          chunkIndex: chunk.chunkIndex,

          // Pinecone metadata size limits
          text: chunk.content.slice(0, 4000),
        },
      })
    );

    await pineconeIndex
      .namespace(namespace)
      .upsert(vectors);

    logger.info(
      `Stored ${vectors.length} vectors in namespace: ${namespace}`
    );

    return {
      namespace,
      totalVectors: vectors.length,
    };
  } catch (error) {
    logger.error(
      `Pinecone Storage Failed: ${error.message}`
    );

    throw error;
  }
};

export default storeVectorsInPinecone;