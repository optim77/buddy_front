import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import { useAuthValidation } from './useAuthValidation';

export const useAuth = () => {
    const { validateInputs } = useAuthValidation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        if (!validateInputs(email, password)) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ADDRESS}/authenticate`,
                { email, password },
                { headers: { 'Content-Type': 'application/json' } },
            );
            if (response.data.token != '' && response.data.userId != '') {
                authService.setToken(response.data.token);
                authService.setBuddyUser(response.data.userId);
                setIsSuccess(true);
                navigate(0);
            } else {
                setIsSuccess(false);
                setErrorMessage('Wrong email or password');
            }
        } catch (error: any) {
            setErrorMessage('Wrong email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return { login, isSubmitting, isSuccess, errorMessage };
};
