import Redis from "ioredis";
import { config } from "../config/env.js";
import { createProfileFromAuthEvent } from "../repositories/user.repository.js";

const r = new Redis(config.REDIS_URL);

export const redis = new Redis(config.REDIS_URL, {
  enableReadyCheck: false
});

export const initUserEventSubscriber = () => {
  const channels = ["user_events"];

  redis.subscribe(...channels, (err, count) => {
    if (err) {
      console.error("user-service: failed to subscribe Redis:", err);
      return;
    }
    console.log(
      `user-service subscribed to ${count} channels: ${channels.join(", ")}`
    );
  });

  redis.on("message", async (channel, message) => {
    try {
      const { type, payload } = JSON.parse(message);
      await handleUserEvent(channel, type, payload);
    } catch (err) {
      console.error("user-service: failed to parse Redis message", err);
    }
  });
};

const handleUserEvent = async (channel, type, payload) => {
  if (channel !== "user_events") return;

  switch (type) {
    case "USER_CREATED": {
      console.log("user-service: handling USER_CREATED", payload);
      await createProfileFromAuthEvent(payload);
      break;
    }

    default:
      console.log("user-service: unhandled user event type:", type);
  }
};
