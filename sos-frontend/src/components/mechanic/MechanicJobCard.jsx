import { Card } from "../common/Card";
import { Button } from "../common/Button";

export const MechanicJobCard = ({ job, onAccept }) => {
  return (
    <Card>
      <div className="text-sm font-medium">
        SOS #{job.id}
      </div>
      <Button
        onClick={() => onAccept(job.id)}
        className="mt-2"
      >
        Accept Job
      </Button>
    </Card>
  );
};
