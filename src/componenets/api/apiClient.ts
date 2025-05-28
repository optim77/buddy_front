import axios from "axios";
import authService from '../../services/authService';

export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_ADDRESS,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = authService.getToken();
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.status === 401) {
            window.location.href = '/sign-in';
        }
        return Promise.reject(error);
    }
);