import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ MongoDB connected (admin-service)");
  } catch (err) {
    console.error("❌ MongoDB connection error (admin-service):", err.message);
    process.exit(1);
  }
};
