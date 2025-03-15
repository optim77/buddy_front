import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import { buildMediaLink, formatMediaLink } from '../../utils/FormatMediaLink';

import { FollowListUser } from './FollowListUser';

const FollowList = ({
                        isContent,
                        isLoading,
                        fetchFollowersError,
                        followers }: {
    isContent: boolean,
    isLoading: boolean,
    fetchFollowersError: string | null,
    followers: FollowListUser[]
}) => {

    return (
        <Grid container spacing={2}>
            {!isContent && (<Typography>No content ;/</Typography>)}
            {isLoading && (<Typography>Loading...</Typography>)}
            {fetchFollowersError && (<Typography>fetchFollowersError</Typography>)}
            {followers.map((follower) => (
                <Grid item xs={12} sm={6} md={4} key={follower.id}>
                    <Link
                        to={`/user/${follower.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: 2,
                                borderRadius: 2,
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                backgroundColor: 'white',
                                '&:hover': {
                                    backgroundColor: '#f9f9f9',
                                },
                            }}
                        >
                            <Avatar
                                src={buildMediaLink(follower.avatar)}
                                alt={follower.username}
                                sx={{ width: 56, height: 56, marginRight: 2 }}
                            />
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        color: 'black',
                                        '&:hover': { color: '#1976d2' }, // Kontrastowy kolor tekstu na hover
                                    }}
                                >
                                    {follower.username}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {follower.description}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Joined:{' '}
                                    {new Date(
                                        follower.createdAt,
                                    ).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Paper>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default FollowList;
