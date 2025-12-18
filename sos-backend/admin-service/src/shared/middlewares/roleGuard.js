export const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(403).json({ message: "Role not found in token" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    next();
  };
};
