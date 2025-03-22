import {useState} from "react";
import {isValidPassword} from "../../../utils/ValidPassword";
import axios from "axios";
import authService from "../../../services/authService";

export const useChangePassword = () => {
    const [changePasswordNewPassword, setChangePasswordNewPassword] = useState("");
    const [changePasswordNewPasswordConfirm, setChangePasswordNewPasswordConfirm] = useState("");
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
    const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
    const [changePasswordMessage, setChangePasswordMessage] = useState<string | null>(null);

    const changePassword = async () => {
        if (changePasswordNewPasswordConfirm !== changePasswordNewPassword) {
            setChangePasswordError('Passwords do not match');
            return;
        }
        if (changePasswordNewPasswordConfirm.length < 6 && changePasswordNewPassword.length < 6) {
            setChangePasswordError('Password must be at least 6 characters long.');
            return;
        }
        if (isValidPassword(changePasswordNewPassword)) {
            setChangePasswordError(
                'Password does not meet the requirements (8-32 characters, upper and lower case, special character)',
            );
            return;
        }
        try {
            await axios
                .put(
                    `${process.env.REACT_APP_API_ADDRESS}/user/change_password`,
                    changePasswordNewPassword,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        setChangePasswordDialogOpen(false);
                        setChangePasswordMessage('Password changed successfully!');
                    } else {
                        setChangePasswordError('Something went wrong');
                    }
                });
        } catch (error) {
            setChangePasswordError(
                'Error occurred while trying to change your password',
            );
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
        changePassword
    }
}