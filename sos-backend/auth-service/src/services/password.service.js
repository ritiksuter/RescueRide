import { hashPassword, comparePassword } from "../utils/hash.js";

export const hashUserPassword = async (password) => {
  return hashPassword(password);
};

export const isPasswordValid = async (password, passwordHash) => {
  return comparePassword(password, passwordHash);
};
