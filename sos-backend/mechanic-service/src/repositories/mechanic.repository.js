import { MechanicProfile } from "../models/MechanicProfile.model.js";

export const createProfileFromAuthEvent = async ({
  id,
  name,
  email,
  phone,
}) => {
  const exists = await MechanicProfile.findOne({ authUserId: id });
  if (exists) return exists;

  const profile = new MechanicProfile({
    authUserId: id,
    name,
    email,
    phone,
  });

  return profile.save();
};

export const findByAuthUserId = async (authUserId) => {
  return MechanicProfile.findOne({ authUserId });
};

export const updateProfile = async (authUserId, updateData) => {
  return MechanicProfile.findOneAndUpdate(
    { authUserId },
    { $set: updateData },
    { new: true }
  );
};

export const getMechanicById = async (authUserId) => {
  return MechanicProfile.findOne({ authUserId });
};

export const getMechanicsByIds = async (authUserIds) => {
  return MechanicProfile.find({ authUserId: { $in: authUserIds } });
};
