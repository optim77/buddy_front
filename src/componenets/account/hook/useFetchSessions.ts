import { useCallback, useEffect, useState } from 'react';
import { ISession } from './ISession';
import axios from 'axios';
import authService from '../../../services/authService';

export const useFetchSessions = () => {
    const [isLoadingSessions, setIsLoadingSessions] = useState<boolean>(true);
    const [messageFetchingSession, setMessageFetchingSession] =
        useState<string>('');
    const [sessions, setSessions] = useState<ISession[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchSessions = useCallback(async () => {
        try {
            await axios
                .get(`${process.env.REACT_APP_API_ADDRESS}/session`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                    params: { page, size: 20 },
                })
                .then((res) => {
                    const newSessions = res.data.content;
                    setSessions((prevSession) => [
                        ...prevSession,
                        ...newSessions,
                    ]);
                    setHasMore(page + 1 < res.data.page.totalPages);
                    setIsLoadingSessions(false);
                });
        } catch {
            setIsLoadingSessions(false);
            setMessageFetchingSession('Something went wrong. Try again');
        }
    }, []);

    useEffect(() => {
        fetchSessions();
    }, []);

    return {
        isLoadingSessions,
        messageFetchingSession,
        hasMore,
        setPage,
        sessions,
    };
};
