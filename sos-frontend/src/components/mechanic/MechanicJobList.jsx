import { MechanicJobCard } from "./MechanicJobCard";

export const MechanicJobList = ({ jobs, onAccept }) => {
  return (
    <div className="space-y-2">
      {jobs.map((j) => (
        <MechanicJobCard
          key={j.id}
          job={j}
          onAccept={onAccept}
        />
      ))}
    </div>
  );
};
