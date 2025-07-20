import { apiClient } from '../../api/apiClient';
import { showBanner } from '../../banner/BannerUtils';
import { useState } from 'react';

export const useLike = (mediaId: string, isLiked = false) => {
    const [liked, setLiked] = useState(isLiked);

    const handleLikeClick = async () => {
        try {
            await likeMedia(mediaId);
            setLiked(!liked);
        } catch (error) {
            showBanner('Something went wrong', 'error');
        }
    };

    const likeMedia = async (mediaID: string) => {
        try {
            const res = await apiClient.post('/like/image/' + mediaID);
            if (res.status !== 200) {
                showBanner('Something went wrong', 'error');
            }
        } catch {
            showBanner('Something went wrong', 'error');
        }
    };

    return { handleLikeClick, likeMedia, liked };
};
