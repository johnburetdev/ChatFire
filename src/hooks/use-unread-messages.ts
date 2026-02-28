import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { collection, query, where } from "firebase/firestore";
import type { Room } from "@/schemas/room.schema";

export function useUnreadMessages() {
  const { data: user } = useUser();
  const firestore = useFirestore();

  const roomsCollection = collection(firestore, "rooms");
  const roomsQuery = query(
    roomsCollection,
    where("partivipants", "array-contains", user?.uid || "")
  );

  const { data: rooms = [] } = useFirestoreCollectionData(roomsQuery, {
    idField: "id",
  });

  const unreadCount = (rooms as Room[]).reduce((count, room) => {
    const userUnreadCount = user?.uid ? (room.unreadMessages?.[user.uid] ?? 0) : 0;
    return count + userUnreadCount;
  }, 0);

  return {
    hasUnreadMessages: unreadCount > 0,
    unreadCount,
  };
}