export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
}) => {
  const base =
    "px-4 py-2 rounded text-sm font-medium transition inline-flex items-center justify-center";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};
