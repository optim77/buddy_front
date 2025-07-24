import { ITag } from '../../tag/ITag';

export interface MediaObject {
    avatar: string | null;
    description: string | null;
    imageId: string;
    imageUrl: string;
    likeCount: number;
    likedByCurrentUser: boolean;
    mediaType: string;
    open: boolean;
    uploadedDate: string;
    userCreatedAt: string;
    userId: string;
    username: string;
    blurredUrl: string;
    tags: ITag[];
}
