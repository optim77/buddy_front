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

import Plan from './Plan';

const PlanView: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [plan, setPlan] = useState<Plan>();
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('error');
    const id = useParams<{ id: string }>();

    useEffect(() => {
        fetch();
    }, [id.id]);

    const fetch = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_ADDRESS}/plan/${id.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authService.getToken(),
                },
            })
            .then((res) => {
                setPlan(res.data);
            })
            .catch(() => {
                setMessageType('error');
                setMessage('Error fetching plan');
            });
    };

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
                </StyledCard>
            </MainContainer>
        </AppTheme>
    );
};
export default PlanView;
