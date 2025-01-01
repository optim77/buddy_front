import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React, {useCallback, useEffect, useState} from "react";
import AppTheme from "../theme/AppTheme";
import authService from "../../services/authService";
import {MainContainer} from "../../customStyles/MainContainer";
import {useInView} from "react-intersection-observer";
import {MediaObject} from "../media/MediaObject";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MediaGrip from "../media/grid/MediaGrip";
import ViewModeToggle from "../media/ViewModeToggle";
import MediaWall from "../media/wall/MediaWall";


const Explore: React.FC = (props: { disableCustomTheme?: boolean }) => {

    const [images, setImages] = useState<MediaObject[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    let isContent = false;
    const { ref, inView } = useInView({ threshold: 0.5 });
    const [viewMode, setViewMode] = useState<string>(
        localStorage.getItem("buddy-grip") || "grid"
    );

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

    const handleViewChange = (mode: string) => {
        setViewMode(mode);
        localStorage.setItem("buddy-grip", mode);
    };

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
                    <ViewModeToggle viewMode={viewMode} onChange={handleViewChange} />
                    {viewMode === "grid" ? (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                                gap: "16px",
                            }}
                        >
                            {images.map((image) => (
                                <MediaGrip key={image.imageId} image={image} />
                            ))}
                        </div>
                    ) : (
                        <div>
                            {images.map((image) => (
                                <MediaWall key={image.imageId} image={image} />
                            ))}
                        </div>
                    )}
                    <div ref={ref} style={{ height: "1px" }} />
                </MainContainer>
            </AppTheme>
        </Container>




    )
}
export default Explore