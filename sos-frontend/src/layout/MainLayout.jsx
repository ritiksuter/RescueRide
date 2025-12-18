import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
