import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import { connectPinecone } from "./config/pinecone.js";
import { genAI } from "./config/gemini.js";

import {
  initializeQueue,
} from "./services/queue.service.js";

import logger from "./utils/logger.js";

const PORT = process.env.PORT || 8010;

let server;

/**
 * Bootstrap server
 */
const startServer = async () => {
  try {
    /**
     * MongoDB Connection
     */
    await connectDB();
    logger.info(
      "MongoDB connected successfully"
    );

    /**
     * Redis Connection
     */
    await connectRedis();
    logger.info(
      "Redis connected successfully"
    );

    /**
     * Pinecone Connection
     */
    await connectPinecone();
    logger.info(
      "Pinecone connected successfully"
    );

    /**
     * Gemini Client Initialization
     */
    genAI();
    logger.info(
      "Gemini initialized successfully"
    );

    /**
     * BullMQ Queue Initialization
     */
    initializeQueue();
    logger.info(
      "BullMQ Queue initialized successfully"
    );

    /**
     * Start Express Server
     */
    server = app.listen(PORT, () => {
      logger.info(
        `PDF Ingestion Service running on port ${PORT}`
      );

      logger.info(
        `Environment: ${
          process.env.NODE_ENV ||
          "development"
        }`
      );
    });
  } catch (error) {
    logger.error(
      `Server startup failed: ${error.message}`
    );

    process.exit(1);
  }
};

/**
 * Uncaught Exceptions
 */
process.on(
  "uncaughtException",
  (error) => {
    logger.error(
      `Uncaught Exception: ${error.stack || error.message}`
    );

    process.exit(1);
  }
);

/**
 * Unhandled Promise Rejections
 */
process.on(
  "unhandledRejection",
  (reason) => {
    logger.error(
      `Unhandled Rejection: ${reason}`
    );

    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }
);

/**
 * Graceful Shutdown
 */
process.on("SIGTERM", () => {
  logger.info(
    "SIGTERM received. Shutting down gracefully..."
  );

  if (server) {
    server.close(() => {
      logger.info(
        "Server closed successfully."
      );

      process.exit(0);
    });
  }
});

process.on("SIGINT", () => {
  logger.info(
    "SIGINT received. Shutting down gracefully..."
  );

  if (server) {
    server.close(() => {
      logger.info(
        "Server closed successfully."
      );

      process.exit(0);
    });
  }
});

startServer();