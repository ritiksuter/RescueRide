import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import chatRoutes from "./routes/chat.routes.js";

const app = express();

/*
 * Security Headers
 */
app.use(helmet());

/*
 * Request Logger
 */
app.use(morgan("dev"));

/*
 * Parse JSON Request Body
 */
app.use(express.json());

/*
 * Health Check
 */
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    service: "AI Chat Service",
    status: "Running",
  });
});

/*
 * Routes
 */
app.use("/api/chat", chatRoutes);

/*
 * 404 Handler
 */
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
