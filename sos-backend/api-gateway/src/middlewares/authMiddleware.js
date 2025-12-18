import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Access token required" });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
