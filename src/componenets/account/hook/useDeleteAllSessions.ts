import { useState } from 'react';
import { destroyThisSession } from '../../../services/authService';
import { apiClient } from '../../api/apiClient';

interface useDeleteAllSessionsResult {
    deletingAll: boolean;
    deleteAll: () => void;
    deletingAllMessage: string
}

export const useDeleteAllSessions = (): useDeleteAllSessionsResult => {
    const [deletingAll, setDeletingAll] = useState(false);
    const [deletingAllMessage, setDeletingAllMessage] = useState<string>('');

    const deleteAll = async (): Promise<boolean> => {
        try {
            const apiResponse = await apiClient.post('/session/logout/all');
            if (apiResponse.status === 200) {
                destroyThisSession();
                return true;
            }
            setDeletingAll(false);
            return false;

        } catch (err) {
            setDeletingAllMessage('Something went wrong.');
            return false
        }
    };

    return { deletingAll, deletingAllMessage, deleteAll };
};
