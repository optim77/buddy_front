import React from 'react';
import AppLayout from './AppLayout';
import { StyledCard } from '../../customStyles/Element';
import CssBaseline from '@mui/material/CssBaseline';
import { MainContainer } from '../../customStyles/MainContainer';

interface AuthLayoutProps {
    children: React.ReactNode;
    disableCustomTheme?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, disableCustomTheme }) => {
    return (
        <AppLayout disableCustomTheme={disableCustomTheme}>
            <CssBaseline enableColorScheme />
            <MainContainer>
                <StyledCard variant="outlined">{children}</StyledCard>
            </MainContainer>
        </AppLayout>
    );
};

export default AuthLayout;
