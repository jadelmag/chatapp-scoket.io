import { AuthProvider } from "@/auth/authcontext";
import { ChatItem } from "@/components/chatitem/chatitem";
import { ChatProvider } from "@/context/chatcontext";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("ChatItem Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUser = {
    uid: "user123",
    name: "Test User",
    email: "test@test.com",
    online: true,
  };

  it("should render user data correctly", () => {
    render(
      <ChatProvider>
        <AuthProvider>
          <ChatItem user={mockUser} />
        </AuthProvider>
      </ChatProvider>
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
    expect(screen.getByAltText("sunil")).toBeInTheDocument();
  });

  it("should not apply 'active_chat' class when user is not the active chat", () => {
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

  //   it("should apply 'active_chat' class when user is the active chat", () => {
  //     const { container } = render(
  //       <ChatProvider>
  //         <AuthProvider>
  //           <ChatItem user={mockUser} />
  //         </AuthProvider>
  //       </ChatProvider>
  //     );

  //     const chatItem = container.querySelector(".chat_list");
  //     expect(chatItem).toHaveClass("active_chat");
  //   });

  //     (requestWithToken as vi.Mock).mockResolvedValueOnce({
  //       ok: false,
  //     });

  //     render(<ChatItem user={mockUser} />);

  //     const chatItem = screen.getByText("Test User");

  //     await fireEvent.click(chatItem);

  //     // Verificar SELECT_CHAT
  //     expect(mockDispatch).toHaveBeenCalledWith({
  //       type: CHAT_TYPE.SELECT_CHAT,
  //       payload: "user123",
  //     });

  //     // Verificar llamada a requestWithToken
  //     expect(requestWithToken).toHaveBeenCalledWith("messages/user123");

  //     // No debería haber ADD_MESSAGES ya que la respuesta no es válida
  //     expect(mockDispatch).not.toHaveBeenCalledWith(
  //       expect.objectContaining({ type: CHAT_TYPE.ADD_MESSAGES })
  //     );
  //   });

  //   it("should display offline status when user is offline", () => {
  //     const offlineUser = { ...mockUser, online: false };
  //     render(<ChatItem user={offlineUser} />);

  //     expect(screen.getByText("Offline")).toBeInTheDocument();
  //     expect(screen.queryByText("Online")).not.toBeInTheDocument();
  //   });
});
