import { create } from "zustand";
import { DEFAULT_ROOM } from "../lib/constants";

export const useChatStore = create((set) => ({
  username: "",
  activeRoom: DEFAULT_ROOM,
  messagesByRoom: {},
  typingUser: null,
  isConnected: false,

  setUsername: (username) => set({ username }),

  setActiveRoom: (room) => set({ activeRoom: room, typingUser: null }),

  addMessage: (room, message) =>
    set((state) => ({
      messagesByRoom: {
        ...state.messagesByRoom,
        [room]: [...(state.messagesByRoom[room] || []), message],
      },
    })),

  setTypingUser: (typingUser) => set({ typingUser }),

  setConnected: (isConnected) => set({ isConnected }),

  clearMessages: (room) =>
    set((state) => ({
      messagesByRoom: { ...state.messagesByRoom, [room]: [] },
    })),
}));