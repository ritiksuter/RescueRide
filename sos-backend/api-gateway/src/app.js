import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { rateLimiter } from "./middlewares/rateLimiter.js";
import { config } from "./config/env.js";

/**
 * Routes
 */
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import mechanicRoutes from "./routes/mechanic.routes.js";
import sosRoutes from "./routes/sos.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import documentRoutes from "./routes/document.routes.js";
import aiChatRoutes from "./routes/aiChat.routes.js";

const app = express();

/**
 * Security Middleware
 */
app.use(helmet());

/**
 * Core Middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/**
 * Global Rate Limiter
 */
app.use(rateLimiter);

/**
 * Health Check
 */
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    status: "UP",
    service: "API-GATEWAY",
  });
});

/**
 * Existing Service Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/tracking", trackingRoutes);

/**
 * Admin Routes
 */
app.use("/api/admin", adminRoutes);

/**
 * PDF Knowledge Base Routes
 */
app.use(
  "/api/admin/documents",
  documentRoutes
);

/**
 * AI Chat Routes
 */
app.use(
  "/api/ai/chat",
  aiChatRoutes
);

/**
 * 404 Handler
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
  console.error(
    "Global Error:",
    err.message
  );

  return res.status(
    err.statusCode || 500
  ).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

const PORT =
  config.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `🚀 API Gateway running on port ${PORT}`
  );
});