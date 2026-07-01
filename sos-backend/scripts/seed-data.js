/**
 * Seed Script for Local Development
 *
 * Run from project root:
 * node scripts/seed-data.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config({
  path: "./auth-service/.env"
});

/**
 * Mongo URI
 */
const authMongoUri =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/sos-auth";

/**
 * Auth User Schema
 */
const userAuthSchema =
  new mongoose.Schema(
    {
      name: String,

      email: {
        type: String,
        unique: true,
      },

      phone: String,

      passwordHash: String,

      role: {
        type: String,
        enum: [
          "user",
          "mechanic",
          "admin",
        ],
        default: "user",
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

const UserAuth =
  mongoose.models.UserAuth ||
  mongoose.model(
    "UserAuth",
    userAuthSchema
  );

/**
 * Hash Password Helper
 */
const hashPassword =
  async (plainPassword) => {
    const salt =
      await bcrypt.genSalt(10);

    return bcrypt.hash(
      plainPassword,
      salt
    );
  };

async function main() {
  try {
    console.log(
      "🔗 Connecting to MongoDB..."
    );

    await mongoose.connect(
      authMongoUri
    );

    console.log(
      "✅ MongoDB Connected"
    );

    const defaultPassword =
      await hashPassword(
        "password123"
      );

    /**
     * Seed Users
     */
    const seedUsers = [
      {
        name: "Test User",
        email:
          "user@example.com",
        phone:
          "9999999999",
        role: "user",
        passwordHash:
          defaultPassword,
      },

      {
        name:
          "Test Mechanic",
        email:
          "mechanic@example.com",
        phone:
          "8888888888",
        role: "mechanic",
        passwordHash:
          defaultPassword,
      },

      {
        name:
          "System Admin",
        email:
          "admin@example.com",
        phone:
          "7777777777",
        role: "admin",
        passwordHash:
          defaultPassword,
      },

      /**
       * AI Admin
       * specifically for
       * PDF uploads
       */
      {
        name:
          "Knowledge Admin",
        email:
          "aiadmin@example.com",
        phone:
          "6666666666",
        role: "admin",
        passwordHash:
          defaultPassword,
      },
    ];

    for (const user of seedUsers) {
      const existing =
        await UserAuth.findOne({
          email: user.email,
        });

      if (existing) {
        console.log(
          `ℹ️ Already exists: ${user.email}`
        );
        continue;
      }

      const created =
        await UserAuth.create(
          user
        );

      console.log(
        `✅ Created: ${created.email} (role=${created.role})`
      );
    }

    console.log("");
    console.log(
      "🚀 Local development seed completed successfully"
    );
    console.log("");
    console.log(
      "Default Password: password123"
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Seed Script Failed:",
      error.message
    );

    process.exit(1);
  }
}

main();