import { registerUser, loginUser, getProfile } from "../services/auth.service.js";
import { rotateRefreshToken } from "../services/token.service.js";
import { success, failure } from "../utils/response.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return failure(res, "Name, email and password are required", 400);
    }

    const result = await registerUser({ name, email, password, phone, role });

    return success(res, "User registered successfully", {
      user: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone,
        role: result.user.role,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    }, 201);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return failure(res, "Email and password are required", 400);
    }

    const result = await loginUser({ email, password });

    return success(res, "Login successful", {
      user: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone,
        role: result.user.role,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return failure(res, "Refresh token is required", 400);
    }

    const { accessToken, refreshToken: newRefreshToken, user } =
      await rotateRefreshToken(refreshToken);

    return success(res, "Token refreshed", {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    });
  } catch (err) {
    return failure(res, err.message, err.status || 401);
  }
};

export const meController = async (req, res) => {
  try {
    // req.user.id is set by middleware
    const profile = await getProfile(req.user.id);
    return success(res, "Profile fetched", profile);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

// Simple verify middleware (local to auth-service)
export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      return failure(res, "No token provided", 401);
    }

    const token = header.split(" ")[1];
    if (!token) {
      return failure(res, "Invalid token format", 401);
    }

    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return failure(res, "Invalid or expired token", 401);
  }
};
