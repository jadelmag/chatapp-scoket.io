import { AuthProvider } from "@/auth/authcontext";
import { SelectChat } from "@/components/selectchat/selectchat";
import { ChatProvider } from "@/context/chatcontext";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("SelectChat Component", () => {
  it("render without crashing", () => {
    render(
      <ChatProvider>
        <AuthProvider>
          <SelectChat />
        </AuthProvider>
      </ChatProvider>
    );

    const wrapperDiv = screen.getByLabelText("middle-screen");

    expect(wrapperDiv.className).toContain("middle-screen");
    expect(wrapperDiv).toBeInTheDocument();
  });

  it("render title", () => {
    render(
      <ChatProvider>
        <AuthProvider>
          <SelectChat />
        </AuthProvider>
      </ChatProvider>
    );

    const title = screen.getByRole("heading", { level: 3 });
    expect(title.innerHTML).toBe("Seleccione una persona");
  });

  it("render subtitle", () => {
    render(
      <ChatProvider>
        <AuthProvider>
          <SelectChat />
        </AuthProvider>
      </ChatProvider>
    );

    const subTitle = screen.getByLabelText("sub-text");
    expect(subTitle.innerHTML).toBe("Para iniciar una conversación");
  });
});
