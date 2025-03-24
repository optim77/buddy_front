import { VolumeOff, VolumeUp, MoreVert } from '@mui/icons-material';
import {
    Container,
    Typography,
    Grid,
    CssBaseline,
    CircularProgress,
    Box,
    Avatar,
    Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { MainContainer } from '../../customStyles/MainContainer';
import { formatLikes } from '../../utils/FormatLike';
import { formatMediaLink } from '../../utils/FormatMediaLink';
import LikeButton from '../like/LikeButton';
import AppTheme from '../theme/AppTheme';
import { useFetchLoops } from './hook/useFetchLoops';
import { ILoop } from './ILoop';

const Loops: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const { videos, hasMore, setPage, error, loading } = useFetchLoops();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [muted, setMuted] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const { ref, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);

    useEffect(() => {
        if (isScrolling) {
            const timer = setTimeout(() => setIsScrolling(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isScrolling]);

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (isScrolling) return;

            if (e.deltaY > 0 && currentIndex < videos.length - 1) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else if (e.deltaY < 0 && currentIndex > 0) {
                setCurrentIndex((prevIndex) => prevIndex - 1);
            }

            setIsScrolling(true);
        };

        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, [videos, currentIndex, isScrolling]);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                index === currentIndex ? video.play() : video.pause();
            }
        });
    }, [currentIndex]);

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
                    {error && <Typography color="error">{error}</Typography>}

                    {loading && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '80vh',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}

                    {!loading && (
                        <Grid
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
                        </Grid>
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
            sx={{ position: 'absolute', width: '100%', height: '100%' }}
            component={motion.div}
            initial={{
                y:
                    index === currentIndex
                        ? '0%'
                        : index > currentIndex
                          ? '100%'
                          : '-100%',
            }}
            animate={{
                y:
                    index === currentIndex
                        ? '0%'
                        : index > currentIndex
                          ? '100%'
                          : '-100%',
            }}
            transition={{ duration: 0.8 }}
        >
            <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={formatMediaLink(video.imageUrl)}
                loop
                muted={muted}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
            <VideoControls video={video} muted={muted} setMuted={setMuted} />
        </Grid>
    );
};

const VideoControls: React.FC<{
    video: ILoop;
    muted: boolean;
    setMuted: (muted: boolean) => void;
}> = ({ video, muted, setMuted }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Box
                sx={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '5px',
                    borderRadius: '8px',
                    width: '60px',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6">
                    {formatLikes(video.likeCount)}
                </Typography>
                <LikeButton
                    mediaId={video.imageId}
                    isLiked={video.likedByCurrentUser}
                />
                <Button onClick={() => setMuted(!muted)}>
                    {muted ? <VolumeOff /> : <VolumeUp />}
                </Button>
                <Button>
                    <MoreVert />
                </Button>
            </Box>
        </Box>
    );
};

export default Loops;