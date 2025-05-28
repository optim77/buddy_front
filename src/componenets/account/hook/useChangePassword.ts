import { useState } from 'react';
import { PasswordValidationResult, validatePassword } from '../../../utils/validatePassword';
import {apiClient} from "../../api/apiClient";

interface ChangePasswordResponse {
    message: string;
}
interface UseChangePasswordResult {
    changePasswordNewPassword: string;
    changePasswordNewPasswordConfirm: string;
    setChangePasswordNewPassword: (val: string) => void;
    setChangePasswordNewPasswordConfirm: (val: string) => void;
    setChangePasswordDialogOpen: (open: boolean) => void;
    changePasswordDialogOpen: boolean;
    changePasswordError: string | undefined;
    changePasswordMessage: string | null;
    changePassword: () => Promise<void>;
}

export const useChangePassword = (): UseChangePasswordResult => {
    const [changePasswordNewPassword, setChangePasswordNewPassword] = useState('');
    const [changePasswordNewPasswordConfirm, setChangePasswordNewPasswordConfirm] = useState('');
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
    const [changePasswordError, setChangePasswordError] = useState<string | undefined>();
    const [changePasswordMessage, setChangePasswordMessage] = useState<string | null>(null);

    const resetState = () => {
        setChangePasswordNewPassword('');
        setChangePasswordNewPasswordConfirm('');
        setChangePasswordError('');
        setChangePasswordMessage(null);
    }

    const changePassword = async () => {
        const validation: PasswordValidationResult = validatePassword(changePasswordNewPassword, changePasswordNewPasswordConfirm);
        if (!validation.valid) {
            setChangePasswordError(validation.message);
            return;
        }
        try {
            const res = await apiClient.put<ChangePasswordResponse>('/user/change_password', { password: changePasswordNewPassword });
            if (res.status === 200) {
                setChangePasswordDialogOpen(false);
                setChangePasswordMessage(
                    'Password changed successfully!',
                );
                resetState();
            } else {
                setChangePasswordError('Something went wrong');
            }
        } catch (err) {
            setChangePasswordError('Something went wrong');
        }


    }

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
