import mongoose from "mongoose";
import { AdminAction } from "../models/adminAction.model.js";

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
