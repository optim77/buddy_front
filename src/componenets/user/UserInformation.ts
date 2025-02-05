import Plan from "../plan/Plan";

export interface UserInformation {
    active: boolean,
    age: number
    avatar: string
    description: string
    followed: boolean
    followers: number
    following: number
    locked: boolean
    posts: number
    subscribed: boolean
    subscribers: number
    username: string
    uuid: string
    plans: Plan[]
}