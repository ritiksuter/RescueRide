import mongoose from "mongoose";
import { SOS_STATUS } from "../../shared/constants/status.js"; // adjust path if needed

const sosRequestSchema = new mongoose.Schema(
  {
    userAuthId: {
      type: String,
      required: true,
      index: true,
    },
    mechanicAuthId: {
      type: String,
      default: null,
      index: true,
    },
    sosType: {
      type: String, // e.g. "breakdown", "accident", "fuel", "battery", etc.
      default: "breakdown",
    },
    problemDescription: {
      type: String,
      trim: true,
    },
    userLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    vehicle: {
      make: String,
      model: String,
      plateNumber: String,
      vehicleType: String, // car / bike / etc.
      color: String,
    },
    status: {
      type: String,
      enum: Object.values(SOS_STATUS),
      default: SOS_STATUS.PENDING,
      index: true,
    },
    assignment: {
      distanceKm: Number,
      estimatedArrivalMinutes: Number,
      assignedAt: Date,
    },
    cancelledBy: {
      type: String, // "user" | "mechanic" | "admin"
      default: null,
    },
    meta: {
      // any additional info we want to store
    },
  },
  {
    timestamps: true,
  }
);

export const SosRequest = mongoose.model("SosRequest", sosRequestSchema);
