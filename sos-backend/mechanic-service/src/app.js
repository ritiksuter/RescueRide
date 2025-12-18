import express from "express";
import cors from "cors";
import morgan from "morgan";

import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import mechanicRoutes from "./routes/mechanic.routes.js";
import { initMechanicEventSubscriber } from "./events/subscriber.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "mechanic-service" });
});

app.use("/mechanic", mechanicRoutes);

const start = async () => {
  await connectDB();
  initMechanicEventSubscriber();

  app.listen(config.PORT, () => {
    console.log(`🚀 mechanic-service running on port ${config.PORT}`);
  });
};

start().catch((err) => {
  console.error("mechanic-service failed to start:", err);
  process.exit(1);
});

export default app;
