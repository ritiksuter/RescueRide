import logger from "../utils/logger.js";

const authMiddleware = (req, res, next) => {
  try {
    // Temporary bypass for local testing
    if (process.env.NODE_ENV === "development") {
      req.user = {
        id: "test-user-123",
        role: "user",
      };

      return next();
    }

    const internalSecret =
      req.headers["x-internal-secret"];

    if (
      internalSecret !==
      process.env.INTERNAL_SECRET
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized service",
      });
    }

    const userId =
      req.headers["x-user-id"];

    const userRole =
      req.headers["x-user-role"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized: User ID missing",
      });
    }

    req.user = {
      id: userId,
      role: userRole || "user",
    };

    next();
  } catch (error) {
    logger.error(
      `Auth Middleware Error: ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authMiddleware;