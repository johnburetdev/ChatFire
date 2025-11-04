import { UserRoomActions } from "@/hooks/use-room-actions";

import RoomChat from "./room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomChat = ({ handleClickRoomId }: Props) => {
  const { rooms } = UserRoomActions();
  return (
    <div className="space-y-1">
      {rooms.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No chats yet. Search for a user to start chatting!
        </p>
      ) : (
        rooms.map((room) => (
          <RoomChat
            key={room.id}
            room={room}
            handleClickRoomId={handleClickRoomId}
          />
        ))
      )}
    </div>
  );
};

export default ListRoomChat;
