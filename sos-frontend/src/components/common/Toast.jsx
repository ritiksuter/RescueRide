export const Toast = ({
  message,
  type = "info",
  onClose,
}) => {
  const colors = {
    info: "bg-blue-600",
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-600",
  };

  return (
    <div
      className={`flex items-center justify-between rounded px-3 py-2 text-white shadow ${colors[type]}`}
    >
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 text-xs">
        ✕
      </button>
    </div>
  );
};
