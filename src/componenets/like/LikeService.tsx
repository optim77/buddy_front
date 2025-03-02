import axios from 'axios';

import authService from '../../services/authService';

export interface LikeButtonProps {
    mediaId: string;
}

export async function likePhoto(photoId: string): Promise<void> {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_ADDRESS}/like/image/` + photoId,
            { photoId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authService.getToken()}`,
                },
            },
        );

        if (response.status === 200) {
            console.log(`Photo ${photoId} liked successfully!`);
        } else {
            console.error(
                `Unexpected response status: ${response.status} - ${response.statusText}`,
            );
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Axios error:',
                error.response?.data || error.message,
            );
        } else {
            console.error('Unexpected error:', error);
        }
    }
}
