import { useState } from 'react';
import axios, {AxiosError} from 'axios';
import authService from '../../../services/authService';
import { PasswordValidationResult, validatePassword } from '../../../utils/validatePassword';

interface ChangePasswordResponse {
    message: string;
}

export const useChangePassword = () => {
    const [changePasswordNewPassword, setChangePasswordNewPassword] = useState('');
    const [changePasswordNewPasswordConfirm, setChangePasswordNewPasswordConfirm] = useState('');
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
    const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
    const [changePasswordMessage, setChangePasswordMessage] = useState<string | null>(null);

    const resetState = () => {
        setChangePasswordNewPassword('');
        setChangePasswordNewPasswordConfirm('');
        setChangePasswordError(null);
        setChangePasswordMessage(null);
    }

    const changePassword = async () => {
        const validation: PasswordValidationResult = validatePassword(changePasswordNewPassword, changePasswordNewPasswordConfirm);
        if (!validation.valid) {
            setChangePasswordError('Passwords do not match');
            return;
        }

        try {
            const response = await axios
                .put<ChangePasswordResponse>(
                    `${process.env.REACT_APP_API_ADDRESS}/user/change_password`,
                    { password: changePasswordNewPassword },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    },
                );
            if (response.status === 200){
                setChangePasswordDialogOpen(false);
                setChangePasswordMessage(
                    'Password changed successfully!',
                );
                resetState();
            } else {
                setChangePasswordError('Something went wrong');
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.data && axiosError.response.data === 'string') {
                setChangePasswordError(
                    'Error occurred while trying to change your password',
                );
            } else {
                setChangePasswordError('Error occurred while trying to change your password');
            }

        }
    };

    return {
        changePasswordNewPassword,
        changePasswordNewPasswordConfirm,
        setChangePasswordNewPassword,
        setChangePasswordNewPasswordConfirm,
        setChangePasswordDialogOpen,
        changePasswordDialogOpen,
        changePasswordError,
        changePasswordMessage,
        changePassword,
    };
};
