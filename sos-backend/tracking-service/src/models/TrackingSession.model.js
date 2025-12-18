import mongoose from "mongoose";

const trackingSessionSchema = new mongoose.Schema(
  {
    sosId: {
      type: String,
      required: true,
      index: true,
    },
    userAuthId: {
      type: String,
      required: true,
      index: true,
    },
    mechanicAuthId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
      index: true,
    },
    latestLocation: {
      lat: Number,
      lng: Number,
      at: Date,
    },
    meta: {
      // any extra info
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const TrackingSession = mongoose.model(
  "TrackingSession",
  trackingSessionSchema
);
