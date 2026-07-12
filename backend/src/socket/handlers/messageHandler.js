import { SOCKET_EVENTS } from "../events.js";
import logger from "../../loggers/logger.js";

export function registerMessageHandler(io, socket) {
  socket.on(SOCKET_EVENTS.MESSAGE, ({ text } = {}) => {
    const { room, username } = socket.data;

    if (!room || !text?.trim()) return;

    const payload = {
      username,
      text: text.trim(),
      room,
      timestamp: Date.now(),
    };

    logger.info(`Message in "${room}" | ${username}: ${payload.text}`);

    io.to(room).emit(SOCKET_EVENTS.BROADCAST_MESSAGE, payload);
  });
}