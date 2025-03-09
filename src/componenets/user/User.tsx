import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import { MainContainer } from '../../customStyles/MainContainer';
import authService from '../../services/authService';
import MediaGrip from '../media/grid/MediaGrip';
import ViewModeToggle from '../media/ViewModeToggle';
import MediaWall from '../media/wall/MediaWall';
import ProfileWidget from '../profile/ProfileWidget';
import AppTheme from '../theme/AppTheme';

import { UserInformation } from './UserInformation';
import {useFetchUser} from "./hook/useFetchUser";
import {fetchMessage} from "../../utils/fetchMessage";
import {MESSAGE_TYPE} from "../../utils/CODE";

const User: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    let isContent = false;
    const { ref, inView } = useInView({ threshold: 0.5 });
    const { userId } = useParams<{ userId: string }>();

    const [viewMode, setViewMode] = useState<string>(
        localStorage.getItem('buddy-grip') || 'grid',
    );

    const { userLoading, user , fetchUserMessage } = useFetchUser(userId)

    const fetchProfileImages = useCallback(async () => {
        if (!hasMore) return;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/image/user/` + userId,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + authService.getToken()
                                ? authService.getToken()
                                : '',
                    },
                    params: { page, size: 20 },
                },
            );

            const newImages = response.data.content;
            setImages((prevImages) => [...prevImages, ...newImages]);
            setHasMore(page + 1 < response.data.page.totalPages);
        } catch (error) {
            setError('Error fetching profile images');
        }
    }, [page, hasMore]);


    useEffect(() => {
        // if (userId === authService.getBuddyUser()){
        //     navigate("/profile")
        // }
        fetchProfileImages().then((res) => {
            if (res !== undefined) {
                isContent = true;
            }
        });
    }, [page, userId]);

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);


    const handleViewChange = (mode: string) => {
        setViewMode(mode);
        localStorage.setItem('buddy-grip', mode);
    };

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    {fetchUserMessage && (
                        fetchMessage(fetchUserMessage, MESSAGE_TYPE.ERROR)
                    )}
                    {!userLoading && <p>Loading...</p>}
                    {user && <ProfileWidget profile={user} />}

                    {!isContent ? null : (
                        <Typography variant="h1" gutterBottom>
                            There is no posts yet ;)
                        </Typography>
                    )}

                    {images.length === 0 ? null : (
                        <ViewModeToggle
                            viewMode={viewMode}
                            onChange={handleViewChange}
                        />
                    )}
                    {viewMode === 'grid' ? (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '16px',
                                width: '100%',
                                padding: '20px',
                            }}
                        >
                            {images.map((image) => (
                                <MediaGrip key={image.imageId} image={image} />
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '20px',
                                width: '100%',
                            }}
                        >
                            {images.map((image) => (
                                <MediaWall key={image.imageId} image={image} />
                            ))}
                        </div>
                    )}
                    <div ref={ref} style={{ height: '1px' }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default User;
