import Redis from "ioredis";
import { config } from "../config/env.js";
import { AdminUser } from "../models/adminUser.model.js";

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
      await handleAdminEvent(channel, type, payload);
    } catch (err) {
      console.error("admin-service: failed to parse Redis message", err);
    }
  });
};

const handleAdminEvent = async (channel, type, payload) => {
  try {

    if (channel === "user_events" && type === "USER_CREATED") {
      console.log("Hello");
      const exists = await AdminUser.findOne({
        authUserId: payload._id,
      });

      if (!exists) {
        await AdminUser.create({
          authUserId: payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
          phone: payload.phone,
        });
      }

      console.log("Admin User Created");
    }

    if (channel === "user_events" && type === "USER_PROFILE_UPDATED") {

      await AdminUser.updateOne(
        { authUserId: payload.authUserId },
        {
          $set: {
            name: payload.profile.name,
            email: payload.profile.email,
            phone: payload.profile.phone,
          },
        }
      );

      console.log("Admin User Updated");
    }

  } catch (err) {
    console.error(err);
  }
};