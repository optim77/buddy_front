import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

import { MainContainer } from '../../customStyles/MainContainer';
import authService from '../../services/authService';
import MediaGrip from '../media/grid/MediaGrip';
import { MediaObject } from '../media/MediaObject';
import { useViewMode } from '../media/useViewMode';
import ViewModeToggle from '../media/ViewModeToggle';
import MediaWall from '../media/wall/MediaWall';
import PlanWidget from '../plan/PlanWidget';
import AppTheme from '../theme/AppTheme';

import { ProfileInformation } from './ProfileInformation';
import ProfileWidget from './ProfileWidget';

const Profile: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [images, setImages] = useState<MediaObject[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { viewMode, handleViewChange } = useViewMode();
    const [profile, setProfile] = useState<ProfileInformation>();
    const { ref, inView } = useInView({ threshold: 0.5 });

    const fetchProfileImages = useCallback(async () => {
        if (!hasMore) return;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/profile/images`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authService.getToken(),
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

    const fetchProfile = useCallback(async () => {
        try {
            await axios
                .get(`${process.env.REACT_APP_API_ADDRESS}/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authService.getToken(),
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                });
        } catch (error) {
            setError('Error fetching profile information');
        }
    }, []);

    useEffect(() => {
        fetchProfileImages();
    }, [page]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    {error && <Typography color="error">{error}</Typography>}

                    {profile && <ProfileWidget profile={profile} />}

                    {images.length === 0 ? null : (
                        <ViewModeToggle
                            viewMode={viewMode}
                            onChange={handleViewChange}
                        />
                    )}

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: '16px',
                            width: '100%',
                            padding: '10px',
                        }}
                    >
                        {profile?.plans && profile?.plans?.length > 0
                            ? profile?.plans?.map((plan) => (
                                  <PlanWidget key={plan.id} plan={plan} />
                              ))
                            : null}
                    </div>

                    {images.length === 0 ? (
                        <Typography
                            sx={{
                                textAlign: 'center',
                                padding: '15px',
                                borderRadius: '8px',
                                fontSize: '20px',
                                fontWeight: 'medium',
                                border: '1px solid',
                                maxWidth: '400px',
                                margin: '0 auto',
                                lineHeight: '1.5',
                            }}
                        >
                            No posts yet? ;)
                        </Typography>
                    ) : null}

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

export { Profile };
