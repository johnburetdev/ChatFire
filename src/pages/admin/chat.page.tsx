import FormMessageChat from "@/components/chat/form-message-chat";
import FormSearchChat from "@/components/chat/form-search-chat";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomid] = useState("");
  const handleClickRoomId = (id: string) => {
    setRoomid(id);
  };
  return (
    <div className="grid md: grid-cols-2 gap-4">
      <section className="space-y-2">
        <Suspense fallback={<div>Loading chats</div>}>
          <FormSearchChat handleClickRoomId={handleClickRoomId} />
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
