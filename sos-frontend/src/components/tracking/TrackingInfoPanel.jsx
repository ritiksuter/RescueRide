import { Card } from "../common/Card";
import { TrackingStatusBadge } from "./TrackingStatusBadge";

export const TrackingInfoPanel = ({ sos, mechanic }) => {
  if (!sos) return null;

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          Tracking SOS #{sos.id}
        </div>
        <TrackingStatusBadge status={sos.status} />
      </div>

      {mechanic && (
        <div className="mt-2 text-xs text-gray-600">
          Mechanic: {mechanic.name}
        </div>
      )}
    </Card>
  );
};
