import { AuthProvider } from "@/auth/authcontext";
import { InboxPeople } from "@/components/inboxpeople/inboxpeople";
import { ChatProvider } from "@/context/chatcontext";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("InboxPeople Component", () => {
  it("contains the correct class name for the wrapper div", () => {
   render(
      <ChatProvider>
        <AuthProvider>
          <InboxPeople />
        </AuthProvider>
      </ChatProvider>
    );

    const wrapperDiv = screen.getByLabelText('inbox-people');
    
    expect(wrapperDiv.className).toContain('inbox_people');
    expect(wrapperDiv).toBeInTheDocument();
  });
});
