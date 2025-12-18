export const AdminTable = ({ columns, data }) => {
  return (
    <table className="w-full text-sm border">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} className="p-2 border">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((c) => (
              <td key={c.key} className="p-2 border">
                {c.render
                  ? c.render(row[c.key], row)
                  : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
