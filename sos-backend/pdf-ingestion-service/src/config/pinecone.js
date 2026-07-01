import { Pinecone } from "@pinecone-database/pinecone";
import logger from "../utils/logger.js";

let pineconeClient;
let pineconeIndex;

/**
 * Initialize Pinecone Client
 */
const connectPinecone = async () => {
  try {
    const apiKey = process.env.PINECONE_API_KEY;
    const indexName = process.env.PINECONE_INDEX_NAME;

    if (!apiKey) {
      throw new Error("PINECONE_API_KEY is missing in .env");
    }

    if (!indexName) {
      throw new Error("PINECONE_INDEX_NAME is missing in .env");
    }

    pineconeClient = new Pinecone({
      apiKey,
    });

    pineconeIndex = pineconeClient.index(indexName);

    await pineconeIndex.describeIndexStats();

    logger.info(`Pinecone connected: ${indexName}`);
  } catch (error) {
    logger.error(
      `Pinecone Connection Failed: ${error.message}`
    );
    throw error;
  }
};

/**
 * Get Pinecone Index
 */
const getPineconeIndex = () => {
  if (!pineconeIndex) {
    throw new Error(
      "Pinecone not initialized. Call connectPinecone() first."
    );
  }

  return pineconeIndex;
};

export {
  connectPinecone,
  getPineconeIndex,
};