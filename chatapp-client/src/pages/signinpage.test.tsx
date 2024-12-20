import { AuthProvider, useAuthContext } from "@/auth/authcontext";
import { ChatProvider } from "@/context/chatcontext";
import { SocketProvider } from "@/context/socketcontext";
import { SigninPage } from "@/pages/signinpage";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

vi.mock("@/auth/authcontext", async () => {
  const actual = await import("@/auth/authcontext");
  return {
    ...actual,
    useAuthContext: vi.fn(),
  };
});

describe("Signin Page Component", () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();

  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.resetMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render without crashing", () => {
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
              <SigninPage />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const title = screen.getByText("Chat - SIGN IN");
    expect(title).toBeInTheDocument();
  });

  it("update textbox when type on them", () => {
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
              <SigninPage />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const inputName = screen.getByLabelText("name") as HTMLInputElement;
    expect(inputName).toBeInTheDocument();
    expect(inputName.value).toBe("");

    fireEvent.change(inputName, { target: { value: "User" } });

    const inputEmail = screen.getByLabelText("email") as HTMLInputElement;
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail.value).toBe("");

    fireEvent.change(inputEmail, { target: { value: "user2@test.com" } });

    expect(inputEmail.value).toBe("user2@test.com");

    const inputPassword = screen.getByLabelText("password") as HTMLInputElement;
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword.value).toBe("");

    fireEvent.change(inputPassword, { target: { value: "123456" } });

    expect(inputPassword.value).toBe("123456");
    expect(button).not.toBeDisabled();
  });

  it("handle submit form return success", () => {
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
              <SigninPage />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const inputName = screen.getByLabelText("name") as HTMLInputElement;
    fireEvent.change(inputName, { target: { value: "User" } });

    const inputEmail = screen.getByLabelText("email") as HTMLInputElement;

    fireEvent.change(inputEmail, { target: { value: "user2@test.com" } });
    expect(inputEmail.value).toBe("user2@test.com");

    const inputPassword = screen.getByLabelText("password") as HTMLInputElement;

    fireEvent.change(inputPassword, { target: { value: "123456" } });
    expect(inputPassword.value).toBe("123456");

    const button = screen.getByLabelText("submit-button");

    fireEvent.click(button);
  });

  it("handle submit form return error", () => {
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
              <SigninPage />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    const inputName = screen.getByLabelText("name") as HTMLInputElement;
    fireEvent.change(inputName, { target: { value: "User" } });

    const inputEmail = screen.getByLabelText("email") as HTMLInputElement;

    fireEvent.change(inputEmail, { target: { value: "user2@test.com" } });
    expect(inputEmail.value).toBe("user2@test.com");

    const inputPassword = screen.getByLabelText("password") as HTMLInputElement;

    fireEvent.change(inputPassword, { target: { value: "123456" } });
    expect(inputPassword.value).toBe("123456");

    const button = screen.getByLabelText("submit-button");

    fireEvent.click(button);

    fetchMock.mockResponseOnce(JSON.stringify({ ok: false }), { status: 401 });

    const sweetalertButton = screen.getByLabelText("Close this dialog");
    expect(sweetalertButton).toBeInTheDocument();
  });
});
