import type { Room } from "@/schemas/room.schema";
import { useUser } from "reactfire";
import { Button } from "../ui/button";
import FriendEmail from "./friend-email";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

import { useUnreadMessagesActions } from "@/hooks/use-unread-messages-actions";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}

const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();
  const { clearUnreadMessages } = useUnreadMessagesActions();

  const friendUID = room.partivipants.find((id) => id !== user?.uid) || "";

  const handleRoomClick = async () => {
    if (user) {
      await clearUnreadMessages(room.id, user.uid);
      handleClickRoomId(room.id);
    }
  };

  // Si hay mensajes no leídos para la sala actual y el usuario actual
  const unreadCount = user?.uid ? room.unreadMessages?.[user.uid] ?? 0 : 0;
  const hasUnreadMessages = unreadCount > 0;

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start py-6 px-4 relative",
        hasUnreadMessages
          ? "bg-primary/5 hover:bg-primary/10"
          : "hover:bg-muted/50"
      )}
      onClick={handleRoomClick}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-sm font-semibold">
            {friendUID.charAt(0)?.toUpperCase() || "?"}
          </span>
        </div>
        <div className="flex-1 truncate text-left">
          <Suspense
            fallback={
              <span className="text-muted-foreground text-sm">Loading...</span>
            }
          >
            <FriendEmail friendUID={friendUID} />
          </Suspense>
        </div>
        {hasUnreadMessages && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
        )}
      </div>
    </Button>
  );
};
export default RoomChat;
