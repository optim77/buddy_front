import { useState } from 'react';
import axios from 'axios';
import authService, { destroyThisSession } from '../../../services/authService';

export const useDeleteAllSessions = () => {
    const [deletingAll, setDeletingAll] = useState(false);

    const deleteAll = async () => {
        if (deletingAll) return;
        setDeletingAll(true);
        await axios
            .post(
                `${process.env.REACT_APP_API_ADDRESS}/session/logout/all`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    destroyThisSession();
                    return true;
                } else {
                    setDeletingAll(false);
                    return false;
                }
            });
    };

    return { deletingAll, deleteAll };
};
