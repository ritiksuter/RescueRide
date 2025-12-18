export const formatDateTime = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  return isNaN(d.getTime()) ? "—" : d.toLocaleString();
};

export const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
};

export const formatDistanceKm = (meters) => {
  if (meters == null) return "—";
  return `${(meters / 1000).toFixed(2)} km`;
};

export const capitalize = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1);
