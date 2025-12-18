import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken, meAuthApi } from "../api/auth.api";

/**
 * ProtectedRoute
 * - Checks if user is authenticated
 * - Optionally checks allowedRoles
 * - Fetches /auth/me to get user info
 */
export const ProtectedRoute = ({
  allowedRoles, // e.g. ['user'], ['mechanic'], ['admin']
  redirectTo = "/login",
}) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isAuth: false,
    user: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setAuthState({ isAuth: false, user: null });
          setLoading(false);
          return;
        }

        const res = await meAuthApi();
        const user = res.data?.data;

        // Optional role check
        if (
          allowedRoles &&
          allowedRoles.length > 0 &&
          user &&
          !allowedRoles.includes(user.role)
        ) {
          setAuthState({ isAuth: false, user: null });
        } else {
          setAuthState({ isAuth: true, user });
        }
      } catch (err) {
        console.error("ProtectedRoute auth check failed:", err);
        setAuthState({ isAuth: false, user: null });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [allowedRoles]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
          <p className="text-xs text-gray-500">Checking access…</p>
        </div>
      </div>
    );
  }

  if (!authState.isAuth) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location }}
      />
    );
  }

  // Option 1: wrap children directly (if used as wrapper)
  // Option 2: Use Outlet for nested routes
  return <Outlet context={{ user: authState.user }} />;
};
