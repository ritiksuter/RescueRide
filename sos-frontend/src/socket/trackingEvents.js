/**
 * Tracking events
 * Backend emits:
 * - tracking:location-updated
 * - tracking:trip-completed
 */
export const bindTrackingEvents = (
  socket,
  { onLocationUpdated, onTripCompleted }
) => {
  if (!socket) return () => {};

  if (onLocationUpdated) {
    socket.on("tracking:location-updated", onLocationUpdated);
  }

  if (onTripCompleted) {
    socket.on("tracking:trip-completed", onTripCompleted);
  }

  return () => {
    if (onLocationUpdated)
      socket.off("tracking:location-updated", onLocationUpdated);
    if (onTripCompleted)
      socket.off("tracking:trip-completed", onTripCompleted);
  };
};
