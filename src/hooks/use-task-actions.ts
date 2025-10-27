import type { Task } from "@/schemas/task.schemas";
import { addDoc, collection, deleteDoc, doc, query, updateDoc, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"


const UseTaskActions = () => {
    
    const {data: user} = useUser();
    
    if(!user){
        throw new Error("User not authenticated")
    }

    const db = useFirestore();
    const taskCollectionRef = collection(db, "Tasks");

    const taskQuery = query(
        taskCollectionRef,
        where("userId", "==", user!.uid)
    )

    const {status, data: tasks} = useFirestoreCollectionData(taskQuery, {
        idField: "id",
        suspense: true
    })

    //Create new task
    const createTask = async (data: {
        title: string;
        description?: string;
    }) => {
        const newTask = {
            ...data,
            completed: false,
            userId: user!.uid
        }

        return await addDoc(taskCollectionRef, newTask)
    }

    //Delete task
    const deleteTask = async (taskId: string) => {
        const taskDoc = doc(db, "Tasks", taskId);
        return await deleteDoc(taskDoc) 
   }

   //toggle task completion
   const toggleTaskCompletion = async( taskId: string) => {

    const task = tasks.find((task) => task.id === taskId);

    if(!task){
        throw new Error("Task not found");
    }

    const taskDoc = doc(db, "Tasks", taskId);

    return await updateDoc(taskDoc,{
        completed: !task.completed, 
    })
   }

    return {
        tasks: tasks as Task[],
        isLoading: status === "loading",

        createTask,
        deleteTask, 
        toggleTaskCompletion
    }
}

export default UseTaskActions
