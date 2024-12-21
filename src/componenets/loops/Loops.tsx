import React, { useCallback, useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import axios from "axios";
import authService from "../../services/authService";
import { Container, Typography, Grid, CssBaseline, CircularProgress, Box, Avatar } from "@mui/material";
import AppTheme from "../theme/AppTheme";
import { MainContainer } from "../../customStyles/MainContainer";
import { formatMediaLink } from "../../utils/FormatMediaLink";

const Loops: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [videos, setVideos] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { ref, inView } = useInView({ threshold: 0.5 });
    const { userId } = useParams<{ userId: string }>();
    const [loading, setLoading] = useState<boolean>(true);

    // Referencje do elementów wideo
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
                    params: { page, size: 20 },
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

    useEffect(() => {
        const handleGlobalScroll = (e: WheelEvent) => {
            if (e.deltaY > 0) {
                setCurrentIndex((prevIndex) => Math.min(videos.length - 1, prevIndex + 1));
            } else {
                setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
            }
        };

        window.addEventListener("wheel", handleGlobalScroll);
        return () => window.removeEventListener("wheel", handleGlobalScroll);
    }, [videos]);

    // Obsługa klawiatury
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp" || e.key === "w") {
                setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
            } else if (e.key === "ArrowDown" || e.key === "s") {
                setCurrentIndex((prevIndex) => Math.min(videos.length - 1, prevIndex + 1));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [videos]);

    // Odtwarzanie aktualnego wideo
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
                <CssBaseline enableColorScheme />
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
                            <CircularProgress />
                        </Box>
                    ) : null}

                    {!loading && (
                        <Grid container>
                            {videos.map((video, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    key={video.imageId}
                                    sx={{
                                        display: index === currentIndex ? "flex" : "none",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "90vh",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* Wideo */}
                                    <video
                                        ref={(el) => (videoRefs.current[index] = el)}
                                        src={formatMediaLink(video.imageUrl)}
                                        loop
                                        muted
                                        style={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                            top: 100,
                                            left: 0,
                                            zIndex: 1,
                                        }}
                                    />

                                    {/* Informacje o autorze i lajki */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: "20px",
                                            left: "20px",
                                            color: "white",
                                            background: "rgba(0, 0, 0, 0.5)",
                                            padding: "10px",
                                            borderRadius: "8px",
                                            zIndex: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <Avatar
                                                src={video.avatar ? formatMediaLink(video.avatar) : undefined}
                                                alt={video.username}
                                                sx={{ width: 40, height: 40 }}
                                            />
                                            <Typography variant="h6">{video.username}</Typography>
                                        </Box>
                                        <Typography variant="body1">Likes: {video.likeCount}</Typography>
                                        <Typography variant="body2">
                                            {video.description || "No description"}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    <div ref={ref} style={{ height: "1px" }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default Loops;
