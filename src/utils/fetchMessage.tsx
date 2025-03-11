import { Typography } from '@mui/material';
import React from 'react';

export const fetchMessage = (message: string, messageType: string) => {
    return (
        <Typography color={messageType} variant="body2">
            {message}
        </Typography>
    );
};
