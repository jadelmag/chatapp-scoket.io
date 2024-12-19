import { AuthProvider, useAuthContext } from "@/auth/authcontext";
import { ChatProvider } from "@/context/chatcontext";
import {
    loadOnLocalStorage,
    removeItemOnLocalStorage,
    saveOnLocalStorage,
} from "@/helpers/localstorage.functions";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

// Mock helpers
vi.mock("@/helpers/localstorage.functions", () => ({
  loadOnLocalStorage: vi.fn(),
  removeItemOnLocalStorage: vi.fn(),
  saveOnLocalStorage: vi.fn(),
}));

describe("AuthContext", () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();

  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.resetMocks();
  });

  const wrapper = ({ children }: React.PropsWithChildren) => (
    <ChatProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChatProvider>
  );

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: wrapper,
    });

    const { uid, name, email, logged, checking } = result.current.auth;

    expect(uid).toBeNull();
    expect(name).toBeNull();
    expect(email).toBeNull();
    expect(logged).toBeFalsy();
    expect(checking).toBeTruthy();
  });

  it("should login successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ok: true,
        token: "abc123",
        user: {
          uid: "123",
          name: "Test User",
          email: "user@test.com",
        },
      })
    );

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      const success = await result.current.login("user@test.com", "password");
      expect(success).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.API_URL}/login`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "user@test.com",
          password: "password",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    expect(saveOnLocalStorage).toHaveBeenCalledWith("token", "abc123");
    expect(result.current.auth).toEqual({
      uid: "123",
      checking: false,
      logged: true,
      name: "Test User",
      email: "user@test.com",
    });
  });

  it("should fail login with invalid credentials", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ ok: false }), { status: 401 });

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      const success = await result.current.login(
        "invalid@test.com",
        "wrongpass"
      );
      expect(success).toBe(false);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.API_URL}/login`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "invalid@test.com",
          password: "wrongpass",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    expect(result.current.auth.logged).toBe(false);
  });

  it("should signup successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ok: true,
        token: "abc123",
        user: {
          uid: "456",
          name: "New User",
          email: "newuser@test.com",
        },
      })
    );

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      const success = await result.current.signin(
        "New User",
        "newuser@test.com",
        "password123"
      );
      expect(success).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.API_URL}/login/new`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "New User",
          email: "newuser@test.com",
          password: "password123",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    expect(saveOnLocalStorage).toHaveBeenCalledWith("token", "abc123");
    expect(result.current.auth).toEqual({
      uid: "456",
      checking: false,
      logged: true,
      name: "New User",
      email: "newuser@test.com",
    });
  });

  it("should signup unsuccessfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ok: false,
        token: "abc123",
        user: {
          uid: "456",
          name: "New User",
          email: "newuser@test.com",
        },
      })
    );

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      const success = await result.current.signin(
        "New User",
        "newuser@test.com",
        "password123"
      );
      expect(success).toBe(false);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.API_URL}/login/new`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "New User",
          email: "newuser@test.com",
          password: "password123",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    expect(saveOnLocalStorage).not.toHaveBeenCalledWith("token", "abc123");
    expect(result.current.auth).toEqual({
      checking: true,
      email: null,
      logged: false,
      name: null,
      uid: null,
    });
  });

  it("should logout and reset auth state", () => {
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(removeItemOnLocalStorage).toHaveBeenCalledWith("token");
    expect(result.current.auth).toEqual({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    });
  });

  it("should verify token if token not exist", async () => {
    // vi.mocked(loadOnLocalStorage).mockReturnValue("invalidToken");
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ok: false,
        token: null,
        user: {
          uid: "789",
          name: "Verified User",
          email: "verified@test.com",
        },
      })
    );

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      const success = await result.current.verifytoken();
      expect(success).toBe(false);
    });

    expect(result.current.auth).toEqual({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    });
  });

  it("should verify token and login user if token is valid", async () => {
    vi.mocked(loadOnLocalStorage).mockReturnValue("validToken");
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ok: true,
        token: "newToken123",
        user: {
          uid: "789",
          name: "Verified User",
          email: "verified@test.com",
        },
      })
    );

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      const success = await result.current.verifytoken();
      expect(success).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.API_URL}/login/renew`,
      expect.objectContaining({
        headers: {
          "x-token": "validToken",
        },
      })
    );

    expect(saveOnLocalStorage).toHaveBeenCalledWith("token", "newToken123");
    expect(result.current.auth).toEqual({
      uid: "789",
      checking: false,
      logged: true,
      name: "Verified User",
      email: "verified@test.com",
    });
  });

  it("should verify token and logout user if token is invalid", async () => {
    vi.mocked(loadOnLocalStorage).mockReturnValue("invalidToken");
    fetchMock.mockResponseOnce(JSON.stringify({ ok: false }), { status: 401 });

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      const success = await result.current.verifytoken();
      expect(success).toBe(false);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.API_URL}/login/renew`,
      expect.objectContaining({
        headers: {
          "x-token": "invalidToken",
        },
      })
    );

    expect(removeItemOnLocalStorage).not.toHaveBeenCalledWith("token");
    expect(result.current.auth).toEqual({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    });
  });

  it("should throw an error if useAuthContext is used outside AuthProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useAuthContext();
      } catch (e) {
        return e;
      }
    });

    expect(result.current).toEqual(
      new Error("useAuthContext must be used within a AuthProvider")
    );
  });
});
