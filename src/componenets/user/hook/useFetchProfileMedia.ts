import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';

export const useFetchProfileMedia = (userId?: string) => {
    const [fetchMediaProfileLoading, setFetchMediaProfileLoading] = useState<boolean>(true);
    const [fetchProfileMediaContent, setFetchProfileMediaContent] = useState<boolean>(true);
    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [fetchProfileImagesError, setFetchProfileImagesError] = useState<string | null>(null);

    const fetchProfileImages = useCallback(async () => {
        if (!userId) {
            setFetchProfileImagesError('User ID is undefined');
            return;
        }

        if (!hasMore) return;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/image/user/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authService.getToken() || ''}`,
                    },
                    params: { page, size: 20 },
                },
            );
            if (response.data.length === 0) {
                setFetchProfileMediaContent(false);
            }
            const newImages = response.data.content;
            setImages((prevImages) => [...prevImages, ...newImages]);
            setHasMore(page + 1 < response.data.page.totalPages);
        } catch (error) {
            setFetchProfileImagesError('Error fetching profile images');
        }
    }, [userId, page, hasMore]);

    useEffect(() => {
        if (userId) {
            fetchProfileImages();
            setFetchMediaProfileLoading(false);
        }
    }, [page, userId]);

    return {
        fetchMediaProfileLoading,
        fetchProfileMediaContent,
        images,
        hasMore,
        setPage,
        fetchProfileImagesError
    };
};
