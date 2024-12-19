import { AuthProvider } from "@/auth/authcontext";
import { ChatProvider } from "@/context/chatcontext";
import useSocket from "@/hooks/useSocket";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";

vi.mock("@/helpers/localstorage.functions", async () => ({
  ...(await vi.importActual("@/helpers/localstorage.functions")),
  __esModule: true,
  loadOnLocalStorage: vi.fn(() => "11222"),
}));

describe("useSocket", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: React.PropsWithChildren) => (
    <ChatProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChatProvider>
  );

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useSocket("/"), {
      wrapper: wrapper,
    });
    const { online, socket, connectSocket, disconnectSocket } = result.current;

    expect(online).toBeFalsy();
    expect(socket).toBeNull();
    expect(connectSocket).toBeDefined();
    expect(disconnectSocket).toBeDefined();
  });

  it("should connect", async () => {
    const { result } = renderHook(() => useSocket("/"), {
      wrapper: wrapper,
    });
    const { online, socket, connectSocket, disconnectSocket } = result.current;

    act(() => {
      connectSocket();
    });

    await waitFor(() => {
      expect(online).toBeFalsy();
      expect(socket).toBeNull();
      expect(connectSocket).toBeDefined();
      expect(disconnectSocket).toBeDefined();
    });
  });
});
