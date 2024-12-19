import { AuthProvider, useAuthContext } from "@/auth/authcontext";
import { Conversation } from "@/components/conversation/conversation";
import { ChatProvider, useChatContext } from "@/context/chatcontext";
import { Message } from "@/interfaces/message.interfaces";
import { User } from "@/interfaces/user.interfaces";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/context/chatcontext", async () => {
  const actual = await import("@/context/chatcontext");
  return {
    ...actual,
    useChatContext: vi.fn(),
  };
});

vi.mock("@/auth/authcontext", async () => {
  const actual = await import("@/auth/authcontext");
  return {
    ...actual,
    useAuthContext: vi.fn(),
  };
});

describe("Conversation Component", () => {
  const dispatchMock = vi.fn();
  const user1: User = {
    uid: "67601b7b773e0f38905b970b",
    name: "User 1",
    email: "user1@test.com",
    online: true,
  };
  const user2: User = {
    uid: "67602aa8773e0f38905b971a",
    name: "User 2",
    email: "user2@test.com",
    online: true,
  };
  const messages: Message[] = [
    {
      _id: "67617d05d459510c280d27ab",
      from: "67602aa8773e0f38905b971a",
      to: "67601b7b773e0f38905b970b",
      message: "Hello user 1",
      createdAt: "2024-04-04",
      updatedAt: "2024-04-04",
    },
    {
      _id: "67617f19d459510c280d27cd",
      from: "67601b7b773e0f38905b970b",
      to: "67602aa8773e0f38905b971a",
      message: "Hello user 2",
      createdAt: "2024-04-04",
      updatedAt: "2024-04-04",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders incoming and outgoing messages correctly", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [user1, user2],
        messages: messages,
      },
      dispatch: dispatchMock,
    });

    const loginSpy = vi.fn();
    const signinSpy = vi.fn();
    const logoutSpy = vi.fn();
    const verifytokenSpy = vi.fn();

    vi.mocked(useAuthContext).mockReturnValue({
      auth: {
        uid: "67601b7b773e0f38905b970b",
        checking: false,
        logged: true,
        name: "Usear 1",
        email: "user1@test.com",
      },
      login: loginSpy,
      signin: signinSpy,
      logout: logoutSpy,
      verifytoken: verifytokenSpy,
    });

    render(
      <ChatProvider>
        <AuthProvider>
          <Conversation />
        </AuthProvider>
      </ChatProvider>
    );

    const message1 = screen.getByLabelText("incoming_msg");
    const message2 = screen.getByLabelText("outgoing_msg");

    expect(message1).toBeInTheDocument();
    expect(message2).toBeInTheDocument();
  });

  it("not renders messages if auth uid is null", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [user1, user2],
        messages: messages,
      },
      dispatch: dispatchMock,
    });

    const loginSpy = vi.fn();
    const signinSpy = vi.fn();
    const logoutSpy = vi.fn();
    const verifytokenSpy = vi.fn();

    vi.mocked(useAuthContext).mockReturnValue({
      auth: {
        uid: null,
        checking: false,
        logged: true,
        name: "Usear 1",
        email: "user1@test.com",
      },
      login: loginSpy,
      signin: signinSpy,
      logout: logoutSpy,
      verifytoken: verifytokenSpy,
    });

    render(
      <ChatProvider>
        <AuthProvider>
          <Conversation />
        </AuthProvider>
      </ChatProvider>
    );

    const message1 = screen.queryByLabelText("incoming_msg");
    const message2 = screen.queryByLabelText("outgoing_msg");

    expect(message1).not.toBeInTheDocument();
    expect(message2).not.toBeInTheDocument();
  });

});
