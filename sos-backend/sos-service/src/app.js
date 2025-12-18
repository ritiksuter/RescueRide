import express from "express";
import cors from "cors";
import morgan from "morgan";

import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import sosRoutes from "./routes/sos.routes.js";
import { initSosEventSubscriber } from "./events/subscriber.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "sos-service" });
});

app.use("/sos", sosRoutes);

const start = async () => {
  await connectDB();
  initSosEventSubscriber();

  app.listen(config.PORT, () => {
    console.log(`🚀 sos-service running on port ${config.PORT}`);
  });
};

start().catch((err) => {
  console.error("sos-service failed to start:", err);
  process.exit(1);
});

export default app;
