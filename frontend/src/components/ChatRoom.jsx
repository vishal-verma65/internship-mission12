import { useChatStore } from "../store/useChatStore";
import { useSocketConnection } from "../hooks/useSocketConnection";
import { useTypingIndicator } from "../hooks/useTypingIndicator";
import RoomSelector from "./RoomSelector";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

export default function ChatRoom() {
  const username = useChatStore((state) => state.username);
  const activeRoom = useChatStore((state) => state.activeRoom);
  const isConnected = useChatStore((state) => state.isConnected);

  const { sendMessage, sendTyping } = useSocketConnection();
  const { notifyTyping, notifyStoppedTyping } = useTypingIndicator(sendTyping);

  return (
    <div className="mx-auto flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-black/40">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-slate-200">
            {activeRoom}
          </h1>
          <p className="font-mono text-[11px] text-slate-500">
            signed in as {username}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isConnected ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
            }`}
          />
          <span className="font-mono text-xs text-slate-500">
            {isConnected ? "LIVE" : "OFFLINE"}
          </span>
        </div>
      </header>

      <RoomSelector />
      <MessageList />
      <TypingIndicator />
      <MessageInput
        onSend={sendMessage}
        onTyping={notifyTyping}
        onStopTyping={notifyStoppedTyping}
      />
    </div>
  );
}