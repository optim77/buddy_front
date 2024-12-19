import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {  Stack } from "@mui/material";
import { useInView } from "react-intersection-observer";
import authService from "../../services/authService";
import AppTheme from "../theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

import LikeButton from "../like/LikeButton";
import {formatLikes} from "../../utils/FormatLike";
import {truncateText} from "../../utils/FormatText";
import {MainContainer} from "../../customStyles/MainContainer";
import {formatMediaLink} from "../../utils/FormatMediaLink";


const Profile: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    let isContent = false;
    const { ref, inView } = useInView({ threshold: 0.5 });

    const fetchProfileImages = useCallback(async () => {
        if (!hasMore) return;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/profile/images`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + authService.getToken(),
                    },
                    params: { page, size: 20 },
                }
            );

            const newImages = response.data.content;
            setImages((prevImages) => [...prevImages, ...newImages]);
            setHasMore(page + 1 < response.data.page.totalPages);
        } catch (error) {
            setError("Error fetching profile images");
        }
    }, [page, hasMore]);

    useEffect(() => {
        fetchProfileImages().then(res => {
            if (res != undefined){
                isContent = true;
            }
        });
    }, [page]);

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore]);


    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    {error && (<TextField value={error} />)}
                    {!isContent ? null : <Typography variant="h1" gutterBottom>There is no posts yet ;)</Typography> }
                    <Grid container spacing={4}>
                        {images.map((image) => (
                            <Grid item xs={12} sm={6} md={4} key={image.imageId}>
                                <Card>
                                    <Link to={"/image/" + image.imageId}>
                                        {image.mediaType === "VIDEO" ? (
                                            <video
                                                src={formatMediaLink(image.imageUrl)}
                                                //controls
                                                autoPlay
                                                loop
                                                muted
                                                style={{
                                                    width: "100%",
                                                    maxHeight: 200,
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src={formatMediaLink(image.imageUrl)}
                                                alt={image.description || "Profile image"}
                                                style={{
                                                    width: "100%",
                                                    height: 200,
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )}
                                    </Link>
                                    <CardContent>
                                        <Typography variant="subtitle1" noWrap>
                                            {image.username}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {truncateText(
                                                image.description || "No description",
                                                50
                                            )}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{ mt: 1 }}
                                        >
                                            <LikeButton mediaId={image.imageId} isLiked={image.likedByCurrentUser}></LikeButton>
                                            <Typography variant="body2" color="text.secondary">
                                                {formatLikes(image.likeCount)}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <div ref={ref} style={{ height: "1px" }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default Profile;
