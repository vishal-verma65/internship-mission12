import { useChatStore } from "../store/useChatStore";

export default function TypingIndicator() {
  const typingUser = useChatStore((state) => state.typingUser);

  return (
    <div className="h-5 px-4">
      {typingUser && (
        <p className="font-mono text-xs italic text-emerald-400">
          {typingUser} is typing...
        </p>
      )}
    </div>
  );
}