import { useState } from 'react';
import axios from 'axios';
import authService, { destroyThisSession } from '../../../services/authService';

export const useDeleteSingleSession = () => {
    const [deletingSingle, setDeletingSingle] = useState(false);

    const deleteSession = async (sessionId: string) => {
        const isCurrent = sessionId === authService.getToken();

        if (deletingSingle) return;

        if (sessionId) {
            setDeletingSingle(true);
            if (isCurrent) {
                confirm(
                    'You are deleting your actual session, after that you will be log out!',
                );
            }
            await axios
                .post(
                    `${process.env.REACT_APP_API_ADDRESS}/session/logout/single`,
                    JSON.stringify({ sessionId: sessionId }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        if (isCurrent) {
                            destroyThisSession();
                        }
                        return true;
                    }
                });
        } else {
            return false;
        }
    };

    return {
        deletingSingle,
        deleteSession,
    };
};
