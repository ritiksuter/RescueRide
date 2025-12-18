import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import { Server } from "socket.io";

import { initSocket } from "./socket/index.js";
import { initEventSubscriber } from "./events/subscriber.js";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 9007;

// HTTP middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "notification-service" });
});

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*", // in prod, restrict to your frontend domain
    methods: ["GET", "POST"],
  },
});

// Initialize socket layers
initSocket(io);

// Initialize event subscriber (from message broker, e.g. Redis)
initEventSubscriber(io);

server.listen(PORT, () => {
  console.log(`Notification service listening on port ${PORT}`);
});
