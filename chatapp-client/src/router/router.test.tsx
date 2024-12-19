import { AuthProvider, useAuthContext } from "@/auth/authcontext";
import { ROUTE } from "@/constants/routes.constants";
import { ChatProvider } from "@/context/chatcontext";
import { SocketProvider } from "@/context/socketcontext";
import { Router } from "@/router/router";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

vi.mock("@/auth/authcontext", async () => {
  const actual = await import("@/auth/authcontext");
  return {
    ...actual,
    useAuthContext: vi.fn(),
  };
});

describe("Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render without crashing", () => {
    vi.mocked(useAuthContext).mockReturnValue({
      auth: {
        uid: null,
        checking: false, // Estado específico para esta prueba
        logged: false,
        name: null,
        email: null,
      },
      login: vi.fn(),
      signin: vi.fn(),
      logout: vi.fn(),
      verifytoken: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <Router />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const title = screen.getByText("Chat - LOG IN");
    expect(title).toBeInTheDocument();
  });

  it("renders Loader when auth is checking", () => {
    vi.mocked(useAuthContext).mockReturnValue({
      auth: {
        uid: null,
        checking: true,
        logged: false,
        name: null,
        email: null,
      },
      login: vi.fn(),
      signin: vi.fn(),
      logout: vi.fn(),
      verifytoken: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <Router />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const spinner = screen.getByLabelText("Loading Spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders Loader when user is logged redirect to chat with auth path", () => {
    vi.mocked(useAuthContext).mockReturnValue({
      auth: {
        uid: "123",
        checking: false,
        logged: true,
        name: "User Name Test",
        email: "usertest@test.com",
      },
      login: vi.fn(),
      signin: vi.fn(),
      logout: vi.fn(),
      verifytoken: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={[ROUTE.AUTH]}>
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <Router />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const userName = screen.getByRole("heading", {
      level: 4,
    });
    expect(userName).toBeInTheDocument();
    expect(userName.innerHTML).toBe("User Name Test");

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.innerHTML).toBe("Salir");
  });

  it("renders Loader when user is logged redirect to chat with a unknows url", () => {
    vi.mocked(useAuthContext).mockReturnValue({
      auth: {
        uid: "123",
        checking: false,
        logged: true,
        name: "User Name Test",
        email: "usertest@test.com",
      },
      login: vi.fn(),
      signin: vi.fn(),
      logout: vi.fn(),
      verifytoken: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={["/auth/login/uknown"]}>
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <Router />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const userName = screen.getByRole("heading", {
      level: 4,
    });
    expect(userName).toBeInTheDocument();
    expect(userName.innerHTML).toBe("User Name Test");

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.innerHTML).toBe("Salir");
  });
});
