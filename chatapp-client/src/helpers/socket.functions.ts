import { io } from "socket.io-client";

export const gerenerateSocket = (path: string, token: string | null) => {
  console.log("generateSocket with path: ", path);
  if (!token) return null;

  const socketIO = io("/socket.io", {
    transports: ["websocket"],
    autoConnect: true,
    forceNew: true,
    query: {
      "x-token": token,
    },
  });

  return socketIO;
};
