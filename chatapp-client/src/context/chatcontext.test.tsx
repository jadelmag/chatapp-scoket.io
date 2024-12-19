
import { useChatContext } from "@/context/chatcontext";
import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";

describe("ChatContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if useChatContext is used outside ChatProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useChatContext();
      } catch (e) {
        return e;
      }
    });

    expect(result.current).toEqual( new Error("useChatContext must be used within a ChatProvider"));
  });
});
