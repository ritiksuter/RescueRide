import { getGeminiClient } from "../config/gemini.js";
import logger from "../utils/logger.js";

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

const generateEmbeddings = async (
  text,
  retries = 3
) => {
  try {
    const client = getGeminiClient();

    const response =
      await client.models.embedContent({
        model: "gemini-embedding-001",
        contents: text,
      });

    return response.embeddings[0].values;
  } catch (error) {
    const status =
      error?.error?.code ||
      error?.status;

    if (
      status === 429 &&
      retries > 0
    ) {
      logger.warn(
        `Rate limit exceeded. Waiting 15 seconds... (${retries} retries left)`
      );

      await sleep(15000);

      return generateEmbeddings(
        text,
        retries - 1
      );
    }

    logger.error(
      `Embedding Generation Failed: ${
        JSON.stringify(error)
      }`
    );

    throw error;
  }
};

export default generateEmbeddings;