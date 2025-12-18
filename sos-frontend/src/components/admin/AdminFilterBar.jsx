export const AdminFilterBar = ({ filters, onChange }) => {
  return (
    <div className="flex gap-2">
      <input
        placeholder="Search..."
        className="border px-2 py-1 text-sm"
        onChange={(e) =>
          onChange({ ...filters, search: e.target.value })
        }
      />
    </div>
  );
};
