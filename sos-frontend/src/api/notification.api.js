import { io } from "socket.io-client";
import { SOCKET_URL } from "../config/env";
import { storage, TOKEN_KEYS } from "../utils/storage";

let socket;

export const connectNotificationSocket = () => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    auth: {
      token: storage.get(TOKEN_KEYS.ACCESS),
    },
  });

  return socket;
};

export const disconnectNotificationSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getNotificationSocket = () => socket;
