import { useAuthContext } from "@/auth/authcontext";
import { IncomingMessage } from "@/components/incomingmessage/incomingmessage";
import { OutcommingMessage } from "@/components/outcomingmessage/outcomingmessage";
import { SendMessage } from "@/components/sendmessage/sendmessage";
import { useChatContext } from "@/context/chatcontext";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { Message } from "@/interfaces/message.interfaces";
import { useRef } from "react";

const renderMessage = (message: Message, authUid: string | null) => {
  if (!authUid) return null;
  return message.to === authUid ? (
    <IncomingMessage key={message._id} msg={message} />
  ) : (
    <OutcommingMessage key={message._id} msg={message} />
  );
};

export const Conversation = () => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { chatState } = useChatContext();
  const { auth } = useAuthContext();

  useScrollToBottom(messagesEndRef, chatState.messages);

  return (
    <div className="mesgs" role="log" aria-live="polite">
      <div ref={messagesEndRef} className="msg_history">
        {chatState.messages.map((message) => renderMessage(message, auth.uid))}
      </div>

      <SendMessage />
    </div>
  );
};
