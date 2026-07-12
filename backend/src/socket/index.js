import { Server } from "socket.io";
import { env } from "../config/env.js";
import { SOCKET_EVENTS } from "./events.js";
import { handleConnection } from "./handlers/connectionHandler.js";

export function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on(SOCKET_EVENTS.CONNECT, (socket) => handleConnection(io, socket));

  return io;
}