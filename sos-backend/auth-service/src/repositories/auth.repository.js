import { UserAuth } from "../models/UserAuth.model.js";

export const findByEmail = async (email) => {
  return UserAuth.findOne({ email });
};

export const findById = async (id) => {
  return UserAuth.findById(id);
};

export const createUser = async (userData) => {
  const user = new UserAuth(userData);
  return user.save();
};

export const addRefreshToken = async (userId, token) => {
  return UserAuth.findByIdAndUpdate(
    userId,
    {
      $push: { refreshTokens: { token } },
    },
    { new: true }
  );
};

export const removeRefreshToken = async (userId, token) => {
  return UserAuth.findByIdAndUpdate(
    userId,
    {
      $pull: { refreshTokens: { token } },
    },
    { new: true }
  );
};
