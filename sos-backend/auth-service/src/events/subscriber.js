import Redis from "ioredis";
import { config } from "../config/env.js";
import { UserAuth } from "../models/UserAuth.model.js";

export const redis = new Redis(config.REDIS_URL, {
  enableReadyCheck: false,
});

export const initAuthEventSubscriber = () => {
  const channels = ["mechanic_events", "user_events"]; // e.g. for future commands

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

const handleAuthCommand = async (channel, type, payload) => {
  if(channel === "user_events" && type === "USER_PROFILE_UPDATED") {
      await UserAuth.updateOne(
        { _id: payload.authUserId },
        {
          $set: {
            name: payload.profile.name,
            email: payload.profile.email,
            phone: payload.profile.phone
          }
        }
      );

      console.log("User profile synced");
  }

  if(channel === "mechanic_events" && type === "MECHANIC_PROFILE_UPDATED") {
      await UserAuth.updateOne(
        { _id: payload.mechanicAuthUserId },
        {
          $set: {
            name: payload.profile.name,
            email: payload.profile.email,
            phone: payload.profile.phone
          }
        }
      );

      console.log("Mechanic profile synced");
  }

  // Reserved for future: e.g. FORCE_LOGOUT, DISABLE_USER, etc.
}
