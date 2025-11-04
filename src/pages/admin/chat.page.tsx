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
    <div className="grid md:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-4rem)]">
      <section className="flex flex-col gap-4 p-4 bg-background/95 rounded-lg border shadow-sm">
        <Suspense fallback={<div className="text-muted-foreground">Loading chats...</div>}>
          <FormSearchChat handleClickRoomId={handleClickRoomId} />
          <div className="flex-1 overflow-y-auto">
            <ListRoomChat handleClickRoomId={handleClickRoomId} />
          </div>
        </Suspense>
      </section>
      <section className="flex flex-col bg-background/95 rounded-lg border shadow-sm">
        {roomId ? (
          <Suspense fallback={<div className="flex-1 grid place-items-center"><div className="text-muted-foreground">Loading messages...</div></div>}>
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto">
                <MessagesChat roomId={roomId} />
              </div>
              <div className="p-4 border-t bg-background/95">
                <FormMessageChat roomId={roomId} />
              </div>
            </div>
          </Suspense>
        ) : (
          <div className="flex-1 grid place-items-center">
            <p className="text-muted-foreground">Select a chat to start messaging</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
