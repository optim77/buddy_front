import React from 'react';
import AppLayout from './AppLayout';
import { StyledCard } from '../../customStyles/Element';

interface AuthLayoutProps {
    children: React.ReactNode;
    disableCustomTheme?: boolean;
}

const PlanViewLayout: React.FC<AuthLayoutProps> = ({ children, disableCustomTheme }) => {
    return (
        <AppLayout disableCustomTheme={disableCustomTheme}>
            <StyledCard variant="outlined">{children}</StyledCard>
        </AppLayout>
    );
};

export default PlanViewLayout;
