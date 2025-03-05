export interface IMedia {
    imageId: string;
    mediaType: string;
    imageUrl: string;
    description: string | null;
    username: string;
    userId: string;
    likeCount: number;
    likedByCurrentUser: boolean;
    blurredUrl: string;
}
