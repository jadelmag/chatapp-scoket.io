import { Message } from "@/interfaces/message.interfaces";
import { User } from "@/interfaces/user.interfaces";
import { ChatAction, chatReducer } from "@/reducers/chatreducer";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer
} from "react";

export interface ChatState {
  uid: string;
  activeChat: string | null;
  users: User[];
  messages: Message[];
}

export interface ChatContextType {
  chatState: ChatState;
  dispatch: Dispatch<ChatAction>;
}

const initialState: ChatState = {
  uid: "",
  activeChat: null,
  users: [],
  messages: [],
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
