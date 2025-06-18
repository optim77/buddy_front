import React from 'react';
import AppLayout from './AppLayout';
import { CustomCard, StyledCard } from '../../customStyles/Element';
import { Typography } from '@mui/material';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    disableCustomTheme?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title = 'Create post', disableCustomTheme }) => {
    return (
        <AppLayout disableCustomTheme={disableCustomTheme}>
            <StyledCard variant="outlined">
                <Typography variant="h4">{title}</Typography>
                {children}
            </StyledCard>
        </AppLayout>
    );
};

export default AuthLayout;
