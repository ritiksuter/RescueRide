import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const redis = new Redis(REDIS_URL);

export const initEventSubscriber = (io) => {
  const channels = ["sos_events", "mechanic_events", "tracking_events"];

  redis.subscribe(...channels, (err, count) => {
    if (err) {
      console.error("Failed to subscribe to Redis channels:", err);
      return;
    }
    console.log(`Subscribed to ${count} Redis channels: ${channels.join(", ")}`);
  });

  redis.on("message", (channel, message) => {
    try {
      const event = JSON.parse(message);
      handleEvent(io, channel, event);
    } catch (err) {
      console.error("Error parsing event message:", err, message);
    }
  });
};

const handleEvent = (io, channel, event) => {
  const { type, payload } = event;

  switch (channel) {
    // =======================
    // SOS EVENTS
    // =======================
    case "sos_events": {
      switch (type) {
        case "SOS_CREATED": {
          const { sosId, userId, mechanicIds = [] } = payload;

          // Notify user (if connected)
          if (userId) {
            io.to(`user:${userId}`).emit("sos:created", payload);
          }

          // Notify mechanics about new SOS (could be based on zone, etc.)
          mechanicIds.forEach((mid) => {
            io.to(`mechanic:${mid}`).emit("sos:new", payload);
          });

          // Notify admins
          io.to("admins").emit("sos:new", payload);
          break;
        }

        case "SOS_STATUS_UPDATED": {
          const { sosId, userId } = payload;

          if (sosId) {
            io.to(`sos:${sosId}`).emit("sos:status-updated", payload);
          }
          if (userId) {
            io.to(`user:${userId}`).emit("sos:status-updated", payload);
          }
          break;
        }

        default:
          console.log("Unhandled SOS event type:", type);
      }
      break;
    }

    // =======================
    // MECHANIC EVENTS
    // =======================
    case "mechanic_events": {
      switch (type) {
        case "MECHANIC_ASSIGNED": {
          const { sosId, mechanicId, userId } = payload;

          if (mechanicId) {
            io.to(`mechanic:${mechanicId}`).emit(
              "mechanic:assigned-to-sos",
              payload
            );
          }
          if (userId) {
            io.to(`user:${userId}`).emit("sos:mechanic-assigned", payload);
          }
          if (sosId) {
            io.to(`sos:${sosId}`).emit("sos:mechanic-assigned", payload);
          }
          break;
        }

        default:
          console.log("Unhandled mechanic event type:", type);
      }
      break;
    }

    // =======================
    // TRACKING EVENTS
    // =======================
    case "tracking_events": {
      switch (type) {
        case "LOCATION_UPDATED": {
          const { sosId } = payload;
          if (sosId) {
            // All subscribers to this SOS tracking get updates
            io.to(`sos:${sosId}`).emit("tracking:location-updated", payload);
            io.to(`tracking:${sosId}`).emit("tracking:location-updated", payload);
          }
          break;
        }

        case "TRIP_COMPLETED": {
          const { sosId, userId, mechanicId } = payload;
          if (sosId) io.to(`sos:${sosId}`).emit("tracking:trip-completed", payload);
          if (userId) io.to(`user:${userId}`).emit("tracking:trip-completed", payload);
          if (mechanicId)
            io.to(`mechanic:${mechanicId}`).emit(
              "tracking:trip-completed",
              payload
            );
          break;
        }

        default:
          console.log("Unhandled tracking event type:", type);
      }
      break;
    }

    default:
      console.log("Received event for unknown channel:", channel);
  }
};
