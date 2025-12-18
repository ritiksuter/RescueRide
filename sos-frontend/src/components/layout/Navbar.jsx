import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button"; // adjust path if needed

export const Navbar = ({ title = "SOS Platform", user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-2 shadow-sm">
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={handleLogoClick}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
          SOS
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-900">
            {title}
          </h1>
          <p className="text-xs text-gray-500">
            Roadside Assistance Platform
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden text-right text-xs sm:block">
            <div className="font-medium text-gray-800">
              {user.name || "User"}
            </div>
            {user.role && (
              <div className="text-[11px] uppercase tracking-wide text-gray-500">
                {user.role}
              </div>
            )}
          </div>
        )}

        {user && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold uppercase text-blue-700">
            {user?.name?.[0] || "U"}
          </div>
        )}

        {onLogout && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};
