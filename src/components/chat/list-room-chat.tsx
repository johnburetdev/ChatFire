import UserRoomActions from "@/hooks/use-room-actions";

import RoomChat from "./room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomChat = ({ handleClickRoomId }: Props) => {
  const { rooms } = UserRoomActions();
  return (
    <div>
      {rooms.map((room) => (
        <RoomChat
          key={room.id}
          room={room}
          handleClickRoomId={handleClickRoomId}
        />
      ))}
    </div>
  );
};

export default ListRoomChat;
