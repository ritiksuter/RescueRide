# AI Chat Service

AI Chat Service is the document-aware assistant for the SOS application. It can answer user questions using information that has already been ingested into the system, rather than relying only on a static prompt.

## What the service does

- Exposes a health check endpoint for service monitoring
- Accepts user chat queries through a dedicated API route
- Converts each question into an embedding
- Searches a vector database for the most relevant document chunks
- Builds a context-aware prompt and sends it to Gemini
- Returns the final answer together with source references

## Latest addition: Retrieval-Augmented Generation (RAG) workflow

The most important improvement in this service is the new RAG-based chat flow. This makes the assistant much more useful because it can answer questions based on uploaded knowledge sources such as PDFs, manuals, or support documents.

### How the new flow works

1. User question received
   - A user sends a query such as "How do I jump start a car battery?"
   - The request reaches the chat controller and is passed to the chat service.

2. Query embedding generation
   - The question is converted into a numeric vector using the Gemini embedding model.
   - This allows the system to understand the meaning of the query, not just the exact keywords.

3. Semantic retrieval from Pinecone
   - The service sends the embedding to Pinecone.
   - Pinecone searches the stored document vectors and returns the most relevant chunks.
   - These chunks are the pieces of knowledge most likely to contain the answer.

4. Prompt construction
   - The retrieved content is assembled into a structured prompt.
   - The prompt tells Gemini to answer only from the provided context and avoid making up information.

5. Answer generation with sources
   - Gemini generates a final answer based on the retrieved context.
   - The response also includes source metadata such as the document name, page number, and similarity score.

### Why this is valuable

- The assistant is no longer limited to generic responses.
- It can answer from real uploaded documents.
- It improves reliability by grounding the answer in retrieved content.
- It makes responses easier to trust because the user can see the source information.

This is the latest and most important upgrade in the service because it turns the AI chat module into a knowledge-based assistant rather than a simple text generator.

## How it works with the PDF ingestion pipeline

The chat service is designed to work together with the PDF ingestion service:

- Documents are uploaded and processed by the PDF ingestion service.
- Their content is split into smaller chunks.
- Each chunk is embedded and stored in Pinecone.
- When a user asks a question, the chat service retrieves the most relevant chunks and uses them to generate the answer.

In simple terms, the PDF ingestion service builds the knowledge base, and the AI chat service uses that knowledge base to answer questions.

## Main components

- chat.routes.js: exposes the chat endpoint
- chat.controller.js: validates the request and returns the response
- chat.service.js: coordinates the full RAG flow
- embedding.service.js: creates embeddings from the user query
- retrieval.service.js: queries Pinecone for relevant chunks
- prompt.service.js: builds the instruction prompt for Gemini
- gemini.service.js: sends the prompt to the Gemini model

## API endpoints

### Health check

- GET /health
- Returns service status information

### Chat

- POST /api/chat
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
        "score": 0.91,
        "metadata": {
          "documentName": "manual.pdf",
          "pageNumber": 3,
          "text": "..."
        }
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
- Google Gemini
- Pinecone
- Dotenv
