import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { MainContainer } from '../../customStyles/MainContainer';
import authService from '../../services/authService';
import MediaGrip from '../media/grid/MediaGrip';
import { MediaObject } from '../media/MediaObject';
import ViewModeToggle from '../media/ViewModeToggle';
import MediaWall from '../media/wall/MediaWall';
import { ITag } from '../tag/ITag';
import AppTheme from '../theme/AppTheme';

import TagList from './TagList';

const Explore: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [images, setImages] = useState<MediaObject[]>([]);
    const [tags, setTags] = useState<ITag[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<string>(
        localStorage.getItem('buddy-grip') || 'grid',
    );
    const [contentType, setContentType] = useState<'posts' | 'tags'>('posts');

    const { ref, inView } = useInView({ threshold: 0.5 });

    const fetch = useCallback(async () => {
        if (!hasMore) return;

        try {
            if (contentType === 'posts') {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ADDRESS}/image/open/random`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: authService.getToken()
                                ? `Bearer ${authService.getToken()}`
                                : '',
                        },
                        params: { page, size: 20 },
                    },
                );
                const newImages = response.data.content;
                setImages((prevImages) => [...prevImages, ...newImages]);
                setHasMore(page + 1 < response.data.page.totalPages);
            } else if (contentType === 'tags') {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ADDRESS}/tags/all`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: authService.getToken()
                                ? `Bearer ${authService.getToken()}`
                                : '',
                        },
                    },
                );
                setTags(response.data.content);
            }
        } catch (error) {
            setError('Error fetching data');
        }
    }, [page, hasMore, contentType]);

    useEffect(() => {
        fetch();
    }, [page, contentType]);

    useEffect(() => {
        if (inView && hasMore && contentType === 'posts') {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore, contentType]);

    const handleViewChange = (mode: string) => {
        setViewMode(mode);
        localStorage.setItem('buddy-grip', mode);
    };

    const handleContentTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newContentType: 'posts' | 'tags',
    ) => {
        if (newContentType !== null) {
            setContentType(newContentType);
            setPage(0);
            setImages([]);
            setTags([]);
            setHasMore(true);
            setError('');
        }
    };

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    <ToggleButtonGroup
                        value={contentType}
                        exclusive
                        onChange={handleContentTypeChange}
                        aria-label="content type"
                        sx={{
                            mb: 4,
                            border: 'none',
                            boxShadow: 'none',
                            width: 'fit-content',
                        }}
                    >
                        <ToggleButton value="posts" aria-label="posts">
                            Posts
                        </ToggleButton>
                        <ToggleButton value="tags" aria-label="tags">
                            Tags
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {contentType === 'posts' ? (
                        <ViewModeToggle
                            viewMode={viewMode}
                            onChange={handleViewChange}
                        />
                    ) : null}
                    {error && <Typography>{error}</Typography>}
                    {contentType === 'posts' ? (
                        viewMode === 'grid' ? (
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '16px',
                                }}
                            >
                                {images.map((image) => (
                                    <MediaGrip
                                        key={image.imageId}
                                        image={image}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div>
                                {images.map((image) => (
                                    <MediaWall
                                        key={image.imageId}
                                        image={image}
                                    />
                                ))}
                            </div>
                        )
                    ) : (
                        <TagList tags={tags} />
                    )}

                    <div ref={ref} style={{ height: '1px' }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default Explore;
