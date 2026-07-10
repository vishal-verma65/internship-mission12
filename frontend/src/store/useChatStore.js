import { create } from "zustand";

export const useChatStore = create((set) => ({
  messages: [],
  isConnected: false,

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setConnected: (isConnected) => set({ isConnected }),

  clearMessages: () => set({ messages: [] }),
}));