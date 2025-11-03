import FormMessageChat from "@/components/chat/form-message-chat";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomid] = useState("");
  const handleClickRoomId = (id: string) => {
    setRoomid(id);
  };
  return (
    <div className="grid md: grid-cols-2">
      <section>
        <Suspense fallback={<div>Loading chats</div>}>
          <ListRoomChat handleClickRoomId={handleClickRoomId} />
        </Suspense>
      </section>
      <section>
        {roomId ? (
          <Suspense fallback={<div>Loading messages...</div>}>
            <FormMessageChat roomId={roomId} />
            <MessagesChat roomId={roomId} />
          </Suspense>
        ) : (
          <div>Select chat</div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
