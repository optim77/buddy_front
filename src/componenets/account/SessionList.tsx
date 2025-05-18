import { ISession } from './hook/ISession';
import { Button, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';
import { formatDate } from '../../utils/FormatDate';
import { useDeleteSingleSession } from './hook/useDeleteSingleSession';
import { useDeleteAllSessions } from './hook/useDeleteAllSessions';
import authService from '../../services/authService';

interface SessionListProps {
    sessions: ISession[];
}
const SessionList: React.FC<SessionListProps> = ({ sessions }) => {
    const { deletingSingle, deleteSession } = useDeleteSingleSession();

    const { deletingAll, deleteAll } = useDeleteAllSessions();
    return (
        <Grid container spacing={2}>
            <Card>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ marginTop: '10px' }}
                    onClick={async () => {
                        confirm('You will be log out after this action!');
                        deleteAll();
                    }}
                >
                    Logout from all sessions
                </Button>
            </Card>
            {sessions.map((session: ISession, index) => (
                <Card sx={{ marginTop: '10px' }} key={index}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Session {index + 1}
                    </Typography>
                    <hr />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        IP: {session.ip}
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        User agent: {session.agent}
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Country: {session.country}
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Session started: &nbsp;
                        {formatDate(session.startTime, navigator.language)}
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Session end: &nbsp;
                        {formatDate(session.endTime, navigator.language)}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{ marginTop: '10px' }}
                        onClick={async () => {
                            await deleteSession(session.sessionId);
                        }}
                        disabled={deletingSingle}
                    >
                        Delete
                    </Button>
                </Card>
            ))}
        </Grid>
    );
};

export default SessionList;
