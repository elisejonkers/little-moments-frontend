import { ObjectId } from "mongodb"
import { ReactNode } from "react"

export interface Album {
    name: string,
    dateOfBirth: Date,
    place: string,
    length: number,
    weight: number,
    imageURL?: string | undefined
    _id?: ObjectId
}

export interface Event {
    category: "Motor development" | "Social development" | "Language development" | "Sensory development" | "Other" | "Open this select menu",
    title: string,
    date: Date,
    description: string,
    album?: string | undefined,
    _id?: string,
    imageURL?: string
}

export interface AddEventFormProps {
    albumId?: string | undefined
    toggleAddEventForm?: () => void | undefined
    loadEvents?: () => void | undefined
}

export type InputFormControlElement = HTMLInputElement & {
    files: FileList | null
}

export interface EventsListProps {
    albumId?: string
}

export type IsPrivateAnonProps = {
    children: ReactNode
}

export interface LoginState {
    email: string,
    password: string
}

export interface AuthResponseData {
    authToken: string
}

export interface ErrorResponse {
    message: string
}

export interface SignUpState {
    email: string,
    password: string,
    firstName: string
}

