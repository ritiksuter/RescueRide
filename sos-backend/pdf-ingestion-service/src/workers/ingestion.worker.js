import { Worker } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";
import { connectRedis } from "../config/redis.js";
import { connectPinecone } from "../config/pinecone.js";
import { genAI } from "../config/gemini.js";

import extractTextFromPDF from "../services/pdf.service.js";
import chunkText from "../services/chunking.service.js";
import storeVectorsInPinecone from "../services/pinecone.service.js";
import generateEmbeddings from "../services/embedding.service.js";

import Document from "../models/document.model.js";
import logger from "../utils/logger.js";

const QUEUE_NAME =
  process.env.QUEUE_NAME ||
  "pdf-ingestion-queue";

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

const startWorker = async () => {
  try {
    /**
     * Initialize dependencies
     */
    await connectDB();
    logger.info("MongoDB connected");

    const redisConnection =
      await connectRedis();
    logger.info("Redis connected");

    await connectPinecone();
    logger.info("Pinecone connected");

    genAI();
    logger.info("Gemini initialized");

    /**
     * Create BullMQ Worker
     */
    const worker = new Worker(
      QUEUE_NAME,

      async (job) => {
        const { documentId } =
          job.data;

        logger.info(
          `Processing document: ${documentId}`
        );

        const document =
          await Document.findOne({
            documentId,
          });

        if (!document) {
          throw new Error(
            "Document not found"
          );
        }

        /**
         * Update status
         */
        document.ingestionStatus =
          "PROCESSING";

        await document.save();

        /**
         * Extract PDF text
         */
        const pdfData =
          await extractTextFromPDF(
            document.filePath
          );

        /**
         * Chunk text
         */
        const chunks =
          await chunkText(
            pdfData.text
          );

        logger.info(
          `Generated ${chunks.length} chunks`
        );

        /**
         * Generate embeddings
         */
        const embeddedChunks = [];

        for (
          let i = 0;
          i < chunks.length;
          i++
        ) {
          logger.info(
            `Embedding ${
              i + 1
            }/${chunks.length}`
          );

          const embedding =
            await generateEmbeddings(
              chunks[i].content
            );

          embeddedChunks.push({
            ...chunks[i],
            embedding,
          });

          /**
           * Prevent Gemini rate limits
           */
          await sleep(1000);
        }

        logger.info(
          "All embeddings generated"
        );

        /**
         * Store vectors in Pinecone
         */
        const result =
          await storeVectorsInPinecone({
            documentId,
            fileName:
              document.fileName,
            uploadedBy:
              document.uploadedBy,
            embeddedChunks,
          });

        document.pineconenamespace =
          result.namespace;

        /**
         * Mark completed
         */
        document.ingestionStatus =
          "COMPLETED";

        document.totalChunks =
          chunks.length;

        await document.save();

        logger.info(
          `Document ${documentId} processed successfully`
        );
      },

      {
        connection:
          redisConnection,

        // Process one document at a time
        concurrency: 1,
      }
    );

    /**
     * Worker completed
     */
    worker.on(
      "completed",
      (job) => {
        logger.info(
          `Job ${job.id} completed`
        );
      }
    );

    /**
     * Worker failed
     */
    worker.on(
      "failed",
      async (job, error) => {
        logger.error(
          `Job ${job?.id} failed: ${error.message}`
        );

        if (
          job?.data?.documentId
        ) {
          await Document.findOneAndUpdate(
            {
              documentId:
                job.data.documentId,
            },
            {
              ingestionStatus:
                "FAILED",
              ingestionError:
                error.message,
            }
          );
        }
      }
    );

    logger.info(
      "PDF ingestion worker started"
    );
  } catch (error) {
    logger.error(
      `Worker startup failed: ${error.message}`
    );

    process.exit(1);
  }
};

startWorker();