import { StyledEngineProvider } from '@mui/material/styles';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import authService from './services/authService';

axios.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StyledEngineProvider injectFirst>
        <App />
    </StyledEngineProvider>,
);
