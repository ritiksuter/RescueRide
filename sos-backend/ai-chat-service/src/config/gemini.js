import { GoogleGenAI } from "@google/genai";
import config from "./env.js";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
}

const ai = new GoogleGenAI({
    apiKey: config.gemini.apiKey,
});

export default ai;