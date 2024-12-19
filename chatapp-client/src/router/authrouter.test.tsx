import { AuthProvider } from "@/auth/authcontext";
import { ChatProvider } from "@/context/chatcontext";
import { SocketProvider } from "@/context/socketcontext";
import { AuthRouter } from "@/router/authrouter";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

describe("AuthRouter", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <AuthRouter />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const wrapperDiv: Element | null = container.querySelector("#limiter");
    expect(wrapperDiv?.className).toBe("limiter");
  });

  it("should navigate to LoginPage when route is /login", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <AuthRouter />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const title = screen.getByText("Chat - LOG IN");
    expect(title).toBeInTheDocument();
  });

  it("should navigate to SigninPage when route is /signin", () => {
    render(
      <MemoryRouter initialEntries={["/signin"]}>
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <AuthRouter />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const title = screen.getByText("Chat - SIGN IN");
    expect(title).toBeInTheDocument();
  });

  it("should not navigate when route is /unknown", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <AuthRouter />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const wrapperDiv = screen.getByLabelText("limiter");
    expect(wrapperDiv).toBeInTheDocument();
  });
});
