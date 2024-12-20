import { AuthProvider } from "@/auth/authcontext";
import { ChatItem } from "@/components/chatitem/chatitem";
import { ChatProvider, useChatContext } from "@/context/chatcontext";
import { CHAT_TYPE } from "@/reducers/chatreducer";
import { requestWithToken } from "@/services/withtoken.functions";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/context/chatcontext", async () => {
  const actual = await import("@/context/chatcontext");
  return {
    ...actual,
    useChatContext: vi.fn(),
  };
});

vi.mock("@/services/withtoken.functions", async () => ({
  ...(await vi.importActual("@/services/withtoken.functions")),
  __esModule: true,
  requestWithToken: vi.fn(() => Promise.resolve({ ok: true, messages: [] })),
}));

describe("ChatItem Component", () => {
  const dispatchMock = vi.fn();
  const mockUser = {
    uid: "123",
    name: "John Doe",
    email: "test@test.com",
    online: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render user data correctly", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: null,
        users: [],
        messages: [],
      },
      dispatch: dispatchMock,
    });

    render(
      <ChatProvider>
        <AuthProvider>
          <ChatItem user={mockUser} />
        </AuthProvider>
      </ChatProvider>
    );

    const name = screen.getByText("John Doe");
    const status = screen.getByText("Online");
    const image = screen.getByRole("img");

    expect(name).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("should not apply 'active_chat' class when user is not the active chat", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "",
        activeChat: null,
        users: [],
        messages: [],
      },
      dispatch: dispatchMock,
    });

    const { container } = render(
      <ChatProvider>
        <AuthProvider>
          <ChatItem user={mockUser} />
        </AuthProvider>
      </ChatProvider>
    );

    const chatItem = container.querySelector(".chat_list");
    expect(chatItem).not.toHaveClass("active_chat");
  });

  it("should apply 'active_chat' class when user is the active chat", () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "11111",
        activeChat: "123",
        users: [],
        messages: [],
      },
      dispatch: vi.fn(),
    });

    const { container } = render(
      <ChatProvider>
        <AuthProvider>
          <ChatItem user={mockUser} />
        </AuthProvider>
      </ChatProvider>
    );

    const chatItem = container.querySelector(".chat_list");
    expect(chatItem).toHaveClass("active_chat");
  });

  it("should call dispatch when user click", async () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "111",
        activeChat: null,
        users: [
          {
            uid: "123",
            name: "John Doe",
            email: "test@test.com",
            online: true,
          },
        ],
        messages: [],
      },
      dispatch: dispatchMock,
    });

    render(
      <ChatProvider>
        <AuthProvider>
          <ChatItem user={mockUser} />
        </AuthProvider>
      </ChatProvider>
    );

    const wrapperDiv = screen.getByLabelText("chat-item");
    expect(wrapperDiv).toBeInTheDocument();

    fireEvent.click(wrapperDiv);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "SELECT_CHAT",
      payload: mockUser.uid,
    });

    expect(vi.mocked(requestWithToken)).toHaveBeenCalledWith(
      `messages/${mockUser.uid}`
    );
  });

  it("should handle errors in onGetMessages", async () => {
    vi.mocked(useChatContext).mockReturnValue({
      chatState: {
        uid: "111",
        activeChat: null,
        users: [
          {
            uid: "123",
            name: "John Doe",
            email: "test@test.com",
            online: true,
          },
        ],
        messages: [],
      },
      dispatch: dispatchMock,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (requestWithToken as any).mockRejectedValueOnce(new Error("Test Error"));

    render(
      <ChatProvider>
        <AuthProvider>
          <ChatItem user={mockUser} />
        </AuthProvider>
      </ChatProvider>
    );

    const chatItem = screen.getByLabelText("chat-item");
    fireEvent.click(chatItem);

    expect(requestWithToken).toHaveBeenCalledWith(`messages/${mockUser.uid}`);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: CHAT_TYPE.SELECT_CHAT,
      payload: mockUser.uid,
    });
  
  });
});

