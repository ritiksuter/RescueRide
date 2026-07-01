import express from "express";
import cors from "cors";
import morgan from "morgan";

import documentRoutes from "./routes/document.routes.js";
import logger from "./utils/logger.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * HTTP Request Logger
 * Morgan + custom logger stream
 */
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

/**
 * Health Check Route
 */
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    service: "pdf-ingestion-service",
    status: "healthy",
    timestamp: new Date(),
  });
});

/**
 * API Routes
 */
app.use("/api/documents", documentRoutes);

/**
 * Global 404 Handler
 */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  logger.error(err.stack);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;