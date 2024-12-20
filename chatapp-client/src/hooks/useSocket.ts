import { KEY } from "@/constants/localstorage.constants";
import { loadOnLocalStorage } from "@/helpers/localstorage.functions";
import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (serverPath: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState<boolean>(false);

  const connectSocket = useCallback(() => {
    const token: string | null = loadOnLocalStorage(KEY.TOKEN);
    if (token) {
      const socketTemp: Socket = io(serverPath, {
        transports: ["websocket"],
        autoConnect: true,
        forceNew: true,
        query: {
          "x-token": token,
        },
      });
      setSocket(socketTemp);
    }
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("socket connected");
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => {
      console.log("socket disconnected");
      setOnline(false);
    });
  }, [socket]);

  return { socket, online, connectSocket, disconnectSocket };
};

export default useSocket;
