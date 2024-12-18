import { Conversation } from "@/components/conversation";
import { InboxPeople } from "@/components/inboxpeople";
import { SelectChat } from "@/components/selectchat";
import { useChatContext } from "@/context/chatcontext";
import "../css/chat.css";

export const ChatPage = () => {
  const { chatState } = useChatContext();

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />

        {chatState.activeChat ? <Conversation /> : <SelectChat />}
      </div>
    </div>
  );
};