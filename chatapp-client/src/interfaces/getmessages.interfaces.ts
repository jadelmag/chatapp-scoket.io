import { Message } from "@/interfaces/message.interfaces";

export interface MessagesResponse {
  ok: boolean;
  messages: Message[];
}
