import mongoose from "mongoose";

const adminActionSchema = new mongoose.Schema(
  {
    adminAuthId: {
      type: String,
      required: true,
      index: true,
    },
    actionType: {
      type: String, // e.g. BLOCK_USER, FORCE_CANCEL_SOS, etc.
      required: true,
    },
    targetType: {
      type: String, // e.g. "user", "mechanic", "sos", "system"
      required: true,
    },
    targetId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
    meta: {
      // any extra info
    },
  },
  { timestamps: true }
);

const AdminAction =
  mongoose.models.AdminAction ||
  mongoose.model("AdminAction", adminActionSchema);

// Repo functions
export const createAdminAction = async (data) => {
  const action = new AdminAction(data);
  return action.save();
};

export const listAdminActions = async ({ limit = 50, skip = 0 } = {}) => {
  return AdminAction.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const getAdminActionsByTarget = async (targetType, targetId) => {
  return AdminAction.find({ targetType, targetId }).sort({ createdAt: -1 });
};
