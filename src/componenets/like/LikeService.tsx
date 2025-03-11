import axios from 'axios';

import authService from '../../services/authService';

export interface LikeButtonProps {
    mediaId: string;
}

export async function likePhoto(photoId: string): Promise<void> {
    try {
        await axios.post(
            `${process.env.REACT_APP_API_ADDRESS}/like/image/` + photoId,
            { photoId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authService.getToken()}`,
                },
            },
        );
    } catch (error) {
        return;
    }
}
