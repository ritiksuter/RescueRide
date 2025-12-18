import mongoose from "mongoose";

const mechanicProfileSchema = new mongoose.Schema(
  {
    authUserId: {
      type: String, // auth-service user ID as string
      unique: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    serviceTypes: [
      {
        type: String, // e.g. "tyre", "battery", "towing", "general"
      },
    ],
    experienceYears: {
      type: Number,
      default: 0,
    },
    workshopName: {
      type: String,
      trim: true,
    },
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
    baseLocation: {
      lat: Number,
      lng: Number,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export const MechanicProfile = mongoose.model(
  "MechanicProfile",
  mechanicProfileSchema
);
