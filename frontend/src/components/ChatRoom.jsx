import { useChatStore } from "../store/useChatStore";
import { useSocketConnection } from "../hooks/useSocketConnection";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatRoom() {
  const isConnected = useChatStore((state) => state.isConnected);
  const { sendMessage } = useSocketConnection();

  return (
    <div className="mx-auto flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-black/40">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <h1 className="text-sm font-semibold tracking-wide text-slate-200">
          Live Room
        </h1>
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

      <MessageList />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}