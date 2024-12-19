import UserPNG from "@/assets/png/avatar.png";
import { useChatContext } from "@/context/chatcontext";
import { MessagesResponse } from "@/interfaces/getmessages.interfaces";
import { User } from "@/interfaces/user.interfaces";
import { CHAT_TYPE } from "@/reducers/chatreducer";
import { requestWithToken } from "@/services/requests.functions";
import { useCallback } from "react";

interface ChatItemProps {
  user: User;
}

export const ChatItem: React.FC<ChatItemProps> = ({ user }) => {
  const { chatState, dispatch } = useChatContext();
  const { activeChat } = chatState;

  const onGetMessages = useCallback(async () => {
    try {
      const resp: MessagesResponse = await requestWithToken(
        `messages/${user.uid}`
      );
      if (resp?.ok) {
        dispatch({
          type: CHAT_TYPE.ADD_MESSAGES,
          payload: resp.messages,
        });
      } else {
        console.log("Error al obtener mensajes");
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [dispatch, user.uid]);

  const onHandleClick = useCallback(() => {
    dispatch({
      type: CHAT_TYPE.SELECT_CHAT,
      payload: user.uid,
    });

    onGetMessages();
  }, [dispatch, user.uid, onGetMessages]);

  const activeClass = user.uid === activeChat ? "active_chat" : "";
  return (
    <div
      aria-label="chat-item"
      className={`chat_list ${activeClass}`}
      onClick={onHandleClick}
    >
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
