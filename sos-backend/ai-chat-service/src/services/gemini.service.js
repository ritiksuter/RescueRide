import ai from "../config/gemini.js";

class GeminiService {
  async generateAnswer(prompt) {
    try {
      const response = await ai.models.generateContent({
        model: process.env.CHAT_MODEL,
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      throw new Error("Failed to generate AI response.");
    }
  }
}

export default new GeminiService();
