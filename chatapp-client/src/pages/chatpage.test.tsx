import { AuthProvider } from "@/auth/authcontext";
import { ChatProvider, useChatContext } from "@/context/chatcontext";
import { User } from "@/interfaces/user.interfaces";
import { ChatPage } from "@/pages/chatpage";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";

vi.mock("@/context/chatcontext", async () => {
  const actual = await import("@/context/chatcontext");
  return {
    ...actual,
    useChatContext: vi.fn(),
  };
});

describe("Chat Page Component", () => {
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

  it("should render without crashing", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: null,
        users: [],
        messages: [],
      },
      dispatch: vi.fn(),
    });

    render(
      <ChatProvider>
        <AuthProvider>
          <ChatPage />
        </AuthProvider>
      </ChatProvider>
    );

    const wrapperDiv = screen.getByLabelText("messaging");
    expect(wrapperDiv).toBeInTheDocument();
  });

  it("should render select chat", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: null,
        users: [],
        messages: [],
      },
      dispatch: vi.fn(),
    });

    render(
      <ChatProvider>
        <AuthProvider>
          <ChatPage />
        </AuthProvider>
      </ChatProvider>
    );

    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe("Seleccione una persona");
  });

  it("should render select chat", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: "67602aa8773e0f38905b971a",
        users: [user1, user2],
        messages: [],
      },
      dispatch: vi.fn(),
    });

    render(
      <ChatProvider>
        <AuthProvider>
          <ChatPage />
        </AuthProvider>
      </ChatProvider>
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Mensaje...");
    expect(input.className).toContain("write_msg");
  });
});
