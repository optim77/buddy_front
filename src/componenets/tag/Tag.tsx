import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import { MainContainer } from '../../customStyles/MainContainer';
import authService from '../../services/authService';
import MediaGrip from '../media/grid/MediaGrip';
import AppTheme from '../theme/AppTheme';
import { IMedia } from '../media/IMedia';

const Tag: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [images, setImages] = useState<IMedia[]>([]);
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
                `${process.env.REACT_APP_API_ADDRESS}/tag/${tag}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authService.getToken(),
                    },
                    params: { page, size: 20 },
                },
            );

            const newImages = response.data.content;
            setImages((prevImages) => [...prevImages, ...newImages]);
            setHasMore(page + 1 < response.data.page.totalPages);
        } catch (error) {
            setError('Error fetching profile images');
        }
    }, [page, hasMore]);

    useEffect(() => {
        fetchTagsImages().then((res) => {
            if (res != undefined) {
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
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    {error && <TextField value={error} />}
                    {!isContent ? null : (
                        <Typography variant="h1" gutterBottom>
                            There is no posts yet ;)
                        </Typography>
                    )}
                    <Grid container spacing={4}>
                        {images.map((image) => (
                            <MediaGrip image={image} />
                        ))}
                    </Grid>
                    <div ref={ref} style={{ height: '1px' }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default Tag;
