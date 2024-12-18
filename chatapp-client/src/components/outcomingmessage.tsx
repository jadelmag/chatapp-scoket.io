import { hourMonth } from "@/helpers/date.functions";
import { Message } from "@/interfaces/message.interfaces";

interface OutcommingMessageProps {
  msg: Message;
}

export const OutcommingMessage: React.FC<OutcommingMessageProps> = ({
  msg,
}): JSX.Element => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg.message}</p>
        <span className="time_date">{hourMonth(msg.createdAt)}</span>
      </div>
    </div>
  );
};
