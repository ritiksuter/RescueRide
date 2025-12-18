import express from "express";
import cors from "cors";
import morgan from "morgan";

import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import { initAdminEventSubscriber } from "./events/subscriber.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "admin-service" });
});

app.use("/admin", adminRoutes);
app.use("/admin/stats", statsRoutes);

const start = async () => {
  await connectDB();
  initAdminEventSubscriber();

  app.listen(config.PORT, () => {
    console.log(`🚀 admin-service running on port ${config.PORT}`);
  });
};

start().catch((err) => {
  console.error("admin-service failed to start:", err);
  process.exit(1);
});

export default app;