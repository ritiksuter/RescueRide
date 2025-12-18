import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const MainLayout = ({
  children,
  title,
  user,
  onLogout,
  sidebarLinks = [],
}) => {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Navbar title={title} user={user} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar links={sidebarLinks} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
};
