import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ user, roles }) => {
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet context={{ user }} />;
};

export default ProtectedRoute;
