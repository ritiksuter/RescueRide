import { getSosStatusLabel, getSosStatusClass } from "../../utils/sosStatus";

export const TrackingStatusBadge = ({ status }) => (
  <span
    className={`px-2 py-1 rounded text-xs ${getSosStatusClass(status)}`}
  >
    {getSosStatusLabel(status)}
  </span>
);
