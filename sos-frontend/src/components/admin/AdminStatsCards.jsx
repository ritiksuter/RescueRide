import { Card } from "../common/Card";

export const AdminStatsCards = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <div className="text-xs text-gray-500">
            {s.label}
          </div>
          <div className="text-xl font-semibold">
            {s.value}
          </div>
        </Card>
      ))}
    </div>
  );
};
