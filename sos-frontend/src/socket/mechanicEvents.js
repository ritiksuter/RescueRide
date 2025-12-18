/**
 * Mechanic events
 * Backend emits:
 * - mechanic:job-assigned
 * - mechanic:status-updated
 */
export const bindMechanicEvents = (
  socket,
  { onJobAssigned, onStatusUpdated }
) => {
  if (!socket) return () => {};

  if (onJobAssigned) {
    socket.on("mechanic:job-assigned", onJobAssigned);
  }

  if (onStatusUpdated) {
    socket.on("mechanic:status-updated", onStatusUpdated);
  }

  return () => {
    if (onJobAssigned)
      socket.off("mechanic:job-assigned", onJobAssigned);
    if (onStatusUpdated)
      socket.off("mechanic:status-updated", onStatusUpdated);
  };
};
