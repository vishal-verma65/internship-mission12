import { SOCKET_EVENTS } from "../events.js";
import logger from "../../loggers/logger.js";
import { registerRoomHandler } from "./roomHandler.js";
import { registerMessageHandler } from "./messageHandler.js";
import { registerTypingHandler } from "./typingHandler.js";

export function handleConnection(io, socket) {
  logger.info(`Client handshake successful | socketId=${socket.id}`);

  registerRoomHandler(io, socket);
  registerMessageHandler(io, socket);
  registerTypingHandler(io, socket);

  socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
    logger.info(
      `${socket.data.username || "Unknown"} disconnected from "${
        socket.data.room || "-"
      }" | reason=${reason}`
    );
  });
}