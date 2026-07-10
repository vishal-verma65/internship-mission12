import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onSend({ text: trimmed, timestamp: Date.now() });
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-slate-800 bg-slate-950 px-4 py-3"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-emerald-500"
      />
      <button
        type="submit"
        className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!text.trim()}
      >
        Send
      </button>
    </form>
  );
}