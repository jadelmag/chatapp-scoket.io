import { useAuthContext } from "@/auth/authcontext";
import { ChatItem } from "@/components/chatitem/chatitem";
import { useChatContext } from "@/context/chatcontext";
import { User } from "@/interfaces/user.interfaces";

export const SideBar = () => {
  const { auth } = useAuthContext();
  const { chatState } = useChatContext();

  return (
    <div className="inbox_chat">
      {chatState.users
        .filter((user: User) => user.uid !== auth.uid)
        .map((user: User) => (
          <ChatItem key={user.uid} user={user} />
        ))}
      <div className="extra_space"></div>
    </div>
  );
};
