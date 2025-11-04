import type { Room } from "@/schemas/room.schema";
import { useUser } from "reactfire";
import { Button } from "../ui/button";
import FriendEmail from "./friend-email";
import { Suspense } from "react";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}

const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();

  const friendUID = room.partivipants.find((id) => id !== user?.uid) || "";

  return (
    <Button
      variant="ghost"
      className="w-full justify-start py-6 px-4 hover:bg-muted/50"
      onClick={() => handleClickRoomId(room.id)}
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
      </div>
    </Button>
  );
};
export default RoomChat;
