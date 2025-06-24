import { useCallback, useEffect, useState } from 'react';
import { IMedia } from '../../media/IMedia';
import axios from 'axios';
import authService from '../../../services/authService';

export const useFetchTagMedia = (tag?: string) => {
    const [fetchMediaTagContent, setFetchMediaTagContent] = useState<boolean>(false);
    const [fetchMediaTagLoading, setFetchMediaTagLoading] = useState<boolean>(true);
    const [media, setMedia] = useState<IMedia[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [fetchTagMediaError, setFetchTagMediaError] = useState<string | null>(null);

    const fetchTagMedia = useCallback(async () => {
        if (!tag) {
            setFetchTagMediaError('Wrong tag');
        }
        if (!hasMore) return;

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/tag/${tag}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authService.getToken(),
                },
                params: { page, size: 20 },
            });
            if (response.data.length === 0) {
                setFetchMediaTagContent(false);
            }
            const newMedia = response.data.content;
            setMedia((prevMedia) => [...prevMedia, ...newMedia]);
            setHasMore(page + 1 < response.data.page.totalPages);
        } catch {
            setFetchTagMediaError('Something went wrong');
        }
    }, [tag, page, hasMore]);

    useEffect(() => {
        fetchTagMedia();
        setFetchMediaTagLoading(false);
    }, [fetchTagMedia]);

    return {
        fetchMediaTagLoading,
        fetchMediaTagContent,
        media,
        hasMore,
        setPage,
        fetchTagMediaError,
    };
};
