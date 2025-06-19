import React, { useCallback, useEffect, useState } from 'react';
import { MediaObject } from '../../media/MediaObject';
import { ITag } from '../../tag/ITag';
import { showBanner } from '../../banner/BannerUtils';
import { apiClient } from '../../api/apiClient';
import { useInView } from 'react-intersection-observer';

export const useExplore = () => {
    const [images, setImages] = useState<MediaObject[]>([]);
    const [tags, setTags] = useState<ITag[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [viewMode, setViewMode] = useState<string>(localStorage.getItem('buddy-grip') || 'grid');
    const [contentType, setContentType] = useState<'posts' | 'tags'>('posts');
    const { ref, inView } = useInView({ threshold: 0.5 });

    const fetch = useCallback(async () => {
        if (!hasMore) return;

        try {
            if (contentType === 'posts') {
                const res = await apiClient.get('/image/open/random', { params: { page, size: 20 } });
                if (res.status == 200) {
                    const newImages = res.data.content;
                    setImages((prevImages) => [...prevImages, ...newImages]);
                    setHasMore(page + 1 < res.data.page.totalPages);
                } else {
                    showBanner('Error fetching posts', 'error');
                }
            } else if (contentType === 'tags') {
                const res = await apiClient.get('/tags/all`');
                if (res.status == 200) {
                    setTags(res.data.content);
                } else {
                    showBanner('Error fetching posts', 'error');
                }
            }
        } catch (error) {
            showBanner('Error fetching data', 'error');
        }
    }, [page, hasMore, contentType]);

    useEffect(() => {
        fetch();
    }, [page, contentType]);

    useEffect(() => {
        if (inView && hasMore && contentType === 'posts') {
            setPage((prev) => prev + 1);
        }
    }, [inView, hasMore, contentType]);

    const handleViewChange = (mode: string) => {
        setViewMode(mode);
        localStorage.setItem('buddy-grip', mode);
    };

    const handleContentTypeChange = (event: React.MouseEvent<HTMLElement>, newContentType: 'posts' | 'tags') => {
        if (newContentType !== null) {
            setContentType(newContentType);
            setPage(0);
            setImages([]);
            setTags([]);
            setHasMore(true);
        }
    };

    return { images, tags, ref, viewMode, contentType, handleViewChange, handleContentTypeChange };
};
