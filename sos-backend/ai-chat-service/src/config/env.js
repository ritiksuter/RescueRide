import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT,

  jwtSecret: process.env.JWT_SECRET,

  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    chatModel: process.env.CHAT_MODEL,
    embeddingModel: process.env.EMBEDDING_MODEL,
  },

  pinecone: {
    apiKey: process.env.PINECONE_API_KEY,
    indexName: process.env.PINECONE_INDEX_NAME,
    namespace: process.env.PINECONE_NAMESPACE,
  },
};

export default config;
