import { ChatState } from "@/context/chatcontext";
import { Message } from "@/interfaces/message.interfaces";
import { User } from "@/interfaces/user.interfaces";

export enum CHAT_TYPE {
  ADD_USERS = "ADD_USERS",
  SELECT_CHAT = "SELECT_CHAT",
  NEW_MESSAGE = "NEW_MESSAGE",
  ADD_MESSAGES = "ADD_MESSAGES",
  RESET_CHAT = "RESET_CHAT",
}

export type ChatAction =
  | { type: "ADD_USERS"; payload: User[] }
  | { type: "SELECT_CHAT"; payload: string }
  | { type: "NEW_MESSAGE"; payload: Message }
  | { type: "ADD_MESSAGES"; payload: Message[] }
  | { type: "RESET_CHAT" };

export const chatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case CHAT_TYPE.ADD_USERS:
      return {
        ...state,
        users: [...action.payload],
      };
    case CHAT_TYPE.SELECT_CHAT:
      if (state.activeChat === action.payload) return state;
      return {
        ...state,
        activeChat: action.payload,
        messages: [],
      };
    case CHAT_TYPE.NEW_MESSAGE:
      if (
        state.activeChat === action.payload.from ||
        state.activeChat === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        return state;
      }
    case CHAT_TYPE.ADD_MESSAGES:
      return {
        ...state,
        messages: [...action.payload],
      };
    case CHAT_TYPE.RESET_CHAT:
      return {
        uid: "",
        activeChat: null,
        users: [],
        messages: [],
      };

    default:
      return state;
  }
};
