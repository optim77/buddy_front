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
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme/>
                <MainContainer>

                    Explore
                </MainContainer>
            </AppTheme>
        </Container>




    )
}
export default Explore