export const SOCKET_EVENTS = {
  // connection lifecycle
  CONNECT: "connection",
  DISCONNECT: "disconnect",

  // room routing
  JOIN_ROOM: "join_room",
  ROOM_JOINED: "room_joined",

  // messaging
  MESSAGE: "message",
  BROADCAST_MESSAGE: "broadcast_message",

  // typing indicator
  TYPING: "typing",
  BROADCAST_TYPING: "broadcast_typing",
};