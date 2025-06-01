import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import { useAuthValidation } from './useAuthValidation';
import { showBanner } from '../../banner/BannerUtils';
import { apiClient } from '../../api/apiClient';

interface useAuthProps {
    login: (email: string, password: string) => Promise<void>;
    isSubmitting: boolean;
    isSuccess: boolean;
}

interface authResponse {
    token: string;
    message: string;
    userId: string;
}

export const useAuth = (): useAuthProps => {
    const { validateInputs } = useAuthValidation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        if (!validateInputs(email, password)) return;

        setIsSubmitting(true);
        try {
            const res = await apiClient.post<authResponse>('/authenticate', { email, password });
            if (res?.data?.token && res?.data?.userId) {
                authService.setToken(res.data.token);
                authService.setBuddyUser(res.data.userId);
                setIsSuccess(true);
                navigate(0);
            } else {
                setIsSuccess(false);
                showBanner('Wrong email or password', 'error');
            }
        } catch (error: any) {
            setIsSuccess(false);
            if (error.response?.data?.message == 'Bad credentials') {
                showBanner('Wrong email or password', 'error');
            } else {
                showBanner('Something went wrong! Try again.', 'error');
            }
            return;
        } finally {
            setIsSubmitting(false);
        }
    };

    return { login, isSubmitting, isSuccess };
};
