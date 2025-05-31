import { useErrorStore } from './useErrorStore';
import { useEffect } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

export const GlobalBanner = () => {
    const { message, type, clearError } = useErrorStore();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => clearError(), 5000);
            return () => clearTimeout(timer);
        }
    }, [message, clearError]);

    if (!message) return null;

    const handleClose = () => {
        clearError();
    };

    return (
        <Snackbar
            open={!!message}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity={type || 'error'} onClose={handleClose} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
