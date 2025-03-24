import axios from 'axios';
import authService from '../../../services/authService';
import { useState } from 'react';

export const useDeleteAccount = () => {
    const [deleteAccountError, setDeleteAccountError] = useState<string>();

    const deleteAccount = async () => {
        try {
            await axios
                .post(
                    `${process.env.REACT_APP_API_ADDRESS}/user/delete`,
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
                        authService.logout();
                    }
                    setDeleteAccountError(
                        'Error occurred while deleting account',
                    );
                });
        } catch (error) {
            setDeleteAccountError('Error occurred while deleting account');
        }
    };

    return { deleteAccountError, deleteAccount };
};
