import React from "react";
import { MainLayout } from "./MainLayout";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard", end: true },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/mechanics", label: "Mechanics" },
  { to: "/admin/sos", label: "SOS Requests" },
  { to: "/admin/settings", label: "Settings" },
];

export const AdminLayout = ({ children, user, onLogout }) => {
  return (
    <MainLayout
      title="Admin Panel"
      user={user}
      onLogout={onLogout}
      sidebarLinks={adminLinks}
    >
      {children}
    </MainLayout>
  );
};
