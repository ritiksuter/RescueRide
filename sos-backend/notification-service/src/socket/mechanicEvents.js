// Mechanic-related events via socket

export const registerMechanicEvents = (io, socket) => {
  const { role, id: userId } = socket.user || {};

  // Mechanic joins a room to receive jobs in a certain region/zone
  socket.on("mechanic:join-zone", ({ zoneId }) => {
    if (role !== "mechanic") return;
    if (!zoneId) return;

    socket.join(`zone:${zoneId}`);
    socket.emit("mechanic:zone-joined", { zoneId });
  });

  socket.on("mechanic:leave-zone", ({ zoneId }) => {
    if (role !== "mechanic" || !zoneId) return;
    socket.leave(`zone:${zoneId}`);
  });

  // Mechanic accepts SOS (again, ideally SOS service should update DB & emit event)
  socket.on("mechanic:accept-sos", ({ sosId }) => {
    if (role !== "mechanic" || !sosId) return;

    // Broadcast to SOS room that mechanic accepted
    io.to(`sos:${sosId}`).emit("sos:accepted:client-side", {
      sosId,
      mechanicId: userId,
    });
  });
};
