import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "../layout/ProtectedRoute";

// Layouts
import { AuthLayout } from "../layout/AuthLayout";
import { UserLayout } from "../layout/UserLayout";
import { MechanicLayout } from "../layout/MechanicLayout";
import { AdminLayout } from "../layout/AdminLayout";

// Auth pages
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterUserPage } from "../pages/auth/RegisterUserPage";
import { RegisterMechanicPage } from "../pages/auth/RegisterMechanicPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";

// User pages
import { UserDashboardPage } from "../pages/user/UserDashboardPage";
import { SosCreatePage } from "../pages/user/SosCreatePage";
import { SosHistoryPage } from "../pages/user/SosHistoryPage";
import { UserTrackingPage } from "../pages/user/UserTrackingPage";

// Mechanic pages
import { MechanicDashboardPage } from "../pages/mechanic/MechanicDashboardPage";
import { MechanicJobsPage } from "../pages/mechanic/MechanicJobsPage";
import { MechanicProfilePage } from "../pages/mechanic/MechanicProfilePage";
import { MechanicTrackingPage } from "../pages/mechanic/MechanicTrackingPage";

// Admin pages
import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "../pages/admin/AdminUsersPage";
import { AdminMechanicsPage } from "../pages/admin/AdminMechanicsPage";
import { AdminSosMonitorPage } from "../pages/admin/AdminSosMonitorPage";
import { AdminLogsPage } from "../pages/admin/AdminLogsPage";

// Error pages
import { NotFoundPage } from "../pages/error/NotFoundPage";
import { UnauthorizedPage } from "../pages/error/UnauthorizedPage";

// Auth context
import { useAuth } from "../hooks/useAuth";

const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterUserPage />} />
          <Route
            path="/auth/register-mechanic"
            element={<RegisterMechanicPage />}
          />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
        </Route>

        {/* USER ROUTES */}
        <Route
          path="/user"
          element={
            <ProtectedRoute user={user} roles={["user"]} />
          }
        >
          <Route element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboardPage />} />
            <Route path="sos/create" element={<SosCreatePage />} />
            <Route path="sos/history" element={<SosHistoryPage />} />
            <Route
              path="sos/:sosId/tracking"
              element={<UserTrackingPage />}
            />
          </Route>
        </Route>

        {/* MECHANIC ROUTES */}
        <Route
          path="/mechanic"
          element={
            <ProtectedRoute user={user} roles={["mechanic"]} />
          }
        >
          <Route element={<MechanicLayout />}>
            <Route
              path="dashboard"
              element={<MechanicDashboardPage />}
            />
            <Route path="jobs" element={<MechanicJobsPage />} />
            <Route
              path="profile"
              element={<MechanicProfilePage />}
            />
            <Route
              path="sos/:sosId/tracking"
              element={<MechanicTrackingPage />}
            />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} roles={["admin"]} />
          }
        >
          <Route element={<AdminLayout />}>
            <Route
              path="dashboard"
              element={<AdminDashboardPage />}
            />
            <Route path="users" element={<AdminUsersPage />} />
            <Route
              path="mechanics"
              element={<AdminMechanicsPage />}
            />
            <Route
              path="sos"
              element={<AdminSosMonitorPage />}
            />
            <Route path="logs" element={<AdminLogsPage />} />
          </Route>
        </Route>

        {/* ERROR ROUTES */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* DEFAULT REDIRECT */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={`/${user.role}/dashboard`} />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
