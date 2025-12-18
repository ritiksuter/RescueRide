import jwt from "jsonwebtoken";

export const authenticateSocket = (socket, next) => {
  try {
    // Token can be passed via:
    // - socket.io auth: io.connect({ auth: { token } })
    // - query string: ?token=...
    const token =
      socket.handshake.auth?.token || socket.handshake.query?.token;

    if (!token) {
      return next(new Error("Authentication token is required"));
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.warn("JWT_SECRET is not set in environment");
      return next(new Error("Server misconfiguration"));
    }

    const decoded = jwt.verify(token, secret);

    // Attach user to socket object
    socket.user = decoded; // { id, role, ... }
    return next();
  } catch (err) {
    console.error("Socket auth error:", err.message);
    return next(new Error("Invalid or expired token"));
  }
};
