import type { Timestamp, FieldValue } from "firebase/firestore"


export interface Room {
    id: string
    partivipants: string[]
    createdAt: Timestamp | FieldValue
    lastMessage: LastMessage | null
    unreadMessages?: {
        [userId: string]: number
    }
}

export interface LastMessage{
    text: string
    senderId: string
    timestamp: Timestamp | FieldValue
}

export interface Message{
    id: string
    text: string
    senderId: string
    timestamp: Timestamp | FieldValue
}