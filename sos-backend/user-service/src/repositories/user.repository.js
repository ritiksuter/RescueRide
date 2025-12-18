import { UserProfile } from "../models/UserProfile.model.js";

export const createProfileFromAuthEvent = async ({
  id,
  name,
  email,
  phone,
}) => {
  const exists = await UserProfile.findOne({ authUserId: id });
  if (exists) return exists;

  const profile = new UserProfile({
    authUserId: id,
    name,
    email,
    phone,
  });

  return profile.save();
};

export const findByAuthUserId = async (authUserId) => {
  return UserProfile.findOne({ authUserId });
};

export const updateProfile = async (authUserId, updateData) => {
  return UserProfile.findOneAndUpdate(
    { authUserId },
    { $set: updateData },
    { new: true }
  );
};

// VEHICLES

export const getVehicles = async (authUserId) => {
  const profile = await UserProfile.findOne(
    { authUserId },
    { vehicles: 1, _id: 0 }
  );
  return profile?.vehicles || [];
};

export const addVehicle = async (authUserId, vehicleData) => {
  return UserProfile.findOneAndUpdate(
    { authUserId },
    { $push: { vehicles: vehicleData } },
    { new: true }
  );
};

export const updateVehicle = async (authUserId, vehicleId, updateData) => {
  return UserProfile.findOneAndUpdate(
    { authUserId, "vehicles._id": vehicleId },
    {
      $set: Object.fromEntries(
        Object.entries(updateData).map(([key, value]) => [
          `vehicles.$.${key}`,
          value,
        ])
      ),
    },
    { new: true }
  );
};

export const removeVehicle = async (authUserId, vehicleId) => {
  return UserProfile.findOneAndUpdate(
    { authUserId },
    { $pull: { vehicles: { _id: vehicleId } } },
    { new: true }
  );
};
