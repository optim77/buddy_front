import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';
import { ILoop } from '../ILoop';

export const useFetchLoops = () => {
    const [videos, setVideos] = useState<ILoop[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchVideos = useCallback(async () => {
        if (!hasMore) return;

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/loops`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authService.getToken() || ''}`,
                },
                params: { page, size: 20 },
            });

            const newVideos = response.data.content;
            setVideos((prevVideos) => [...prevVideos, ...newVideos]);
            setHasMore(page + 1 < response.data.page.totalPages);
        } catch (error) {
            setError('Error fetching videos');
        } finally {
            setLoading(false);
        }
    }, [page, hasMore]);

    useEffect(() => {
        fetchVideos();
    }, [page]);

    return { videos, hasMore, setPage, error, loading };
};
