import { ChatState } from "@/context/chatcontext";
import { Message } from "@/interfaces/message.interfaces";
import { User } from "@/interfaces/user.interfaces";
import { CHAT_TYPE, ChatAction, chatReducer } from "@/reducers/chatreducer";
import { describe, expect, it } from "vitest";

describe("chatReducer", () => {
  const initialState: ChatState = {
    uid: "",
    activeChat: null,
    users: [],
    messages: [],
  };

  it("should handle ADD_USERS", () => {
    const users: User[] = [
      { uid: "1", name: "User1", email: "user1@test.com", online: false },
      { uid: "2", name: "User2", email: "user2@test.com", online: false },
    ];
    const action: ChatAction = { type: CHAT_TYPE.ADD_USERS, payload: users };
    const newState = chatReducer(initialState, action);

    expect(newState.users).toEqual(users);
  });

  it("should handle SELECT_CHAT", () => {
    const action: ChatAction = {
      type: CHAT_TYPE.SELECT_CHAT,
      payload: "chat123",
    };
    const newState = chatReducer(initialState, action);

    expect(newState.activeChat).toBe("chat123");
    expect(newState.messages).toEqual([]);
  });

  it("should handle SELECT_CHAT with the same chat ID", () => {
    const state = { ...initialState, activeChat: "chat123" };
    const action: ChatAction = {
      type: CHAT_TYPE.SELECT_CHAT,
      payload: "chat123",
    };
    const newState = chatReducer(state, action);

    expect(newState).toBe(state);
  });

  it("should handle NEW_MESSAGE for active chat", () => {
    const message: Message = {
      _id: "111",
      from: "user1",
      to: "chat123",
      message: "Hello!",
      createdAt: "2024-24-24",
      updatedAt: "2024-04-04",
    };
    const state = { ...initialState, activeChat: "chat123", messages: [] };
    const action: ChatAction = {
      type: CHAT_TYPE.NEW_MESSAGE,
      payload: message,
    };
    const newState = chatReducer(state, action);

    expect(newState.messages).toContain(message);
  });

  it("should ignore NEW_MESSAGE for inactive chat", () => {
    const message: Message = {
      _id: "111",
      from: "user1",
      to: "chat123",
      message: "Hello!",
      createdAt: "2024-04-04",
      updatedAt: "2024-04-04",
    };
    const state = { ...initialState, activeChat: "chat456", messages: [] };
    const action: ChatAction = {
      type: CHAT_TYPE.NEW_MESSAGE,
      payload: message,
    };
    const newState = chatReducer(state, action);

    expect(newState.messages).toHaveLength(0);
  });

  it("should handle ADD_MESSAGES", () => {
    const messages: Message[] = [
      {
        _id: "111",
        from: "user1",
        to: "chat123",
        message: "Hi",
        createdAt: "2024-04-04",
        updatedAt: "2024-04-04",
      },
      {
        _id: "222",
        from: "user2",
        to: "chat123",
        message: "Hello",
        createdAt: "2024-04-04",
        updatedAt: "2024-04-04",
      },
    ];
    const action: ChatAction = {
      type: CHAT_TYPE.ADD_MESSAGES,
      payload: messages,
    };
    const newState = chatReducer(initialState, action);

    expect(newState.messages).toEqual(messages);
  });

  it("should handle RESET_CHAT", () => {
    const state: ChatState = {
      uid: "user1",
      activeChat: "chat123",
      users: [
        { uid: "1", name: "User1", email: "user1@test.com", online: false },
      ],
      messages: [
        {
          _id: "111",
          from: "user1",
          to: "chat123",
          message: "Hello!",
          createdAt: "2024-04-04",
          updatedAt: "2024-04-04",
        },
      ],
    };
    const action: ChatAction = { type: CHAT_TYPE.RESET_CHAT };
    const newState = chatReducer(state, action);

    expect(newState).toEqual(initialState);
  });

  it("should return the current state for unknown action types", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const action = { type: "UNKNOWN_ACTION", payload: {} } as any;
    const newState = chatReducer(initialState, action);

    expect(newState).toBe(initialState);
  });
});
