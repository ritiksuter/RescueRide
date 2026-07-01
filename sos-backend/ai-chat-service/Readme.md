# AI Chat Service

AI Chat Service is the RAG-powered assistant for the SOS application. It accepts user questions, retrieves relevant knowledge from Pinecone, and generates contextual answers using the Gemini model.

## What the service does

- Exposes a health check endpoint for service monitoring
- Provides an authenticated chat endpoint for asking questions
- Uses embeddings and vector search for relevant context retrieval
- Returns the generated answer together with source references

## Main features

- Express.js-based backend service
- JWT-based request authentication
- Gemini integration for answer generation
- Pinecone integration for semantic document retrieval
- Environment-based configuration for API keys and models

## API endpoints

### Health check

- GET /health
- Returns service status information

### Chat

- POST /api/chat
- Requires a Bearer token in the Authorization header
- Request body:
  ```json
  {
    "query": "How do I jump start a car battery?"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "answer": "...",
      "sources": [
        {
          "documentName": "manual.pdf",
          "pageNumber": 3,
          "score": 0.91
        }
      ]
    }
  }
  ```

## Environment variables

Create a .env file with the following variables:

```env
PORT=8007
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CHAT_MODEL=gemini-2.0-flash
EMBEDDING_MODEL=text-embedding-004
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_pinecone_index
PINECONE_NAMESPACE=your_namespace
```

## Installation and run

```bash
npm install
npm run dev
```

For production:

```bash
npm start
```

## Tech stack

- Node.js
- Express.js
- JWT
- Google Gemini
- Pinecone
- Dotenv
