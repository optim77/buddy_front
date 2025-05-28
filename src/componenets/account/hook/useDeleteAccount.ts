import authService from '../../../services/authService';
import { useState } from 'react';
import { apiClient } from '../../api/apiClient';

interface useDeleteAccountResult {
    deleteAccountError: string;
    deleteAccount: () => void;
}

export const useDeleteAccount = (): useDeleteAccountResult => {
    const [deleteAccountError, setDeleteAccountError] = useState<string>('');

    const deleteAccount = async () => {
        try {

            const res = await apiClient.delete('/user/delete');
            if (res.status === 200) {
                await authService.logout()
            } else {
                setDeleteAccountError(
                    'Error occurred while deleting account',
                );
            };
        } catch (error) {
            setDeleteAccountError('Error occurred while deleting account');
        }
    };

    return { deleteAccountError, deleteAccount };
};
