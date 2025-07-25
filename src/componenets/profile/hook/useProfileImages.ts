import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';
import { IMedia } from '../../media/types/IMedia';

export const useProfileImages = () => {
    const [images, setImages] = useState<IMedia[]>([]);
    const [profileImagesLoading, setProfileImagesLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [profileImageError, setProfileImageError] = useState<string>();

    const fetchProfileImages = useCallback(async () => {
        if (!hasMore) return;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/profile/images`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authService.getToken(),
                },
                params: { page, size: 20 },
            });
            setImages((prevImages) => [...prevImages, ...response.data.content]);
            setHasMore(page + 1 < response.data.page.totalPages);
        } catch (error) {
            setProfileImageError('Error fetching profile images');
        }
    }, [page, hasMore]);

    useEffect(() => {
        fetchProfileImages();
        setProfileImagesLoading(false);
    }, [page]);

    return {
        images,
        hasMore,
        setPage,
        profileImageError,
        profileImagesLoading,
    };
};
