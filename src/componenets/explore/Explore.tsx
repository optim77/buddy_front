import React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { MainContainer } from '../../customStyles/MainContainer';
import AppTheme from '../theme/AppTheme';
import { useExplore } from './hook/useExplore';
import { ExploreTab } from './ExploreTab';

const Explore: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const { images, tags, ref, viewMode, contentType, handleViewChange, handleContentTypeChange } = useExplore();

    return (
        <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
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
                    <ExploreTab
                        contentType={contentType}
                        handleViewChange={handleViewChange}
                        viewMode={viewMode}
                        images={images}
                        tags={tags}
                    />

                    <div ref={ref} style={{ height: '1px' }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};

export default Explore;
