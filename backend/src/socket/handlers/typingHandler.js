import { SOCKET_EVENTS } from "../events.js";

export function registerTypingHandler(io, socket) {
  socket.on(SOCKET_EVENTS.TYPING, ({ isTyping } = {}) => {
    const { room, username } = socket.data;
    if (!room || !username) return;

    socket.to(room).emit(SOCKET_EVENTS.BROADCAST_TYPING, {
      username,
      isTyping: Boolean(isTyping),
    });
  });
}