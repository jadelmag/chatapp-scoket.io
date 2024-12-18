import { useAuthContext } from "@/auth/authcontext";
import { useChatContext } from "@/context/chatcontext";
import useSocket from "@/hooks/useSocket";
import { Message } from "@/interfaces/message.interfaces";
import { User } from "@/interfaces/user.interfaces";
import { CHAT_TYPE } from "@/reducers/chatreducer";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  online: boolean;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  online: false,
});

export const SocketProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { auth } = useAuthContext();
  const { socket, online, connectSocket, disconnectSocket } = useSocket("/");
  const { dispatch } = useChatContext();

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth, disconnectSocket]);

  useEffect(() => {
    socket?.on("list-users", (users: User[]) => {
      dispatch({
        type: CHAT_TYPE.ADD_USERS,
        payload: users,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("message-personal", (message: Message) => {
      dispatch({
        type: CHAT_TYPE.NEW_MESSAGE,
        payload: message,
      });
     
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
