/**
 * Simple seed script for local dev.
 * Run from repo root:
 *   node scripts/seed-data.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./auth-service/.env" }); // load at least MONGO_URI for auth

const authMongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/sos-auth";

// ---- Auth User model (inline) ----
const userAuthSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    passwordHash: String,
    role: { type: String, enum: ["user", "mechanic", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UserAuth = mongoose.model("UserAuth", userAuthSchema);

// very simple bcrypt helper
import bcrypt from "bcryptjs";

const hashPassword = async (plain) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
};

async function main() {
  console.log("🔗 Connecting to Mongo (auth)...", authMongoUri);
  await mongoose.connect(authMongoUri);

  console.log("🧹 Clearing existing seed users (only if needed)...");
  // Comment next line if you don't want to clear:
  // await UserAuth.deleteMany({});

  const password = await hashPassword("password123");

  const seedUsers = [
    {
      name: "Test User",
      email: "user@example.com",
      phone: "9999999999",
      role: "user",
      passwordHash: password,
    },
    {
      name: "Test Mechanic",
      email: "mechanic@example.com",
      phone: "8888888888",
      role: "mechanic",
      passwordHash: password,
    },
    {
      name: "Admin",
      email: "admin@example.com",
      phone: "7777777777",
      role: "admin",
      passwordHash: password,
    },
  ];

  for (const u of seedUsers) {
    const existing = await UserAuth.findOne({ email: u.email });
    if (existing) {
      console.log(`ℹ️ User already exists: ${u.email}`);
      continue;
    }
    const created = await UserAuth.create(u);
    console.log(`✅ Created user: ${created.email} (role=${created.role})`);
  }

  console.log("✅ Seeding done.");
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed script error:", err);
  process.exit(1);
});
