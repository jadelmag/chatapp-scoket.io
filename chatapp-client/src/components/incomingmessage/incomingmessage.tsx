import UserPNG from "@/assets/png/avatar.png";
import { hourMonth } from "@/helpers/date.functions";
import { Message } from "@/interfaces/message.interfaces";

interface IncomingMessageProps {
  msg: Message;
}

export const IncomingMessage: React.FC<IncomingMessageProps> = ({ msg }) => {
  return (
    <div aria-label="incoming_msg" className="incoming_msg">
      <div className="incoming_msg_img">
        <img src={UserPNG} alt="sunil" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p aria-label="message">{msg.message}</p>
          <span className="time_date" aria-label="time_date"> {hourMonth(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
