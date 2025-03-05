import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LinkWhite, StyledCard } from '../../customStyles/Element';
import { MainContainer } from '../../customStyles/MainContainer';
import authService from '../../services/authService';
import AppTheme from '../theme/AppTheme';

import { useFetchPlan } from './hooks/useFetchPlan';

const PlanView: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const id = useParams<{ id: string }>();
    const { plan, message, messageType } = useFetchPlan(id.id);

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <MainContainer>
                <StyledCard variant="outlined">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Plan of{' '}
                        <LinkWhite to={'/user/' + plan?.planOwnerId}>
                            {plan?.planOwnerName}
                        </LinkWhite>
                    </Typography>

                    {message && (
                        <Typography color={messageType} variant="body2">
                            {message}
                        </Typography>
                    )}
                    <Typography variant="h4" component="h1" gutterBottom>
                        Name
                    </Typography>
                    <Typography>{plan?.name}</Typography>

                    <Typography variant="h4" component="h1" gutterBottom>
                        Description
                    </Typography>
                    <Typography>{plan?.description}</Typography>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Price
                    </Typography>
                    <Typography>{plan?.price}</Typography>

                    <Button>Buy</Button>
                    {plan?.planOwnerId == authService.getBuddyUser() ? (
                        <LinkWhite to={'/edit/plan' + plan?.id}>Edit</LinkWhite>
                    ) : null}
                </StyledCard>
            </MainContainer>
        </AppTheme>
    );
};
export default PlanView;
