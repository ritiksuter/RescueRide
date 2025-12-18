/**
 * SOS events
 * Backend emits:
 * - sos:new
 * - sos:status-updated
 */
export const bindSosEvents = (
  socket,
  { onNewSos, onStatusUpdated }
) => {
  if (!socket) return () => {};

  if (onNewSos) {
    socket.on("sos:new", onNewSos);
  }

  if (onStatusUpdated) {
    socket.on("sos:status-updated", onStatusUpdated);
  }

  return () => {
    if (onNewSos) socket.off("sos:new", onNewSos);
    if (onStatusUpdated)
      socket.off("sos:status-updated", onStatusUpdated);
  };
};
