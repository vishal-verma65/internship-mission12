import { ROOMS } from "../lib/constants";
import { useChatStore } from "../store/useChatStore";

export default function RoomSelector() {
  const activeRoom = useChatStore((state) => state.activeRoom);
  const setActiveRoom = useChatStore((state) => state.setActiveRoom);

  return (
    <div className="flex gap-1 border-b border-slate-800 bg-slate-950 px-4 py-2">
      {ROOMS.map((room) => {
        const isActive = room === activeRoom;
        return (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              isActive
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-900 text-slate-400 hover:text-slate-200"
            }`}
          >
            {room}
          </button>
        );
      })}
    </div>
  );
}