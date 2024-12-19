import { AuthProvider } from "@/auth/authcontext";
import { OutcommingMessage } from "@/components/outcomingmessage/outcomingmessage";
import { ChatProvider } from "@/context/chatcontext";
import { Message } from "@/interfaces/message.interfaces";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("OutcommingMessage Component", () => {
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
          <OutcommingMessage msg={mockMessage} />
        </AuthProvider>
      </ChatProvider>
    );

    const wrapperDiv = screen.getByLabelText("outgoing_msg");
    expect(wrapperDiv).toBeInTheDocument();
  });

  it("render message", () => {
    render(
      <ChatProvider>
        <AuthProvider>
          <OutcommingMessage msg={mockMessage} />
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
          <OutcommingMessage msg={mockMessage} />
        </AuthProvider>
      </ChatProvider>
    );

    const date = screen.getByLabelText("time_date");
    expect(date).toBeInTheDocument();
    expect(date.innerHTML.trim()).toBe("abril 4 2024, 12:00 am");
  });

});
