import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React, {useCallback, useEffect, useState} from "react";
import AppTheme from "../theme/AppTheme";
import exploreService from "./exploreService";
import authService from "../../services/authService";
import {MainContainer} from "../../customStyles/MainContainer";
import {useInView} from "react-intersection-observer";
import {MediaObject} from "../media/MediaObject";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Link} from "react-router-dom";
import {formatMediaLink} from "../../utils/FormatMediaLink";
import CardContent from "@mui/material/CardContent";
import {truncateText} from "../../utils/FormatText";
import {Stack} from "@mui/material";
import LikeButton from "../like/LikeButton";
import {formatLikes} from "../../utils/FormatLike";
import MediaGrip from "../media/grid/MediaGrip";


const Explore: React.FC = (props: { disableCustomTheme?: boolean }) => {

    const [images, setImages] = useState<MediaObject[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    let isContent = false;
    const { ref, inView } = useInView({ threshold: 0.5 });

    const fetch = useCallback (async () => {
        if (!hasMore) return;

        try {
            await axios.get(`${process.env.REACT_APP_API_ADDRESS}/image/open/random`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authService.getToken() ? `Bearer ${authService.getToken()}` : '',
                },
                params: { page, size: 20 },
            }).then(response => {
                const newImages = response.data.content;
                setImages((prevImages) => [...prevImages, ...newImages]);
                setHasMore(page + 1 < response.data.page.totalPages);
            })


        }catch (error){
            setError("Error fetching profile images");
        }

    }, [page, hasMore]);

    useEffect(() => {
        fetch().then(res => {
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

    return(
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
                    <Grid container spacing={3}>
                        {images.map((image) => (
                            <MediaGrip image={image} />
                        ))}
                    </Grid>
                    <div ref={ref} style={{ height: "1px" }} />
                </MainContainer>
            </AppTheme>
        </Container>




    )
}
export default Explore