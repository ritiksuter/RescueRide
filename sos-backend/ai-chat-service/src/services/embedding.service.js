import ai from "../config/gemini.js";

class EmbeddingService {
  async generateEmbedding(text) {
    try {
      const response = await ai.models.embedContent({
        model: "text-embedding-004",
        contents: text,
      });

      return response.embeddings[0].values;
    } catch (error) {
      console.error("Embedding Generation Error:", error);
      throw new Error("Failed to generate embedding.");
    }
  }
}
export default new EmbeddingService();
