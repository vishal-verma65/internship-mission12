import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";

export default function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="font-mono text-sm text-slate-500">
          No messages yet — say something to open the room.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
      {messages.map((msg, idx) => (
        <div
          key={`${msg.timestamp}-${idx}`}
          className="w-fit max-w-[80%] rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2"
        >
          <p className="text-sm text-slate-100">{msg.text}</p>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide text-slate-500">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}