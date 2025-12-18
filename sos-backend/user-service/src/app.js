import express from "express";
import cors from "cors";
import morgan from "morgan";

import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import { initUserEventSubscriber } from "./events/subscriber.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "user-service" });
});

app.use("/user", userRoutes);

const start = async () => {
  await connectDB();
  initUserEventSubscriber();

  app.listen(config.PORT, () => {
    console.log(`🚀 user-service running on port ${config.PORT}`);
  });
};

start().catch((err) => {
  console.error("user-service failed to start:", err);
  process.exit(1);
});

export default app;
