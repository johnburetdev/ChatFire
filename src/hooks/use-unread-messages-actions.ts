import { useFirestore } from "reactfire";
import { doc, updateDoc, increment } from "firebase/firestore";

export function useUnreadMessagesActions() {
  const firestore = useFirestore();

  const incrementUnreadMessages = async (roomId: string, userId: string) => {
    const roomRef = doc(firestore, "rooms", roomId);
    await updateDoc(roomRef, {
      [`unreadMessages.${userId}`]: increment(1),
    });
  };

  const clearUnreadMessages = async (roomId: string, userId: string) => {
    const roomRef = doc(firestore, "rooms", roomId);
    await updateDoc(roomRef, {
      [`unreadMessages.${userId}`]: 0,
    });
  };

  return {
    incrementUnreadMessages,
    clearUnreadMessages,
  };
}