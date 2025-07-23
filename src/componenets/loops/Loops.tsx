import { VolumeOff, VolumeUp, MoreVert } from '@mui/icons-material';
import { Container, Typography, Grid, CssBaseline, CircularProgress, Avatar, Button, Grid2 } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

import { MainContainer } from '../../customStyles/MainContainer';
import { formatLikes } from '../../utils/FormatLike';
import { buildMediaLink, formatMediaLink } from '../../utils/FormatMediaLink';
import LikeButton from '../like/LikeButton';
import AppTheme from '../theme/AppTheme';
import { useFetchLoops } from './hook/useFetchLoops';
import { ILoop } from './ILoop';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utils/FormatText';
import {
    LoadingBox,
    LoopUserItemBox,
    LoopUserItemInnerBox,
    LoopVideoControlBox,
    LoopVideoInnerControlBox,
    MainUserItemMotionDiv,
    MainVideoControlMotionDiv,
} from './elements/LoopElements';

const Loops: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const { videos, loading, muted, setMuted, currentIndex, videoRefs, ref } = useFetchLoops();

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                gap: 4,
                overflow: 'hidden',
            }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    {loading && (
                        <LoadingBox>
                            <CircularProgress />
                        </LoadingBox>
                    )}
                    {!loading && (
                        <Grid2
                            container
                            sx={{
                                position: 'relative',
                                height: '90vh',
                                top: '5vh',
                                overflow: 'hidden',
                            }}
                        >
                            {videos.map((video, index) => (
                                <VideoItem
                                    key={video.imageId}
                                    video={video}
                                    index={index}
                                    currentIndex={currentIndex}
                                    muted={muted}
                                    setMuted={setMuted}
                                    videoRefs={videoRefs}
                                />
                            ))}
                        </Grid2>
                    )}

                    <div ref={ref} style={{ height: '1px' }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

const VideoItem: React.FC<{
    video: ILoop;
    index: number;
    currentIndex: number;
    muted: boolean;
    setMuted: (muted: boolean) => void;
    videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
}> = ({ video, index, currentIndex, muted, setMuted, videoRefs }) => {
    return (
        <Grid
            item
            xs={12}
            sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            component={motion.div}
            initial={{
                y: index === currentIndex ? '0%' : index > currentIndex ? '100%' : '-100%',
            }}
            animate={{
                y: index === currentIndex ? '0%' : index > currentIndex ? '100%' : '-100%',
            }}
            transition={{ duration: 0.8 }}
        >
            <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={formatMediaLink(video.imageUrl)}
                loop
                muted={muted}
                preload="auto"
                style={{
                    objectFit: 'cover',
                    width: '70%',
                    height: '100%',
                    margin: '0 auto',
                    display: 'block',
                }}
            />
            <VideoControls key={`controls-${index === currentIndex}`} video={video} muted={muted} setMuted={setMuted} />
            <UserItem key={`user-${index === currentIndex}`} video={video} />
        </Grid>
    );
};
export default Loops;

const VideoControls: React.FC<{
    video: ILoop;
    muted: boolean;
    setMuted: (muted: boolean) => void;
}> = ({ video, muted, setMuted }) => {
    return (
        <MainVideoControlMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
        >
            <LoopVideoControlBox>
                <LoopVideoInnerControlBox>
                    <Typography variant="h6">{formatLikes(video.likeCount)}</Typography>
                    <LikeButton mediaId={video.imageId} isLiked={video.likedByCurrentUser} />
                    <Button onClick={() => setMuted(!muted)}>{muted ? <VolumeOff /> : <VolumeUp />}</Button>
                    <Button>
                        <MoreVert />
                    </Button>
                </LoopVideoInnerControlBox>
            </LoopVideoControlBox>
        </MainVideoControlMotionDiv>
    );
};

const UserItem: React.FC<{ video: ILoop }> = ({ video }) => {
    return (
        <MainUserItemMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
        >
            <LoopUserItemBox>
                <LoopUserItemInnerBox>
                    <Avatar
                        src={video.avatar ? buildMediaLink(video.avatar) : undefined}
                        alt={video.username}
                        sx={{ width: 40, height: 40 }}
                    />
                    <Typography sx={{ marginLeft: '10px' }} variant="h6">
                        <Link to={`/user/${video.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {video.username}
                        </Link>
                    </Typography>
                </LoopUserItemInnerBox>
                <Typography sx={{ padding: '10px' }} variant="body2">
                    {truncateText(video.description || 'No description', 300)}
                </Typography>
            </LoopUserItemBox>
        </MainUserItemMotionDiv>
    );
};
