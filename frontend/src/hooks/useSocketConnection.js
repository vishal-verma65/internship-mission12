import { useEffect } from "react";
import { socket, SOCKET_EVENTS } from "../lib/socket";
import { useChatStore } from "../store/useChatStore";

export function useSocketConnection() {
  const addMessage = useChatStore((state) => state.addMessage);
  const setConnected = useChatStore((state) => state.setConnected);

  useEffect(() => {
    socket.connect();

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);
    const handleBroadcast = (payload) => addMessage(payload);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on(SOCKET_EVENTS.BROADCAST_MESSAGE, handleBroadcast);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off(SOCKET_EVENTS.BROADCAST_MESSAGE, handleBroadcast);
      socket.disconnect();
    };
  }, [addMessage, setConnected]);

  const sendMessage = (payload) => {
    socket.emit(SOCKET_EVENTS.MESSAGE, payload);
  };

  return { sendMessage };
}