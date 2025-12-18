import Redis from "ioredis";
import { config } from "../config/env.js";
import { createProfileFromAuthEvent } from "../repositories/mechanic.repository.js";

const r = new Redis(config.REDIS_URL);

export const redis = new Redis(config.REDIS_URL, {
  enableReadyCheck: false
});

export const initMechanicEventSubscriber = () => {
  const channels = ["user_events", "mechanic_commands"];

  redis.subscribe(...channels, (err, count) => {
    if (err) {
      console.error("mechanic-service: failed to subscribe Redis:", err);
      return;
    }
    console.log(
      `mechanic-service subscribed to ${count} channels: ${channels.join(", ")}`
    );
  });

  redis.on("message", async (channel, message) => {
    try {
      const { type, payload } = JSON.parse(message);
      await handleEvent(channel, type, payload);
    } catch (err) {
      console.error("mechanic-service: failed to parse Redis message", err);
    }
  });
};

const handleEvent = async (channel, type, payload) => {
  if (channel === "user_events") {
    switch (type) {
      case "USER_CREATED": {
        if (payload.role === "mechanic") {
          console.log("mechanic-service: creating mechanic profile", payload);
          await createProfileFromAuthEvent(payload);
        }
        break;
      }
      default:
        break;
    }
  }

  if (channel === "mechanic_commands") {
    console.log("mechanic-service: mechanic command received:", {
      type,
      payload,
    });
    // Future: FORCE_OFFLINE, BLOCK_MECHANIC, etc.
  }
};
