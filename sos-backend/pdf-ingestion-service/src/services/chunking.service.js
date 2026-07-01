import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import logger from "../utils/logger.js";

/**
 * Chunk text for Gemini embeddings
 */
const chunkText = async (
  text,
  options = {}
) => {
  try {
    if (!text?.trim()) {
      throw new Error(
        "No text provided for chunking"
      );
    }

    const {
      // Better defaults for Gemini
      chunkSize = 800,
      chunkOverlap = 150,
    } = options;

    const textSplitter =
      new RecursiveCharacterTextSplitter({
        chunkSize,
        chunkOverlap,

        /**
         * Preserve paragraphs first
         */
        separators: [
          "\n\n",
          "\n",
          ". ",
          "? ",
          "! ",
          " ",
          "",
        ],
      });

    const chunks =
      await textSplitter.splitText(text);

    const formattedChunks =
      chunks.map((chunk, index) => ({
        chunkIndex: index,
        content: chunk,
        metadata: {
          length: chunk.length,
        },
      }));

    logger.info(
      `Generated ${formattedChunks.length} chunks`
    );

    return formattedChunks;
  } catch (error) {
    logger.error(
      `Chunking failed: ${error.message}`
    );
    throw error;
  }
};

export default chunkText;