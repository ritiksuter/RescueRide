import {
  findByAuthUserId,
  updateProfile,
} from "../repositories/user.repository.js";

export const getUserProfile = async (authUserId) => {
  const profile = await findByAuthUserId(authUserId);

  if (!profile) {
    const error = new Error("User profile not found");
    error.status = 404;
    throw error;
  }

  return profile;
};

export const updateUserProfile = async (authUserId, payload) => {
  const profile = await updateProfile(authUserId, payload);

  if (!profile) {
    const error = new Error("User profile not found");
    error.status = 404;
    throw error;
  }

  return profile;
};
