import ai from "../config/gemini.js";

class EmbeddingService {
  async generateEmbedding(text) {
    try {
      const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: text,
      });

      console.dir(response, { depth: null });

      return response.embeddings[0].values;
    } catch (error) {
      console.error("========== EMBEDDING ERROR ==========");
      console.error(error);

      if (error.response) {
        console.error(error.response);
      }

      if (error.message) {
        console.error(error.message);
      }

      throw error;
    }
  }
}
export default new EmbeddingService();
