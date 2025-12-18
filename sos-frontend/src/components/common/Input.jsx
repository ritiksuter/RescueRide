export const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full rounded border px-3 py-2 text-sm outline-none focus:ring ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};
