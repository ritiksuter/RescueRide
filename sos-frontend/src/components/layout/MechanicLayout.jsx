import React from "react";
import { MainLayout } from "./MainLayout";

const mechanicLinks = [
  { to: "/mechanic/dashboard", label: "Dashboard", end: true },
  { to: "/mechanic/active-sos", label: "Active SOS" },
  { to: "/mechanic/history", label: "History" },
  { to: "/mechanic/profile", label: "Profile" },
];

export const MechanicLayout = ({ children, user, onLogout }) => {
  return (
    <MainLayout
      title="Mechanic Panel"
      user={user}
      onLogout={onLogout}
      sidebarLinks={mechanicLinks}
    >
      {children}
    </MainLayout>
  );
};
