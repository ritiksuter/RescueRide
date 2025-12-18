// All SOS-related real-time events (mostly client-originated)

export const registerSosEvents = (io, socket) => {
  // Example: client wants to subscribe to updates of a specific SOS request
  socket.on("sos:join", ({ sosId }) => {
    if (!sosId) return;
    socket.join(`sos:${sosId}`);
    // Optionally confirm
    socket.emit("sos:joined", { sosId });
  });

  // Example: leave SOS room
  socket.on("sos:leave", ({ sosId }) => {
    if (!sosId) return;
    socket.leave(`sos:${sosId}`);
  });

  // If you want clients to trigger SOS via socket (optional)
  socket.on("sos:create", (payload) => {
    // Usually, SOS creation should go via REST -> SOS service -> event bus.
    // But you can emit something to admins/mechanics here if needed.
    io.to("admins").emit("sos:new:client-side", {
      fromUserId: socket.user?.id,
      ...payload,
    });
  });
};
