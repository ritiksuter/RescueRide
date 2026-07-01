# PDF Ingestion Service

The PDF Ingestion Service provides a document upload and processing pipeline for the SOS backend.
It converts uploaded PDF content into embeddings and stores those embeddings in Pinecone.

## Structure

- `src/app.js` — Express application setup
- `src/server.js` — Service startup
- `src/config/` — External service and database configuration
- `src/controllers/` — API controllers
- `src/routes/` — Express routes
- `src/services/` — PDF ingestion, chunking, embedding, and Pinecone services
- `src/workers/` — Background ingestion worker(s)
- `src/models/` — Mongoose document model
- `src/middlewares/` — Auth and upload middleware
- `src/utils/` — Logger and common responses

## Running

1. Copy `.env.example` to `.env` and configure values.
2. Install dependencies: `npm install`
3. Start service: `npm run dev`

## Notes

This service is scaffolded for the PDF ingestion workflow and can be extended with real Pinecone/OpenAI handlers.
