export const ROOMS = ["General", "Tech Support"];

export const DEFAULT_ROOM = ROOMS[0];

export function isValidRoom(room) {
  return ROOMS.includes(room);
}