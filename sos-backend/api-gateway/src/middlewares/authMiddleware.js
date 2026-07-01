import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

/**
 * Authenticate JWT Token
 *
 * Expected Header:
 * Authorization: Bearer <token>
 */
export const authenticate = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authorization token is missing or invalid",
      });
    }

    const token =
      authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Access token is required",
      });
    }

    const decoded = jwt.verify(
      token,
      config.JWT_SECRET
    );

    /**
     * Attach authenticated user
     */
    req.user = {
      userId:
        decoded.userId || decoded.id,
      email:
        decoded.email || null,
      role:
        decoded.role || "user",
    };

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
};

/**
 * Admin-only Access
 *
 * Used for:
 * - PDF upload
 * - Admin routes
 * - Re-indexing
 */
export const authorizeAdmin = (
  req,
  res,
  next
) => {
  try {
    if (
      !req.user ||
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Admin access required",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Authorization failed",
    });
  }
};