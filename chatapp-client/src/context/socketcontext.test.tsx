import { useSocketContext } from "@/context/socketcontext";
import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";

describe("ChatContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if useSocketContext is used outside SocketProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useSocketContext();
      } catch (e) {
        return e;
      }
    });

    expect(result.current).toEqual({
      socket: null,
      online: false,
    });
  });
});
