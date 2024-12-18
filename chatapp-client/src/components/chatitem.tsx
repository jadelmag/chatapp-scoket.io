import UserPNG from "@/assets/png/avatar.png";
import { useChatContext } from "@/context/chatcontext";
import { requestWithToken } from "@/helpers/requests.functions";
import { User } from "@/interfaces/user.interfaces";
import { CHAT_TYPE } from "@/reducers/chatreducer";

interface ChatItemProps {
  user: User;
}

export const ChatItem: React.FC<ChatItemProps> = ({ user }) => {
  const { chatState, dispatch } = useChatContext();
  const { activeChat } = chatState;

  const onHandleClick = async () => {
    dispatch({
      type: CHAT_TYPE.SELECT_CHAT,
      payload: user.uid,
    });

    const resp = await requestWithToken(`messages/${user.uid}`);
    if (resp.ok) {
      dispatch({
        type: CHAT_TYPE.ADD_MESSAGES,
        payload: resp.messages,
      });
    }
  };

  const activeClass = user.uid === activeChat && "active_chat";
  return (
    <div className={`chat_list ${activeClass}`} onClick={onHandleClick}>
      <div className="chat_people">
        <div className="chat_img">
          <img src={UserPNG} alt="sunil" />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
