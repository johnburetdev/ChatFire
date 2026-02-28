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
        "max-w-[280px] p-3 rounded-2xl shadow-sm",
        isFriend
          ? "bg-muted text-muted-foreground self-start rounded-tl-sm"
          : "bg-primary text-primary-foreground self-end rounded-tr-sm"
      )}
    >
      <p className="wrap-break-word text-sm">{message.text}</p>
      <p className="truncate text-xs mt-1 opacity-75">
        {isFriend ? <FriendEmail friendUID={message.senderId} /> : user?.email}
      </p>
    </div>
  );
};

export default MessageChat;
