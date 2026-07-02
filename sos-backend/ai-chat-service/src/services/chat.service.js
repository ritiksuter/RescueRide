import embeddingService from "./embedding.service.js";
import retrievalService from "./retrieval.service.js";
import promptService from "./prompt.service.js";
import geminiService from "./gemini.service.js";

class ChatService {
  async askQuestion(question) {
    // Step 1: Generate query embedding
    const embedding = await embeddingService.generateEmbedding(question);

    // Step 2: Retrieve relevant chunks
    const matches = await retrievalService.searchRelevantChunks(embedding);

    // Step 3: Build prompt
    const prompt = promptService.buildPrompt(question, matches);

    // Step 4: Generate AI response
    const answer = await geminiService.generateAnswer(prompt);

    // Step 5: Return response
    return {
      answer,
      sources: matches.map((match) => ({
        score: match.score,
        metadata: match.metadata,
      })),
    };
  }
}

export default new ChatService();
