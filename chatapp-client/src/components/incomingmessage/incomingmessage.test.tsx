import { AuthProvider } from "@/auth/authcontext";
import { IncomingMessage } from "@/components/incomingmessage/incomingmessage";
import { ChatProvider } from "@/context/chatcontext";
import { Message } from "@/interfaces/message.interfaces";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("IncomingMessage Component", () => {
  const mockMessage: Message = {
    _id: "1234",
    from: "1111",
    to: "2222",
    message: "Hello friend!",
    createdAt: "2024-04-04",
    updatedAt: "2024-04-04",
  };

  it("render without crashing", () => {
    render(
      <ChatProvider>
        <AuthProvider>
          <IncomingMessage msg={mockMessage} />
        </AuthProvider>
      </ChatProvider>
    );

    const wrapperDiv = screen.getByLabelText("incoming_msg");
    expect(wrapperDiv).toBeInTheDocument();
  });

  it("render image", () => {
    render(
      <ChatProvider>
        <AuthProvider>
          <IncomingMessage msg={mockMessage} />
        </AuthProvider>
      </ChatProvider>
    );

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "sunil");
  });

  it("render message", () => {
    render(
      <ChatProvider>
        <AuthProvider>
          <IncomingMessage msg={mockMessage} />
        </AuthProvider>
      </ChatProvider>
    );

    const message = screen.getByLabelText("message");
    expect(message).toBeInTheDocument();
    expect(message.innerHTML).toBe("Hello friend!");
  });

  it("render date", () => {
    render(
      <ChatProvider>
        <AuthProvider>
          <IncomingMessage msg={mockMessage} />
        </AuthProvider>
      </ChatProvider>
    );

    const date = screen.getByLabelText("time_date");
    expect(date).toBeInTheDocument();
    expect(date.innerHTML.trim()).toBe("abril 4 2024, 12:00 am");
  });

});
