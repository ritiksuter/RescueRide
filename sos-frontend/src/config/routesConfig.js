/**
 * Central route configuration
 * Used by:
 * - Sidebar
 * - Role-based navigation
 */

export const ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER_USER: "/auth/register",
    REGISTER_MECHANIC: "/auth/register-mechanic",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },

  USER: {
    ROOT: "/user",
    DASHBOARD: "/user/dashboard",
    SOS_CREATE: "/user/sos/create",
    SOS_HISTORY: "/user/sos/history",
    SOS_TRACKING: (sosId = ":sosId") =>
      `/user/sos/${sosId}/tracking`,
  },

  MECHANIC: {
    ROOT: "/mechanic",
    DASHBOARD: "/mechanic/dashboard",
    JOBS: "/mechanic/jobs",
    PROFILE: "/mechanic/profile",
    SOS_TRACKING: (sosId = ":sosId") =>
      `/mechanic/sos/${sosId}/tracking`,
  },

  ADMIN: {
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    MECHANICS: "/admin/mechanics",
    SOS_MONITOR: "/admin/sos",
    LOGS: "/admin/logs",
  },
};

/**
 * Sidebar links per role
 */
export const SIDEBAR_LINKS = {
  user: [
    {
      label: "Dashboard",
      to: ROUTES.USER.DASHBOARD,
      end: true,
    },
    {
      label: "Raise SOS",
      to: ROUTES.USER.SOS_CREATE,
    },
    {
      label: "SOS History",
      to: ROUTES.USER.SOS_HISTORY,
    },
  ],

  mechanic: [
    {
      label: "Dashboard",
      to: ROUTES.MECHANIC.DASHBOARD,
      end: true,
    },
    {
      label: "Jobs",
      to: ROUTES.MECHANIC.JOBS,
    },
    {
      label: "Profile",
      to: ROUTES.MECHANIC.PROFILE,
    },
  ],

  admin: [
    {
      label: "Dashboard",
      to: ROUTES.ADMIN.DASHBOARD,
      end: true,
    },
    {
      label: "Users",
      to: ROUTES.ADMIN.USERS,
    },
    {
      label: "Mechanics",
      to: ROUTES.ADMIN.MECHANICS,
    },
    {
      label: "SOS Monitor",
      to: ROUTES.ADMIN.SOS_MONITOR,
    },
    {
      label: "Logs",
      to: ROUTES.ADMIN.LOGS,
    },
  ],
};

/**
 * Helper function used by Sidebar
 */
export const getSidebarLinksForRole = (role) => {
  if (!role) return [];
  return SIDEBAR_LINKS[role] || [];
};
