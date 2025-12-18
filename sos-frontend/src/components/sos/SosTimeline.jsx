export const SosTimeline = ({ events = [] }) => {
  return (
    <ul className="space-y-2">
      {events.map((e, i) => (
        <li key={i} className="text-xs text-gray-600">
          {e.message}
        </li>
      ))}
    </ul>
  );
};
