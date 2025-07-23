import { useState, useEffect, useCallback, useRef } from 'react';
import { ILoop } from '../ILoop';
import { apiClient } from '../../api/apiClient';
import { showBanner } from '../../banner/BannerUtils';
import { useInView } from 'react-intersection-observer';

export const useFetchLoops = () => {
    const [videos, setVideos] = useState<ILoop[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [muted, setMuted] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const { ref, inView } = useInView({ threshold: 0.5 });

    const fetchVideos = useCallback(async () => {
        if (!hasMore) return;

        try {
            const res = await apiClient.get('/loops', { params: { page, size: 20 } });

            if (res.status === 200) {
                const newVideos = res.data.content;
                setVideos((prevVideos) => [...prevVideos, ...newVideos]);
                setHasMore(page + 1 < res.data.page.totalPages);
            } else {
                showBanner('Something went wrong', 'error');
            }
        } catch (error) {
            showBanner('Error fetching videos', 'error');
        } finally {
            setLoading(false);
        }
    }, [page, hasMore]);

    useEffect(() => {
        fetchVideos();
    }, [page]);

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);

    useEffect(() => {
        if (isScrolling) {
            const timer = setTimeout(() => setIsScrolling(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isScrolling]);

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (isScrolling) return;

            if (e.deltaY > 0 && currentIndex < videos.length - 1) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else if (e.deltaY < 0 && currentIndex > 0) {
                setCurrentIndex((prevIndex) => prevIndex - 1);
            }

            setIsScrolling(true);
        };

        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, [videos, currentIndex, isScrolling]);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                index === currentIndex ? video.play() : video.pause();
            }
        });
    }, [currentIndex]);

    return { videos, loading, muted, setMuted, currentIndex, videoRefs, ref };
};
