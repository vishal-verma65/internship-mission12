import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";

const EMPTY_MESSAGES = [];

export default function MessageList() {
  const activeRoom = useChatStore((state) => state.activeRoom);
  const username = useChatStore((state) => state.username);
  const messages = useChatStore(
    (state) => state.messagesByRoom[state.activeRoom] || EMPTY_MESSAGES
  );
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="font-mono text-sm text-slate-500">
          No messages in "{activeRoom}" yet — say something.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
      {messages.map((msg, idx) => {
        const isOwn = msg.username === username;
        return (
          <div
            key={`${msg.timestamp}-${idx}`}
            className={`w-fit max-w-[80%] rounded-lg border px-3 py-2 ${
              isOwn
                ? "ml-auto border-emerald-800 bg-emerald-950/40"
                : "border-slate-800 bg-slate-900/60"
            }`}
          >
            <p className="text-sm text-slate-100">
              <span className="font-mono font-semibold text-emerald-400">
                [{msg.username}]:
              </span>{" "}
              {msg.text}
            </p>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide text-slate-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}