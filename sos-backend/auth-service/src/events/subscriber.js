import Redis from "ioredis";
import { config } from "../config/env.js";

const r = new Redis(config.REDIS_URL);

export const redis = new Redis(config.REDIS_URL, {
  enableReadyCheck: false
});

export const initAuthEventSubscriber = () => {
  const channels = ["auth_commands"]; // e.g. for future commands

  redis.subscribe(...channels, (err, count) => {
    if (err) {
      console.error("auth-service: failed to subscribe Redis:", err);
      return;
    }
    console.log(`auth-service subscribed to ${count} channels: ${channels.join(", ")}`);
  });

  redis.on("message", (channel, message) => {
    try {
      const { type, payload } = JSON.parse(message);
      handleAuthCommand(channel, type, payload);
    } catch (err) {
      console.error("auth-service: failed to parse Redis message", err);
    }
  });
};

const handleAuthCommand = (channel, type, payload) => {
  console.log("auth-service received command:", { channel, type, payload });
  // Reserved for future: e.g. FORCE_LOGOUT, DISABLE_USER, etc.
};
