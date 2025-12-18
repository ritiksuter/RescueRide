import { Card } from "../common/Card";
import { getSosStatusLabel } from "../../utils/sosStatus";

export const SosStatusCard = ({ sos }) => {
  if (!sos) return null;

  return (
    <Card>
      <div className="text-sm font-medium">
        SOS Status: {getSosStatusLabel(sos.status)}
      </div>
      <div className="text-xs text-gray-500">
        SOS ID: {sos.id}
      </div>
    </Card>
  );
};
