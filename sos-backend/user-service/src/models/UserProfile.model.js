import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    make: String,          // e.g. "Honda"
    model: String,         // e.g. "Activa 6G"
    plateNumber: String,   // registration number
    vehicleType: String,   // e.g. "bike", "car"
    year: Number,
    color: String,
  },
  { _id: true }
);

const userProfileSchema = new mongoose.Schema(
  {
    authUserId: {
      type: String, // store auth-service _id as string
      required: true,
      unique: true,
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
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    vehicles: [vehicleSchema],
  },
  {
    timestamps: true,
  }
);

export const UserProfile = mongoose.model("UserProfile", userProfileSchema);
