import { AuthProvider } from "@/auth/authcontext";
import { ChatProvider } from "@/context/chatcontext";
import useSocket from "@/hooks/useSocket";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";

vi.mock("@/helpers/localstorage.functions", async () => ({
  ...(await vi.importActual("@/helpers/localstorage.functions")),
  __esModule: true,
  loadOnLocalStorage: vi.fn(() => "token-valid"),
}));

const mockSocket = {
  on: vi.fn(),
  emit: vi.fn(),
  disconnect: vi.fn(),
};

vi.mock("socket.io-client", () => ({
  io: vi.fn(() => mockSocket),
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
    const { result } = renderHook(() => useSocket("/"), { wrapper });
    const { online, socket, connectSocket, disconnectSocket } = result.current;

    expect(online).toBeFalsy();
    expect(socket).toBeNull();
    expect(connectSocket).toBeDefined();
    expect(disconnectSocket).toBeDefined();
  });

  it("should connect and update online state", async () => {
    const { result } = renderHook(() => useSocket("/"), { wrapper });
    const { connectSocket } = result.current;

    act(() => {
      connectSocket();
    });

    act(() => {
      mockSocket.on.mock.calls.forEach(([event, callback]) => {
        if (event === "connect") {
          callback();
        }
      });
    });

    await waitFor(() => {
      expect(result.current.online).toBeTruthy();
    });
  });

  it("should handle socket on connect event", async () => {
    const { result } = renderHook(() => useSocket("/"), { wrapper });
    const { connectSocket } = result.current;

    act(() => {
      connectSocket();
    });

    act(() => {
      mockSocket.on.mock.calls.forEach(([event, callback]) => {
        if (event === "connect") {
          callback();
        }
      });
    });

    expect(mockSocket.on).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(result.current.online).toBeTruthy();
  });

  it("should handle socket on disconnect event", async () => {
    const { result } = renderHook(() => useSocket("/"), { wrapper });
    const { connectSocket } = result.current;

    act(() => {
      connectSocket();
    });

    act(() => {
      mockSocket.on.mock.calls.forEach(([event, callback]) => {
        if (event === "disconnect") {
          callback();
        }
      });
    });

    expect(mockSocket.on).toHaveBeenCalledWith("disconnect", expect.any(Function));
    expect(result.current.online).toBeFalsy();
  });
});
