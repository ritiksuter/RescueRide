import express from "express";
import cors from "cors";
import morgan from "morgan";

import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { initAuthEventSubscriber } from "./events/subscriber.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "auth-service" });
});

// Routes
app.use("/auth", authRoutes);

// Start server + DB
const start = async () => {
  await connectDB();
  initAuthEventSubscriber();

  app.listen(config.PORT, () => {
    console.log(`🚀 auth-service running on port ${config.PORT}`);
  });
};

start().catch((err) => {
  console.error("auth-service failed to start:", err);
  process.exit(1);
});

export default app;
