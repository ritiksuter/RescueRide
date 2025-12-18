import { NavLink } from "react-router-dom";
import { getSidebarLinksForRole } from "../config/routesConfig";
import { useAuth } from "../hooks/useAuth";

export const Sidebar = () => {
  const { user } = useAuth();
  const links = getSidebarLinksForRole(user?.role);

  return (
    <aside className="w-56 border-r bg-white p-3">
      <nav className="space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `block rounded px-3 py-2 text-sm ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
