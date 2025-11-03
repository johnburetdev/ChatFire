import type { Room } from "@/schemas/room.schema"
import { collection, query, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const UserRoomActions = () => {
    const db = useFirestore()
    const {data: user} = useUser()

    const roomRef = collection(db, "rooms")

    const roomQuery = query(
        roomRef, 
        where("partivipants", "array-contains", user!.uid)
    )

    const {data: rooms} = useFirestoreCollectionData(roomQuery, {
        suspense: true,
        idField: "id"
    })

    return{
        rooms: rooms as Room[]
    }
}

export default UserRoomActions
