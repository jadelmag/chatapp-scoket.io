import { hourMonth } from "@/helpers/date.functions";
import { Message } from "@/interfaces/message.interfaces";

interface OutcommingMessageProps {
  msg: Message;
}

export const OutcommingMessage: React.FC<OutcommingMessageProps> = ({
  msg,
}): JSX.Element => {
  return (
    <div aria-label="outgoing_msg" className="outgoing_msg">
      <div className="sent_msg">
        <p aria-label="message">{msg.message}</p>
        <span aria-label="time_date" className="time_date">
          {hourMonth(msg.createdAt)}
        </span>
      </div>
    </div>
  );
};
