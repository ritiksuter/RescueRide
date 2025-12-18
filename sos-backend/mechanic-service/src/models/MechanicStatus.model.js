import mongoose from "mongoose";
import { MECHANIC_STATUS } from "../../shared/constants/status.js"; // adjust path if needed

const mechanicStatusSchema = new mongoose.Schema(
  {
    mechanicAuthUserId: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(MECHANIC_STATUS),
      default: MECHANIC_STATUS.OFFLINE,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const MechanicStatus = mongoose.model(
  "MechanicStatus",
  mechanicStatusSchema
);
