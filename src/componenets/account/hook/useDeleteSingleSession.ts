import { useState } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';

export const useDeleteSingleSession = () => {
    const [deletingSingle, setDeletingSingle] = useState(false);
    const [deletedSingle, setDeletedSingle] = useState(false);

    const deleteSession = async (sessionId: string) => {
        if (deletingSingle) return;

        if (sessionId) {
            setDeletingSingle(true);
            await axios
                .post(
                    `${process.env.REACT_APP_API_ADDRESS}/session/logout/single`,
                    { sessionId },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        return true;
                    }
                });
        } else {
            return false;
        }
    };

    return {
        deletingSingle,
        deletedSingle,
        deleteSession,
    };
};
