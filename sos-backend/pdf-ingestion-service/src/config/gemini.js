import { GoogleGenAI } from "@google/genai";
import logger from "../utils/logger.js";

let geminiClient;

/**
 * Initialize Gemini Client
 */
const genAI = () => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is missing in .env"
      );
    }

    geminiClient = new GoogleGenAI({
      apiKey,
    });

    logger.info(
      "Gemini client initialized successfully"
    );
  } catch (error) {
    logger.error(
      `Gemini Initialization Failed: ${error.message}`
    );
    throw error;
  }
};

/**
 * Get Gemini Client
 */
const getGeminiClient = () => {
  if (!geminiClient) {
    throw new Error(
      "Gemini client not initialized. Call connectGemini() first."
    );
  }

  return geminiClient;
};

export {
  genAI,
  getGeminiClient,
};