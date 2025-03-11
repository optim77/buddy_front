import {useState} from 'react';
import {IMedia} from '../../media/IMedia';

export const useFetchTagMedia = (tag?: string) => {
    const [fetchMediaTagContent, setFetchMediaTagContent] = useState<boolean>(false);
    const [fetchMediaTagLoading, setFetchMediaTagLoading] = useState<boolean>(true);
    const [media, setMedia] = useState<IMedia[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [fetchTagMediaError, setFetchTagMediaError] = useState<string | null>(null);
}