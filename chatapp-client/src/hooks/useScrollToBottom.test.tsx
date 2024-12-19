import { AuthProvider } from "@/auth/authcontext";
import { ChatProvider } from "@/context/chatcontext";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";
import { useScrollToBottom } from "./useScrollToBottom";

describe("useScrollToBottom", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: React.PropsWithChildren) => (
    <ChatProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChatProvider>
  );

  it("should initialize with default state", () => {
    const refItem = { current: null };
    const { result } = renderHook(() => useScrollToBottom(refItem, []), {
      wrapper: wrapper,
    });
    expect(result.current).toBeUndefined();
  });
});
