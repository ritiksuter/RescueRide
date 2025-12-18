// Real-time tracking events (location updates, trip status, etc.)

export const registerTrackingEvents = (io, socket) => {
  const userId = socket.user?.id;

  // Client (mechanic) sends location updates
  socket.on("tracking:update-location", ({ sosId, lat, lng }) => {
    if (!sosId || lat == null || lng == null) return;

    // Broadcast location updates to the specific sos room
    io.to(`sos:${sosId}`).emit("tracking:location-updated", {
      sosId,
      mechanicId: userId,
      lat,
      lng,
      at: new Date().toISOString(),
    });
  });

  // Client (user) subscribes to tracking for specific SOS / ride
  socket.on("tracking:join", ({ sosId }) => {
    if (!sosId) return;
    socket.join(`tracking:${sosId}`);
    socket.emit("tracking:joined", { sosId });
  });

  socket.on("tracking:leave", ({ sosId }) => {
    if (!sosId) return;
    socket.leave(`tracking:${sosId}`);
  });
};
