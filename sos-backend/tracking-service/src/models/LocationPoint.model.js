import mongoose from "mongoose";

const locationPointSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrackingSession",
      required: true,
      index: true,
    },
    sosId: {
      type: String,
      required: true,
      index: true,
    },
    mechanicAuthId: {
      type: String,
      required: true,
      index: true,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    recordedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

export const LocationPoint = mongoose.model(
  "LocationPoint",
  locationPointSchema
);
