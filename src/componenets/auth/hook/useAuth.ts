import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import { useAuthValidation } from './useAuthValidation';
import { showBanner } from '../../banner/BannerUtils';
import { apiClient } from '../../api/apiClient';

interface useAuthProps {
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, repeatPassword: string) => Promise<void>;
    isSubmittingSignUp: boolean;
}

interface authResponse {
    token: string;
    message: string;
    userId: string;
}

export const useAuth = (): useAuthProps => {
    const { validateInputs, validateSignUpInputs } = useAuthValidation();
    const [isSubmittingSignUp, setIsSubmittingSignUp] = useState(false);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        if (!validateInputs(email, password)) return;

        try {
            const res = await apiClient.post<authResponse>('/authenticate', { email, password });
            if (res?.data?.token && res?.data?.userId) {
                authService.setToken(res.data.token);
                authService.setBuddyUser(res.data.userId);
                navigate(0);
            } else {
                showBanner('Wrong email or password', 'error');
            }
        } catch (error: any) {
            if (error.status == 401) {
                showBanner('Wrong email or password', 'error');
            } else {
                showBanner('Something went wrong! Try again.', 'error');
            }
        }
    };

    const signUp = async (email: string, password: string, repeatPassword: string) => {
        if (validateSignUpInputs(email, password, repeatPassword)) return;
        setIsSubmittingSignUp(true);
        try {
            const res = await apiClient.post<authResponse>('/authenticate', { email, password });
            if (res.status === 200) {
                setTimeout(() => {
                    showBanner('Sign Up successfully', 'info');
                }, 1000);
                navigate('/registered');
            }
        } catch (error: any) {
            if (error.data?.message) {
                showBanner(error.data?.message, 'error');
            } else {
                showBanner('Something went', 'error');
            }
        }
    };

    return { login, signUp, isSubmittingSignUp };
};
