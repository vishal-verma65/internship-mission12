export const SOCKET_EVENTS = {
  JOIN_ROOM: "join_room",
  ROOM_JOINED: "room_joined",

  MESSAGE: "message",
  BROADCAST_MESSAGE: "broadcast_message",

  TYPING: "typing",
  BROADCAST_TYPING: "broadcast_typing",
};

export const ROOMS = ["General", "Tech Support"];

export const DEFAULT_ROOM = ROOMS[0];

export const TYPING_TIMEOUT_MS = 1500;