import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    const conn = await mongoose.connect(mongoURI, {
      dbName: process.env.DB_NAME || "pdf_ingestion_service",
    });

    logger.info(
      `MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    logger.error(
      `MongoDB Connection Failed: ${error.message}`
    );
    process.exit(1); 
  }
};

export default connectDB;