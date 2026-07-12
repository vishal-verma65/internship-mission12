# Live Chat Room — Socket.io Real-Time Pipeline

A bidirectional, room-based chat application built to demonstrate WebSocket
communication with Socket.io: live message broadcast, session identity,
typing indicators, and isolated channel routing.

## Stack

| Layer          | Tech                                  |
|----------------|----------------------------------------|
| Realtime       | Socket.io / socket.io-client           |
| Backend        | Node.js, Express                       |
| Logging        | Winston                                |
| Frontend       | React (Vite)                           |
| State          | Zustand                                |
| Data fetching  | Axios, TanStack React Query            |
| Styling        | Tailwind CSS v4                        |
| Package runner | Bun                                    |

## Features

- **Live broadcast** — messages sent by any client are pushed instantly to
  the room over a persistent WebSocket connection (no polling).
- **Session identity** — users pick a display name before joining; every
  message renders as `[username]: text`.
- **Typing indicator** — keystrokes emit a debounced `typing` event; other
  clients in the same room see `"X is typing..."`.
- **Room segregation** — two channels (`General`, `Tech Support`). Messages
  and typing events are scoped to the sender's current room via Socket.io
  rooms (`socket.join` / `io.to(room)`), never broadcast globally.

## Folder Structure

```
live-chat-app/
├── backend/
│   ├── server.js
│   ├── .env
│   └── src/
│       ├── app.js
│       ├── config/env.js
│       ├── loggers/logger.js
│       └── socket/
│           ├── index.js
│           ├── events.js
│           ├── rooms.js
│           └── handlers/
│               ├── connectionHandler.js
│               ├── roomHandler.js
│               ├── messageHandler.js
│               └── typingHandler.js
└── frontend/
    ├── .env
    ├── postcss.config.js
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── lib/{socket.js, constants.js}
        ├── api/axiosClient.js
        ├── store/useChatStore.js
        ├── hooks/{useSocketConnection.js, useTypingIndicator.js}
        └── components/
            ├── UsernameGate.jsx
            ├── RoomSelector.jsx
            ├── ChatRoom.jsx
            ├── MessageList.jsx
            ├── MessageInput.jsx
            └── TypingIndicator.jsx
```

## Environment Variables

**`backend/.env`**
```
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
LOG_LEVEL=info
```

**`frontend/.env`**
```
VITE_SERVER_URL=http://localhost:5000
```

## Setup & Run

### Backend
```bash
cd backend
bun init -y
bun add express socket.io cors dotenv winston
# create .env using the values above
bun --watch server.js
```
Runs on `http://localhost:5000`. Health check: `GET /health`.

### Frontend
```bash
cd frontend
bun create vite . --template react
bun add socket.io-client axios @tanstack/react-query zustand
bun add -d tailwindcss @tailwindcss/postcss @vitejs/plugin-react
# create .env using the value above
bun run dev
```
Runs on `http://localhost:5173`.

Open the frontend in two browser tabs to see live broadcast, typing
indicators, and room isolation in action.

## Architecture Flow

1. **Identity** — `UsernameGate` sets `username` in the Zustand store, which
   gates rendering of `ChatRoom` in `App.jsx`.
2. **Connection** — `useSocketConnection` opens the socket once a username
   exists, and emits `join_room` with `{ room, username }` on connect and on
   every room switch.
3. **Server join** — `roomHandler.js` validates the room, calls
   `socket.join(room)`, and stores `username`/`room` on `socket.data`.
4. **Messaging** — `MessageInput` calls `sendMessage`, which emits
   `message`. `messageHandler.js` reads `socket.data`, builds the payload,
   and does a scoped `io.to(room).emit("broadcast_message", payload)`.
5. **Typing** — `useTypingIndicator` debounces keystrokes into `typing`
   events; `typingHandler.js` relays them to everyone else in the room via
   `socket.to(room).emit(...)`.
6. **Rendering** — `useSocketConnection` listens for `broadcast_message` /
   `broadcast_typing` and writes into the Zustand store; `MessageList` and
   `TypingIndicator` re-render reactively.

## Logging

Winston logs connection handshakes, room joins, messages, and disconnects
to the console and to `backend/logs/` (`combined.log`, `error.log`). This
directory is git-ignored — see `.gitignore`.

## Notes

- `SOCKET_EVENTS` and `ROOMS` are defined independently in
  `backend/src/socket/events.js` / `rooms.js` and
  `frontend/src/lib/constants.js`. There's no shared package yet, so keep
  both sides in sync when adding new events or rooms.
- Tailwind v4 is configured CSS-first (`@import "tailwindcss"` +
  `@theme` in `index.css`) — no `tailwind.config.js` is used.