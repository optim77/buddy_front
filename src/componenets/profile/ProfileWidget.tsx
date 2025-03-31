import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import authService from '../../services/authService';
import { formatLikes } from '../../utils/FormatLike';
import { buildMediaLink } from '../../utils/FormatMediaLink';
import { EditIcon } from '../CustomIcons';
import { UserInformation } from '../user/UserInformation';

import { ProfileInformation } from './ProfileInformation';

interface ProfileCardProps {
    profile: ProfileInformation | UserInformation;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    const theme = useTheme();
    const [error, setError] = useState<string | null>(null);
    const [followState, setFollowState] = useState<boolean>(
        profile.followed ? profile.followed : false,
    );
    const [subscribeState, setSubscribeState] = useState<boolean>(
        profile.subscribed ? profile.subscribed : false,
    );
    const [followersCount, setFollowersCount] = useState<number>(
        profile.followers || 0,
    );
    const navigate = useNavigate();
    const follow = async (user: string) => {
        if (authService.getBuddyUser() === null) {
            navigate('/sign-in');
        }
        try {
            await axios
                .post(`${process.env.REACT_APP_API_ADDRESS}/follow/${user}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authService.getToken(),
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setFollowState(!followState);
                        setFollowersCount((prev) =>
                            followState ? prev - 1 : prev + 1,
                        );
                    } else {
                        setError('Error following user');
                    }
                });
        } catch (error) {
            setError('Error following user');
        }
    };

    // const subscribe = async (subscribeTo: string) => {};

    return (
        <Card
            variant="outlined"
            sx={{
                marginBottom: '20px',
                marginTop: '-40px',
                boxShadow: theme.shadows[3],
                borderRadius: 0,
                flexDirection: 'column',
                display: 'flex',
                minHeight: '320px',
                height: 'auto',
                boxSizing: 'border-box',
            }}
        >
            <CardContent>
                {error && (
                    <Typography
                        sx={{ alignItems: 'center', textAlign: 'center' }}
                        color="error"
                    >
                        {error}
                    </Typography>
                )}

                <Stack sx={{ alignItems: 'center' }}>
                    <Avatar
                        alt={profile.username}
                        src={buildMediaLink(profile.avatar) || undefined}
                        sx={{
                            width: 70,
                            height: 70,
                            fontSize: '32px',
                            bgcolor: theme.palette.primary.main,
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        {profile.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                        variant="h5"
                        sx={{
                            alignItems: 'center',
                        }}
                        fontWeight="bold"
                    >
                        {profile.username}
                    </Typography>
                </Stack>

                <Stack spacing={2} mt={3}>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            fontStyle: 'italic',
                            textAlign: 'center',
                            fontSize:
                                profile.description &&
                                profile.description.length >= 650
                                    ? '10px'
                                    : '14px',
                        }}
                    >
                        {profile.description || 'No description available.'}
                    </Typography>

                    {/* Follow and Subscribe Buttons */}
                    <Stack direction="row" spacing={2} justifyContent="center">
                        {authService.getBuddyUser() === profile.uuid ? null : (
                            <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ textTransform: 'capitalize' }}
                                    onClick={() => follow(profile.uuid)}
                                >
                                    {followState ? 'Unfollow' : 'Follow'}
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ textTransform: 'capitalize' }}
                                    // onClick={() => subscribe(profile.uuid)}
                                >
                                    {subscribeState
                                        ? 'Unsubscribe'
                                        : 'Subscribe'}
                                </Button>
                            </>
                        )}
                    </Stack>

                    {/* Stats Section */}
                    <Stack
                        direction="row"
                        spacing={4}
                        alignItems="center"
                        justifyContent="center"
                        mt={3}
                    >
                        <Stack alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Posts
                            </Typography>
                            <Typography variant="h6">
                                {profile.posts}
                            </Typography>
                        </Stack>

                        {authService.getBuddyUser() === profile.uuid ? (
                            <Link
                                to={'/followers'}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <Stack alignItems="center">
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Followers
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatLikes(followersCount)}
                                    </Typography>
                                </Stack>
                            </Link>
                        ) : (
                            <Stack alignItems="center">
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Followers
                                </Typography>
                                <Typography variant="h6">
                                    {formatLikes(followersCount)}
                                </Typography>
                            </Stack>
                        )}

                        {authService.getBuddyUser() === profile.uuid ? (
                            <Link
                                to={'/following'}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <Stack alignItems="center">
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Following
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatLikes(profile.following)}
                                    </Typography>
                                </Stack>
                            </Link>
                        ) : (
                            <Stack alignItems="center">
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Following
                                </Typography>
                                <Typography variant="h6">
                                    {formatLikes(profile.following)}
                                </Typography>
                            </Stack>
                        )}

                        <Stack alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Subscribers
                            </Typography>
                            <Typography variant="h6">
                                {profile.subscribers
                                    ? profile.subscribers
                                    : '0'}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
