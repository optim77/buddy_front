import { useEffect, useState } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';
import { UserInformation } from '../UserInformation';
import { MESSAGE_TYPE_ERROR } from '../../../utils/CODE';

export const useFetchUser = (userId?: string) => {
    const [userLoading, setUserLoading] = useState(true);
    const [fetchUserMessage, setFetchUserMessage] = useState<string>('');
    const [user, setUser] = useState<UserInformation | undefined>();

    const fetchUserInformation = async (userId: string | undefined) => {
        if (!user === undefined) {
            return;
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authService.getToken()}`,
                },
            });
            setUserLoading(false);
            return res.data;
        } catch (error) {
            setFetchUserMessage(MESSAGE_TYPE_ERROR.FAILED_TO_FETCH);
            return undefined;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const fetchedUser = await fetchUserInformation(userId);
            setUser(fetchedUser);
        };

        fetchData();
    }, [userId]);

    return { userLoading, user, fetchUserMessage };
};
