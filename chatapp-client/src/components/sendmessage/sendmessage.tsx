import { useAuthContext } from "@/auth/authcontext";
import { useChatContext } from "@/context/chatcontext";
import { useSocketContext } from "@/context/socketcontext";
import { useState } from "react";

export const SendMessage = () => {
  const [message, setMessage] = useState<string>("");

  const { socket } = useSocketContext();
  const { auth } = useAuthContext();
  const { chatState } = useChatContext();

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = event.target.value;
    setMessage(newMessage);
  };

  const onHandleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.length === 0) return;
    socket?.emit("message-personal", {
      from: auth.uid,
      to: chatState.activeChat,
      message: message,
    });

    setMessage("");
  };

  return (
    <form role="form" onSubmit={onHandleSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={message}
            onChange={onHandleChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};
