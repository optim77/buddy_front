import Typography from '@mui/material/Typography';
import React from 'react';

export const BlankProfileInfo = () => {
    return (
        <Typography
            sx={{
                textAlign: 'center',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '20px',
                fontWeight: 'medium',
                border: '1px solid',
                maxWidth: '400px',
                margin: '0 auto',
                lineHeight: '1.5',
            }}
        >
            No posts yet? ;)
        </Typography>
    );
};
