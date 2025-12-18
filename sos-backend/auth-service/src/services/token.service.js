import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { addRefreshToken, removeRefreshToken } from "../repositories/auth.repository.js";

export const generateTokens = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await addRefreshToken(user._id, refreshToken);

  return { accessToken, refreshToken };
};

export const rotateRefreshToken = async (oldToken) => {
  const decoded = verifyRefreshToken(oldToken);

  // In real world, you may check if token exists in DB first
  await removeRefreshToken(decoded.id, oldToken);

  const payload = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };

  const accessToken = signAccessToken(payload);
  const newRefreshToken = signRefreshToken(payload);

  await addRefreshToken(decoded.id, newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken, user: payload };
};
