import express from "express";
import cors from "cors";
import morgan from "morgan";

import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import trackingRoutes from "./routes/tracking.routes.js";
import { initTrackingEventSubscriber } from "./events/subscriber.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "tracking-service" });
});

app.use("/tracking", trackingRoutes);

const start = async () => {
  await connectDB();
  initTrackingEventSubscriber();

  app.listen(config.PORT, () => {
    console.log(`🚀 tracking-service running on port ${config.PORT}`);
  });
};

start().catch((err) => {
  console.error("tracking-service failed to start:", err);
  process.exit(1);
});

export default app;
