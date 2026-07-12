import { useEffect } from "react";
import { socket } from "../lib/socket";
import { SOCKET_EVENTS } from "../lib/constants";
import { useChatStore } from "../store/useChatStore";

export function useSocketConnection() {
  const username = useChatStore((state) => state.username);
  const activeRoom = useChatStore((state) => state.activeRoom);
  const addMessage = useChatStore((state) => state.addMessage);
  const setTypingUser = useChatStore((state) => state.setTypingUser);
  const setConnected = useChatStore((state) => state.setConnected);

  useEffect(() => {
    if (!username) return;

    socket.connect();

    const handleConnect = () => {
      setConnected(true);
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room: activeRoom, username });
    };
    const handleDisconnect = () => setConnected(false);
    const handleBroadcastMessage = (payload) => addMessage(payload.room, payload);
    const handleBroadcastTyping = ({ username: typer, isTyping }) =>
      setTypingUser(isTyping ? typer : null);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on(SOCKET_EVENTS.BROADCAST_MESSAGE, handleBroadcastMessage);
    socket.on(SOCKET_EVENTS.BROADCAST_TYPING, handleBroadcastTyping);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off(SOCKET_EVENTS.BROADCAST_MESSAGE, handleBroadcastMessage);
      socket.off(SOCKET_EVENTS.BROADCAST_TYPING, handleBroadcastTyping);
      socket.disconnect();
    };
  }, [username]);

  useEffect(() => {
    if (!username || !socket.connected) return;
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room: activeRoom, username });
  }, [activeRoom, username]);

  const sendMessage = (text) => {
    socket.emit(SOCKET_EVENTS.MESSAGE, { text });
  };

  const sendTyping = (isTyping) => {
    socket.emit(SOCKET_EVENTS.TYPING, { isTyping });
  };

  return { sendMessage, sendTyping };
}