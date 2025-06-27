import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { MainContainer } from '../../../customStyles/MainContainer';
import AppTheme from '../../theme/AppTheme';
import FollowList from '../FollowList';
import { useFetchFollow } from '../hook/useFetchFollowers';

const Following: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const { isContent, isLoading, followers, ref } = useFetchFollow('following');

    return (
        <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    <FollowList isContent={isContent} isLoading={isLoading} followers={followers} />
                    <div ref={ref} style={{ height: '1px' }} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};
export default Following;
