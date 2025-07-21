import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import { buildMediaLink } from '../../utils/FormatMediaLink';

import { FollowListUser } from './FollowListUser';
import { BlankList } from '../../utils/BlankList';
import { FollowPaper } from '../../customStyles/Element';

const FollowList = ({
    isContent,
    isLoading,
    followers,
}: {
    isContent: boolean;
    isLoading: boolean;
    followers: FollowListUser[];
}) => {
    return (
        <Grid container spacing={2}>
            {isContent && <BlankList />}
            {isLoading && <Typography>Loading...</Typography>}
            {followers.map((follower) => (
                <Grid item xs={12} sm={6} md={4} key={follower.id}>
                    <Link to={`/user/${follower.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <FollowPaper elevation={3}>
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
                                        '&:hover': { color: '#1976d2' },
                                    }}
                                >
                                    {follower.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {follower.description}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Joined: {new Date(follower.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </FollowPaper>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default FollowList;
