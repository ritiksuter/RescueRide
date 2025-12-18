import { io } from "socket.io-client";
import { SOCKET_URL } from "../config/env";
import { storage, TOKEN_KEYS } from "../utils/storage";

let socket = null;

export const connectSocket = () => {
  if (socket) return socket;

  const token = storage.get(TOKEN_KEYS.ACCESS);

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    auth: {
      token,
    },
  });

  socket.on("connect", () => {
    console.log("🔌 Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket error:", err.message);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
