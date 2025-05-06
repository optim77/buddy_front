import { useCallback, useState } from 'react';
import { ISession } from './ISession';
import axios from 'axios';
import authService from '../../../services/authService';

export const useFetchSessions = () => {
    const [isLoadingSessions, setIsLoadingSessions] = useState<boolean>(true);
    const [messageFetchingSession, setMessageFetchingSession] =
        useState<string>('');
    const [sessions, setSessions] = useState<ISession[]>();

    const fetchSessions = useCallback(async () => {
        try {
            await axios
                .get(`${process.env.REACT_APP_API_ADDRESS}/session`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                })
                .then((res) => {
                    setSessions(res.data);
                    setIsLoadingSessions(false);
                });
        } catch {
            setIsLoadingSessions(false);
            setMessageFetchingSession('Something went wrong. Try again');
        }
    }, []);
    fetchSessions();

    return { isLoadingSessions, messageFetchingSession, sessions };
};
