import React, {useCallback, useEffect, useState, useRef} from "react";
import {useInView} from "react-intersection-observer";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import authService from "../../services/authService";
import {Container, Typography, Grid, CssBaseline, CircularProgress, Box, Avatar} from "@mui/material";
import AppTheme from "../theme/AppTheme";
import {MainContainer} from "../../customStyles/MainContainer";
import {formatMediaLink} from "../../utils/FormatMediaLink";
import LikeButton from "../like/LikeButton";
import {formatLikes} from "../../utils/FormatLike";
import {truncateText} from "../../utils/FormatText";
import {motion} from "framer-motion";
import {Favorite, Favorited, MuteIcon, UnmuteIcon} from "../CustomIcons";
import Button from "@mui/material/Button";
import {MoreVert, VolumeOff, VolumeUp} from "@mui/icons-material";

const Loops: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [videos, setVideos] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {ref, inView} = useInView({threshold: 0.5});
    const {userId} = useParams<{ userId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [muted, setMuted] = useState<boolean>(true);

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const fetchVideo = useCallback(async () => {
        if (!hasMore) return;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/loops`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + (authService.getToken() || ""),
                    },
                    params: {page, size: 20},
                }
            );

            const newVideos = response.data.content;
            setVideos((prevVideos) => [...prevVideos, ...newVideos]);
            setHasMore(page + 1 < response.data.page.totalPages);
        } catch (error) {
            setError("Error fetching videos");
        } finally {
            setLoading(false);
        }
    }, [page, hasMore]);

    useEffect(() => {
        fetchVideo();
    }, [page, userId]);

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);

    const handleScroll = (e: WheelEvent) => {
        console.log(e.deltaY)
        if (e.deltaY > 0 && currentIndex < videos.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1); // Scroll down
        } else if (e.deltaY < 0 && currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1); // Scroll up
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.key === "ArrowDown" || e.key.toLowerCase() === "s") && currentIndex < videos.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if ((e.key === "ArrowUp" || e.key.toLowerCase() === "w") && currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [videos, currentIndex]);

    useEffect(() => {
        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
    }, [videos, currentIndex]);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === currentIndex) {
                    video.play().catch((err) => console.error("Error playing video:", err));
                } else {
                    video.pause();
                }
            }
        });
    }, [currentIndex]);

    useEffect(() => {
        if (videos.length > 0 && videoRefs.current[0]) {
            videoRefs.current[0]?.play().catch((err) => console.error("Error playing video:", err));
        }
    }, [videos]);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                gap: 4,
                overflow: "hidden",
            }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme/>
                <MainContainer>
                    {error && <Typography color="error">{error}</Typography>}

                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "80vh",
                            }}
                        >
                            <CircularProgress/>
                        </Box>
                    ) : null}

                    {!loading && (
                        <Grid container sx={{position: "relative", height: "90vh", top: '5vh', overflow: "hidden"}}>
                            {videos.map((video, index) => {
                                const isCurrent = index === currentIndex;
                                const isPrevious = index === currentIndex + 1;
                                const isNext = index === currentIndex - 1;

                                if (!isCurrent && !isPrevious && !isNext) return null;

                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        key={video.imageId}
                                        sx={{
                                            position: "absolute",

                                            width: "100%",
                                            height: "100%",
                                        }}
                                        component={motion.div}
                                        initial={{
                                            // Odwrócenie animacji dla odpowiedniego kierunku
                                            y: isNext ? "-100%" : isPrevious ? "100%" : "0%",
                                        }}
                                        animate={{
                                            y: isCurrent ? "0%" : isNext ? "-100%" : "100%",
                                        }}
                                        transition={{duration: 0.8}}
                                    >
                                        <video
                                            ref={(el) => (videoRefs.current[index] = el)}
                                            src={formatMediaLink(video.imageUrl)}
                                            loop
                                            muted={muted}
                                            style={{
                                                objectFit: "cover",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />

                                        <Box
                                            sx={{
                                                position: "absolute",
                                                bottom: "20px",
                                                left: "20px",
                                                right: "20px",
                                                zIndex: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    background: "rgba(0, 0, 0, 0.5)",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    padding: "10px",
                                                    borderRadius: "8px",
                                                    width: "65px",
                                                    textAlign: "center",
                                                }}
                                            >

                                                <Typography variant="h6">
                                                    <Typography variant="body2" color="inherit" component="div"
                                                                sx={{fontSize: "13px"}}>
                                                        {formatLikes(video.likeCount)}
                                                    </Typography>
                                                    <LikeButton mediaId={video.imageId}
                                                                isLiked={video.likedByCurrentUser}></LikeButton>
                                                </Typography>

                                                <Typography variant="h6">
                                                    <Button onClick={() => {
                                                        setMuted(!muted)
                                                    }}>
                                                        { muted ? <VolumeOff/> : <VolumeUp/> }

                                                    </Button>
                                                </Typography>

                                                <Typography>
                                                    <Button>
                                                        <Favorite />
                                                    </Button>
                                                </Typography>

                                                <Typography>
                                                    <Button>
                                                        <MoreVert />
                                                    </Button>
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    background: "rgba(0, 0, 0, 0.5)",
                                                    padding: "20px",
                                                    borderRadius: "8px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 1,
                                                    height: "150px",
                                                }}
                                            >
                                                <Box
                                                    sx={{display: "flex", alignItems: "center", gap: 2, right: "20px"}}>
                                                    <Avatar
                                                        src={video.avatar ? formatMediaLink(video.avatar) : undefined}
                                                        alt={video.username}
                                                        sx={{width: 40, height: 40}}
                                                    />
                                                    <Typography variant="h6">
                                                        <Link
                                                            to={`/user/${video.userId}`}
                                                            style={{textDecoration: "none", color: "inherit"}}
                                                        >
                                                            {video.username}
                                                        </Link>
                                                    </Typography>
                                                </Box>

                                                {/* Opis */}
                                                <Typography variant="body2">
                                                    {truncateText(video.description || "No description", 300)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}

                    <div ref={ref} style={{height: "1px"}}/>
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default Loops;
