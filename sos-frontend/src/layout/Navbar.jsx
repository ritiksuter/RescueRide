import { APP_NAME } from "../utils/constants";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/common/Button";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-2">
      <div className="font-semibold">{APP_NAME}</div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          {user?.email}
        </span>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
