import { MechanicStatus } from "../models/MechanicStatus.model.js";

export const getStatusByAuthUserId = async (mechanicAuthUserId) => {
  return MechanicStatus.findOne({ mechanicAuthUserId });
};

export const upsertStatus = async (mechanicAuthUserId, statusData) => {
  return MechanicStatus.findOneAndUpdate(
    { mechanicAuthUserId },
    {
      $set: {
        ...statusData,
        lastUpdatedAt: new Date(),
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};

export const getAllAvailableStatuses = async () => {
  return MechanicStatus.find({ status: "available" }); // MECHANIC_STATUS.AVAILABLE if you want constant
};
