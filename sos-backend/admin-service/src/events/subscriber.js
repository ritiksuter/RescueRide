import Redis from "ioredis";
import { config } from "../config/env.js";

const r = new Redis(config.REDIS_URL);

export const redis = new Redis(config.REDIS_URL, {
  enableReadyCheck: false
});

export const initAdminEventSubscriber = () => {
  const channels = ["sos_events", "mechanic_events", "user_events"];

  redis.subscribe(...channels, (err, count) => {
    if (err) {
      console.error("admin-service: failed to subscribe Redis:", err);
      return;
    }
    console.log(
      `admin-service subscribed to ${count} channels: ${channels.join(", ")}`
    );
  });

  redis.on("message", async (channel, message) => {
    try {
      const { type, payload } = JSON.parse(message);
      // For now, just log; later you can aggregate stats, etc.
      console.log("admin-service: event received:", { channel, type });
    } catch (err) {
      console.error("admin-service: failed to parse Redis message", err);
    }
  });
};
