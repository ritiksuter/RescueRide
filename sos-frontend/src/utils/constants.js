export const APP_NAME = "SOS Roadside Assistance";

export const SOS_STATUSES = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const SOCKET_EVENTS = {
  SOS_NEW: "sos:new",
  SOS_STATUS_UPDATED: "sos:status-updated",

  TRACKING_LOCATION: "tracking:location-updated",
  TRACKING_COMPLETED: "tracking:trip-completed",

  MECHANIC_JOB_ASSIGNED: "mechanic:job-assigned",
};
