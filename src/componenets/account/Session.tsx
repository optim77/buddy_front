import { CircularProgress, Box } from '@mui/material';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import React, { useEffect } from 'react';

import { MainContainer } from '../../customStyles/MainContainer';
import AppTheme from '../theme/AppTheme';
import { useFetchSessions } from './hook/useFetchSessions';
import { useInView } from 'react-intersection-observer';
import SessionList from './SessionList';

const UserProfile: React.FC<{ disableCustomTheme?: boolean }> = (props) => {
    const { isLoadingSessions, messageFetchingSession, hasMore, setPage, sessions } = useFetchSessions();

    const { ref, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);

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
                        <Typography color="error">{messageFetchingSession}</Typography>
                    ) : sessions ? (
                        <SessionList sessions={sessions} />
                    ) : (
                        <Typography variant="h5">No sessions</Typography>
                    )}
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default UserProfile;
