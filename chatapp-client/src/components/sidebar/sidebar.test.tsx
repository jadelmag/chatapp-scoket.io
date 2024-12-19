import { AuthProvider, useAuthContext } from "@/auth/authcontext";
import { SideBar } from "@/components/sidebar/sidebar";
import { ChatProvider, useChatContext } from "@/context/chatcontext";
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

describe("SideBar Component", () => {
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

  it("renders a list of users excluding the current user", () => {
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
          <SideBar />
        </AuthProvider>
      </ChatProvider>
    );

    const users = screen.getAllByLabelText("chat-item");
    expect(users.length).toBe(1);
  });

  it("renders nothing if there are no users to display", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [],
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
          <SideBar />
        </AuthProvider>
      </ChatProvider>
    );

    const users = screen.queryAllByLabelText("chat-item");
    expect(users.length).toBe(0);
  });

  it("renders the extra space div", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [],
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
          <SideBar />
        </AuthProvider>
      </ChatProvider>
    );

    const spaceDiv = screen.getByLabelText("extra-space");
    expect(spaceDiv).toBeInTheDocument();
  });

  it("does not render the current user in the sidebar", () => {
    const user1Updated = { ...user1, online: true };
    const user2Updated = { ...user2, online: false };

    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [user1Updated, user2Updated],
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
          <SideBar />
        </AuthProvider>
      </ChatProvider>
    );

    const titleUser2 = screen.getByRole("heading", { level: 5 });

    expect(titleUser2).toBeInTheDocument();
  });
});
