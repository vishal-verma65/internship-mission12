import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

export default function UsernameGate() {
  const [name, setName] = useState("");
  const setUsername = useChatStore((state) => state.setUsername);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setUsername(trimmed);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-black/40"
      >
        <h1 className="mb-1 text-lg font-semibold text-slate-100">
          Join the room
        </h1>
        <p className="mb-4 text-sm text-slate-500">
          Pick a name — it's how others will see you.
        </p>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Nakul"
          className="mb-3 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enter chat
        </button>
      </form>
    </div>
  );
}