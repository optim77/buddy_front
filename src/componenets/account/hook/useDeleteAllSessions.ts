import { useState } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';

export const useDeleteAllSessions = () => {
    const [deletingAll, setDeletingAll] = useState(false);
    const [deletedAll, setDeletedAll] = useState(false);

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
                    setDeletedAll(false);
                    return true;
                } else {
                    setDeletingAll(false);
                    return false;
                }
            });
    };

    return { deletingAll, deletedAll, deleteAll };
};
