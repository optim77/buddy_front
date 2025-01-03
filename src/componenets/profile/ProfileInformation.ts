export interface ProfileInformation {
    uuid: string;
    email: string;
    username: string;
    description: string | null;
    age: number;
    avatar: string;
    active: boolean;
    locked: boolean;
    posts: number;
    followers: number
    following: number;
    subscribers: number;
    followed: boolean | null;
    subscribed: boolean | null;
}