import type { Room } from "@/schemas/room.schema";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const UserRoomActions = () => {
  const db = useFirestore();
  const { data: user } = useUser();

  const roomRef = collection(db, "rooms");

  const roomQuery = query(
    roomRef,
    where("partivipants", "array-contains", user!.uid)
  );

  const { data: rooms } = useFirestoreCollectionData(roomQuery, {
    suspense: true,
    idField: "id",
  });

  const searchUserWithEmail = async (email: string) => {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const doc = querySnapshot.docs[0];
    return doc.data();
  };

  const findOrCreateRoom = async (friendEmail: string) => {
    if (!user)
      return {
        success: false,
        message: "401 no autorized",
        roomId: null,
    };

    if (user.email === friendEmail) {
      return {
        success: false,
        message: "400 You can't search your email",
        roomId: null,
      };
    }

    const friend = await searchUserWithEmail(friendEmail);

    if(!friend) return {
        success: false,
        message: "404 Friend not found",
        roomId: null,
    }

    const existRoom = rooms.find(room => (
        room.partivipants.find((uid: string) => uid === friend.uid)
    ))

    if(existRoom) return {
        success: true,
        message: "200 Room encontrada",
        roomId: existRoom.id,
    }

    const newRoom: Omit<Room, "id"> = {
        createdAt: serverTimestamp(),
        lastMessage: null,
        partivipants: [friend.uid, user.uid]
    }

    const document = await addDoc(roomRef, newRoom)

    return{
        success: true,
        message: "200 Room created",
        roomId: document.id,
    }
  };

  return {
    rooms: rooms as Room[],
    findOrCreateRoom
  };
};


