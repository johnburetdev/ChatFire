import { useMessagesActions } from "@/hooks/use-messages-actions";
import MessageChat from "./message-chat";
interface Props {
  roomId: string;
}
const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessagesActions(roomId);

  return (
    <div className="p-2 m-2">
      {messages.map((message) => (
        <MessageChat key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessagesChat;
