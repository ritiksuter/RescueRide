import { useMechanicStatus } from "../../hooks/useMechanicStatus";

export const MechanicStatusToggle = () => {
  const { status, updateStatus } = useMechanicStatus();

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="available">Available</option>
      <option value="busy">Busy</option>
      <option value="offline">Offline</option>
    </select>
  );
};
