import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    authUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },

    name: String,
    email: String,
    role: String,
    phone: String,
  },
  { timestamps: true }
);

export const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);