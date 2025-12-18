export const SOS_STATUS_META = {
  pending: {
    label: "Pending",
    className: "bg-yellow-50 text-yellow-700",
  },
  accepted: {
    label: "Accepted",
    className: "bg-blue-50 text-blue-700",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-green-50 text-green-700",
  },
  completed: {
    label: "Completed",
    className: "bg-gray-100 text-gray-700",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700",
  },
};

export const getSosStatusLabel = (status) =>
  SOS_STATUS_META[status]?.label || "Unknown";

export const getSosStatusClass = (status) =>
  SOS_STATUS_META[status]?.className ||
  "bg-gray-100 text-gray-600";
