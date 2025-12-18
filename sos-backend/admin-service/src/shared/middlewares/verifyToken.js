import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};
