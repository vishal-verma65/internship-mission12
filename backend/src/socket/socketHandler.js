import { Server } from "socket.io";
import logger from "../loggers/logger.js";
import { env } from "../config/env.js";

export const SOCKET_EVENTS = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
  MESSAGE: "message",
  BROADCAST_MESSAGE: "broadcast_message",
};

export function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on(SOCKET_EVENTS.CONNECT, (socket) => {
    logger.info(`Client handshake successful | socketId=${socket.id}`);

    socket.on(SOCKET_EVENTS.MESSAGE, (payload) => {
      logger.info(`Message received | socketId=${socket.id} | payload=${JSON.stringify(payload)}`);
      io.emit(SOCKET_EVENTS.BROADCAST_MESSAGE, payload);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      logger.info(`Client disconnected | socketId=${socket.id} | reason=${reason}`);
    });
  });

  return io;
}