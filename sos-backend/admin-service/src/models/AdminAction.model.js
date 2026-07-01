import mongoose from "mongoose";

const adminActionSchema = new mongoose.Schema(
  {
    adminAuthId: {
      type: String,
      required: true,
      index: true,
    },
    actionType: {
      type: String,
      required: true,
    },
    targetType: {
      type: String,
      required: true,
    },
    targetId: {
      type: String,
      required: true,
    },
    reason: String,
    meta: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const AdminAction =
  mongoose.models.AdminAction ||
  mongoose.model("AdminAction", adminActionSchema);