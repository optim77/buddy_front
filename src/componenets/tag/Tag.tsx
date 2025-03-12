import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import { MainContainer } from '../../customStyles/MainContainer';
import MediaGrip from '../media/grid/MediaGrip';
import AppTheme from '../theme/AppTheme';
import {useFetchTagMedia} from "./hook/useFetchTagMedia";
import {fetchMessage} from "../../utils/fetchMessage";
import {MESSAGE_TYPE} from "../../utils/CODE";

const Tag: React.FC = (props: { disableCustomTheme?: boolean }) => {

    const { ref, inView } = useInView({ threshold: 0.5 });
    const { tag } = useParams<{ tag: string }>();


    const {
        fetchMediaTagLoading,
        fetchMediaTagContent,
        media,
        hasMore,
        setPage,
        fetchTagMediaError
    } = useFetchTagMedia(tag);

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
                    {fetchTagMediaError &&
                        fetchMessage(fetchTagMediaError, MESSAGE_TYPE.ERROR)}

                    {!fetchMediaTagLoading && <p>Loading...</p>}

                    {!fetchMediaTagContent ? null : (
                        <Typography variant="h1" gutterBottom>
                            There is no posts yet ;)
                        </Typography>
                    )}

                    <Grid container spacing={4}>
                        {media.map((m) => (
                            <MediaGrip image={m} />
                        ))}
                    </Grid>
                    <div ref={ref} style={{ height: '1px' }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default Tag;
