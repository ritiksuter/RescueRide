import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ links = [] }) => {
  return (
    <aside className="hidden h-full w-60 border-r bg-white/80 p-3 text-sm shadow-sm md:block">
      <div className="mb-3 text-xs font-semibold uppercase text-gray-500">
        Navigation
      </div>
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3 py-2 ${
                isActive
                  ? "bg-blue-50 font-medium text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            {link.icon && <span className="text-base">{link.icon}</span>}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
