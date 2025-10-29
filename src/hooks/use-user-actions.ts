import type { UserFirestore } from "@/schemas/user.schema"
import type { User } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useFirestore } from "reactfire"

export const UseUserActions = () => {

    const db = useFirestore()

    const createOrUpdateUser = async (user: User) => {
        if(!user) throw new Error("User invalid")
        //Referece user documente in firestore
        const userDocRef = doc(db, "Users", user.uid)

        const userData: UserFirestore ={
            email: user.email || "",
            uid: user.uid,
            displayName: user.displayName || "",
            photoURL: user.photoURL || ""
        }
        return await setDoc(userDocRef, userData, {
            merge: true
        })
    }

    return {createOrUpdateUser}

}


