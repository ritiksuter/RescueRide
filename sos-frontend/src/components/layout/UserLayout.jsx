import React from "react";
import { MainLayout } from "./MainLayout";

const userLinks = [
  { to: "/user/dashboard", label: "Dashboard", end: true },
  { to: "/user/sos", label: "My SOS Requests" },
  { to: "/user/vehicles", label: "My Vehicles" },
  { to: "/user/profile", label: "Profile" },
];

export const UserLayout = ({ children, user, onLogout }) => {
  return (
    <MainLayout
      title="User Panel"
      user={user}
      onLogout={onLogout}
      sidebarLinks={userLinks}
    >
      {children}
    </MainLayout>
  );
};
