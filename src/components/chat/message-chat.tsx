import type { Message } from "@/schemas/room.schema";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";
import { cn } from "@/lib/utils";

interface Props {
  message: Message;
}

const MessageChat = ({ message }: Props) => {
  const { data: user } = useUser();

  const isFriend = user?.uid !== message.senderId;

  return (
    <div
      className={cn(
        "max-w-[150px] p-2 m-2 rounded",
        isFriend ? "bg-pink-200" : "bg-green-200 ml-auto"
      )}
    >
      <p>{message.text}</p>
      <p className="truncate text-xs">
        {isFriend ? <FriendEmail friendUID={message.senderId} /> : user.email}
      </p>
    </div>
  );
};

export default MessageChat;
