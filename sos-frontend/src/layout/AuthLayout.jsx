import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow">
        <Outlet />
      </div>
    </div>
  );
};
