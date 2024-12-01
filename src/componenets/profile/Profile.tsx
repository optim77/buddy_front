import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useInView } from "react-intersection-observer";
import authService from "../../services/authService";
import AppTheme from "../theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const ProfileContainer = styled("div")(({ theme }) => ({
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
}));

const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
};

const Profile: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({ threshold: 0.5 });

    // Fetch profile images
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
            console.error("Error fetching profile images:", error);
        }
    }, [page, hasMore]);

    useEffect(() => {
        fetchProfileImages();
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
                <ProfileContainer>
                    <Grid container spacing={4}>
                        {images.map((image) => (
                            <Grid item xs={12} sm={6} md={4} key={image.imageId}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        loading="lazy"
                                        image={`${process.env.REACT_APP_API_ADDRESS}${image.imageUrl}`}
                                        alt={image.description || "Profile image"}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle1" noWrap>
                                            {image.username}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {truncateText(image.description || "No description", 50)}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{ mt: 1 }}
                                        >
                                            <IconButton size="small" color="error">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <Typography variant="body2" color="text.secondary">
                                                {image.likeCount} Likes
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <div ref={ref} style={{ height: "1px" }} />
                </ProfileContainer>
            </AppTheme>
        </Container>
    );
};

export default Profile;
