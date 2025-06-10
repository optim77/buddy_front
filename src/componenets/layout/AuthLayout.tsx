import React from 'react';
import { Typography } from '@mui/material';
import AppLayout from './AppLayout';
import { CustomCard } from '../../customStyles/Element';
import { SitemarkIcon } from '../CustomIcons';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    disableCustomTheme?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title = 'Sign in',
    disableCustomTheme,
    }) => {
    return (
        <AppLayout disableCustomTheme={disableCustomTheme}>
            <CustomCard variant="outlined">
                <SitemarkIcon />
                <Typography component="h1" variant="h4">
                    {title}
                </Typography>
                {children}
            </CustomCard>
        </AppLayout>
    );
};

export default AuthLayout;
