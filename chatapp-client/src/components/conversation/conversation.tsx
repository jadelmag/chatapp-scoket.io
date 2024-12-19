import { useAuthContext } from "@/auth/authcontext";
import { IncomingMessage } from "@/components/incomingmessage/incomingmessage";
import { OutcommingMessage } from "@/components/outcomingmessage/outcomingmessage";
import { SendMessage } from "@/components/sendmessage/sendmessage";
import { useChatContext } from "@/context/chatcontext";
import { animationToBottom } from "@/helpers/scroll.functions";
import { Message } from "@/interfaces/message.interfaces";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export const Conversation = () => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { chatState } = useChatContext();
  const { auth } = useAuthContext();

  useEffect(() => {
    const scrollToBottom = () => {
      const element: HTMLDivElement | null = messagesEndRef.current;
      if (!element) return;
      animationToBottom(element);
    };
    scrollToBottom();
  }, [chatState.messages]);

  return (
    <div className="mesgs">
      <div ref={messagesEndRef} className="msg_history">
        {chatState.messages.map((message: Message) => {
          return message.to === auth.uid ? (
            <IncomingMessage key={uuidv4()} msg={message} />
          ) : (
            <OutcommingMessage key={uuidv4()} msg={message} />
          );
        })}
      </div>

      <SendMessage />
    </div>
  );
};
