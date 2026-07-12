import { useChatStore } from "./store/useChatStore";
import UsernameGate from "./components/UsernameGate";
import ChatRoom from "./components/ChatRoom";

export default function App() {
  const username = useChatStore((state) => state.username);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      {username ? <ChatRoom /> : <UsernameGate />}
    </div>
  );
}