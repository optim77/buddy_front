import { CircularProgress, Box } from '@mui/material';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import React, { useEffect } from 'react';

import { MainContainer } from '../../customStyles/MainContainer';
import AppTheme from '../theme/AppTheme';
import { useFetchSessions } from './hook/useFetchSessions';

const UserProfile: React.FC<{ disableCustomTheme?: boolean }> = (props) => {
    const { isLoadingSessions, messageFetchingSession, sessions } =
        useFetchSessions();

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{
                mt: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    {isLoadingSessions ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '60vh',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : messageFetchingSession ? (
                        <Typography color="error">
                            {messageFetchingSession}
                        </Typography>
                    ) : sessions ? (
                        <Card></Card>
                    ) : (
                        <Typography variant="h5">
                            No user data found.
                        </Typography>
                    )}
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default UserProfile;
