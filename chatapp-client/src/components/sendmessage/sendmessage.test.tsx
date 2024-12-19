import { AuthProvider, useAuthContext } from "@/auth/authcontext";
import { SendMessage } from "@/components/sendmessage/sendmessage";
import { ChatProvider, useChatContext } from "@/context/chatcontext";
import { User } from "@/interfaces/user.interfaces";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";

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

describe("SendMessage Component", () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("render without crashing", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [user1, user2],
        messages: [],
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
          <SendMessage />
        </AuthProvider>
      </ChatProvider>
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input.className).toContain("write_msg");
    expect(input).toHaveProperty("placeholder", "Mensaje...");

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.className).toContain("msg_send_btn mt-3");
    expect(button).toHaveProperty("type", "submit");
  });

  it("input type text", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [user1, user2],
        messages: [],
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
          <SendMessage />
        </AuthProvider>
      </ChatProvider>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "How are you?" } });

    expect(input.value).toBe("How are you?");
  });

  it("call submit with empty text", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [user1, user2],
        messages: [],
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
          <SendMessage />
        </AuthProvider>
      </ChatProvider>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(input.value).toBe("");
  });

  it("on submit button clear text", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [user1, user2],
        messages: [],
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
          <SendMessage />
        </AuthProvider>
      </ChatProvider>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "How are you?" } });

    expect(input.value).toBe("How are you?");

    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(input.value).toBe("");
  });
});
