import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import { MainContainer } from '../../customStyles/MainContainer';
import MediaGrip from '../media/grid/MediaGrip';
import ViewModeToggle from '../media/ViewModeToggle';
import MediaWall from '../media/wall/MediaWall';
import ProfileWidget from '../profile/ProfileWidget';
import AppTheme from '../theme/AppTheme';

import {useFetchUser} from "./hook/useFetchUser";
import {fetchMessage} from "../../utils/fetchMessage";
import {MESSAGE_TYPE} from "../../utils/CODE";
import { useFetchProfileMedia } from "./hook/useFetchProfileImages";

const User: React.FC = (props: { disableCustomTheme?: boolean }) => {

    let isContent = false;
    const { ref, inView } = useInView({ threshold: 0.5 });
    const { userId } = useParams<{ userId: string }>();

    const [viewMode, setViewMode] = useState<string>(
        localStorage.getItem('buddy-grip') || 'grid',
    );

    const { userLoading, user , fetchUserMessage } = useFetchUser(userId)
    const { images, hasMore, setPage, fetchProfileImagesError } = useFetchProfileMedia(userId);


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
                    {fetchProfileImagesError && (
                        fetchMessage(fetchProfileImagesError, MESSAGE_TYPE.ERROR)
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
