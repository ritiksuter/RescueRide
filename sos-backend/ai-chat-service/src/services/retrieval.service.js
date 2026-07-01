import { index } from "../config/pinecone.js";

class RetrievalService {
    async searchRelevantChunks(embedding, topK = 5) {
        try {
            const response = await index
                .namespace(process.env.PINECONE_NAMESPACE)
                .query({
                    vector: embedding,
                    topK,
                    includeMetadata: true,
                });

            return response.matches || [];

        } catch (error) {
            console.error("Pinecone Retrieval Error:", error);
            throw new Error("Failed to retrieve relevant documents.");
        }
    }

}

export default new RetrievalService();