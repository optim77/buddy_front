import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useInView } from "react-intersection-observer";
import authService from "../../services/authService";
import AppTheme from "../theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { MainContainer } from "../../customStyles/MainContainer";
import MediaGrip from "../media/grid/MediaGrip";
import MediaWall from "../media/wall/MediaWall";
import {GridView, WallView} from "../CustomIcons";
import ViewModeToggle from "../media/ViewModeToggle";

const Profile: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<string>(
        localStorage.getItem("buddy-grip") || "grid"
    );
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
        fetchProfileImages();
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

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    {error && <Typography color="error">{error}</Typography>}
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
    );
};

export default Profile;
