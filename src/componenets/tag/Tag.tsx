import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useInView } from "react-intersection-observer";
import authService from "../../services/authService";
import AppTheme from "../theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {Link, useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import LikeButton from "../like/LikeButton";
import {formatLikes} from "../../utils/FormatLike";
import {truncateText} from "../../utils/FormatText";
import {MainContainer} from "../../customStyles/MainContainer";
import {formatMediaLink} from "../../utils/FormatMediaLink";
import MediaGrip from "../media/grid/MediaGrip";

const Tag: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    let isContent = false;
    const { ref, inView } = useInView({ threshold: 0.5 });
    const { tag } = useParams<{ tag: string }>();

    const fetchTagsImages = useCallback(async () => {
        if (!hasMore) return;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/image/open/tag/` + tag,
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
        fetchTagsImages().then(res => {
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
                            <MediaGrip image={image} />
                        ))}
                    </Grid>
                    <div ref={ref} style={{ height: "1px" }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default Tag;
