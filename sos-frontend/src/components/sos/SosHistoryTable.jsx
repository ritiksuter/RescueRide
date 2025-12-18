import { formatDateTime } from "../../utils/formatters";

export const SosHistoryTable = ({ data = [] }) => {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left p-2">SOS ID</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s) => (
          <tr key={s.id} className="border-b">
            <td className="p-2">{s.id}</td>
            <td>{s.status}</td>
            <td>{formatDateTime(s.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
