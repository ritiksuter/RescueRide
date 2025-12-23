import express from "express";
import cors from "cors";
import morgan from "morgan";

import { rateLimiter } from "./middlewares/rateLimiter.js";
import { config } from "./config/env.js";

// Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import mechanicRoutes from "./routes/mechanic.route.js";
import sosRoutes from "./routes/sos.route.js";
import trackingRoutes from "./routes/tracking.route.js";
import adminRoutes from "./routes/admin.route.js";

const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(rateLimiter);


app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/mechanic", mechanicRoutes);
app.use("/sos", sosRoutes);
app.use("/tracking", trackingRoutes);
app.use("/admin", adminRoutes);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "API-GATEWAY",
  });
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
