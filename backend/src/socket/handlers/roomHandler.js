import { SOCKET_EVENTS } from "../events.js";
import { isValidRoom, DEFAULT_ROOM } from "../rooms.js";
import logger from "../../loggers/logger.js";

export function registerRoomHandler(io, socket) {
  socket.on(SOCKET_EVENTS.JOIN_ROOM, ({ room, username } = {}) => {
    const targetRoom = isValidRoom(room) ? room : DEFAULT_ROOM;

    if (socket.data.room && socket.data.room !== targetRoom) {
      socket.leave(socket.data.room);
    }

    socket.data.username = username?.trim() || "Anonymous";
    socket.data.room = targetRoom;
    socket.join(targetRoom);

    logger.info(
      `${socket.data.username} joined room "${targetRoom}" | socketId=${socket.id}`
    );

    socket.emit(SOCKET_EVENTS.ROOM_JOINED, { room: targetRoom });
  });
}