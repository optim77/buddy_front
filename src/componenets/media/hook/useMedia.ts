import { apiClient } from '../../api/apiClient';
import { showBanner } from '../../banner/BannerUtils';
import { useEffect, useState } from 'react';
import authService from '../../../services/authService';
import { MediaObject } from '../types/MediaObject';
import { useParams } from 'react-router-dom';

export const useMedia = () => {
    const { imageId } = useParams<{ imageId: string }>();
    const [media, setMedia] = useState<MediaObject>();
    const [editable, setEditable] = useState(false);
    const [muted, setMuted] = useState<boolean>(true);

    const fetchMedia = async (imageId: string) => {
        try {
            const res = await apiClient.get('/image/' + imageId);
            if (res.status === 200) {
                return res.data;
            }
            showBanner('Something went wrong', 'error');
            return res.data;
        } catch (err) {
            showBanner('Something went wrong', 'error');
        }
    };

    useEffect(() => {
        if (imageId) {
            fetchMedia(imageId)
                .then((data) => {
                    setMedia(data);
                    if (data.userId === authService.getBuddyUser()) {
                        setEditable(true);
                    }
                })
                .catch(() => {
                    showBanner('Something went wrong', 'error');
                });
        }
    }, [imageId]);

    return { media, editable, muted, setMuted };
};
