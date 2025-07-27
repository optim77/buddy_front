import axios from 'axios';
import authService from '../../services/authService';
import { useErrorStore } from '../banner/useErrorStore';

export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_ADDRESS,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = authService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Unexpected error occurred';
        const status = error.response?.status;
        useErrorStore.getState().setBanner(message, 'error');
        if (status === 403) {
            authService.logout().then(() => {
                authService.destroyThisSession();
            });
        }
        return Promise.reject(error);
    },
);
