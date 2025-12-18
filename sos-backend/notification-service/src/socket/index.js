import { authenticateSocket } from "../utils/socketAuth.js";
import { registerSosEvents } from "./sosEvents.js";
import { registerMechanicEvents } from "./mechanicEvents.js";
import { registerTrackingEvents } from "./trackingEvents.js";

export const initSocket = (io) => {
  // Global socket authentication middleware
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    const user = socket.user || {};
    const { id: userId, role } = user;

    console.log("Client connected:", { userId, role });

    // Basic room strategy
    if (userId) {
      socket.join(`user:${userId}`);
    }

    if (role === "mechanic") {
      socket.join(`mechanic:${userId}`);
    }

    if (role === "admin") {
      socket.join("admins");
    }

    // Register feature-specific handlers
    registerSosEvents(io, socket);
    registerMechanicEvents(io, socket);
    registerTrackingEvents(io, socket);

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected:", { userId, role, reason });
    });
  });
};
