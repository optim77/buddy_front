import { useCallback, useEffect, useState } from 'react';
import { FollowListUser } from '../FollowListUser';
import { apiClient } from '../../api/apiClient';
import { showBanner } from '../../banner/BannerUtils';
import { useInView } from 'react-intersection-observer';

export const useFetchFollow = (type: string) => {
    const [isContent, setIsContent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [followers, setFollowers] = useState<FollowListUser[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({ threshold: 0.5 });

    const fetchFollowers = useCallback(async () => {
        if (!hasMore) return;
        try {
            const res = await apiClient.get(`/${type}`, { params: { page, size: 20 } });
            if (res.status === 200) {
                setFollowers((prevFollowers) => [...prevFollowers, ...res.data.content]);
                setHasMore(page + 1 < res.data.page.totalPages);
            } else {
                showBanner('Something went wrong', 'error');
            }
        } catch (err) {
            showBanner('Something went wrong', 'error');
        }
    }, [page, hasMore]);

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);

    useEffect(() => {
        fetchFollowers();
        setIsLoading(false);
        setIsContent(true);
    }, []);

    return { isContent, isLoading, followers, ref };
};
