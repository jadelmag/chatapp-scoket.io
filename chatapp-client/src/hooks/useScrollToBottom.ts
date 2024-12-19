import { animationToBottom } from "@/helpers/scroll.functions";
import { Message } from "@/interfaces/message.interfaces";
import { useEffect } from "react";

export const useScrollToBottom = (
  ref: React.RefObject<HTMLDivElement>,
  messages: Message[]
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    animationToBottom(element);
  }, [ref, messages]);
};
