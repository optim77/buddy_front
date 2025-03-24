import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { MainContainer } from '../../../customStyles/MainContainer';
import AppTheme from '../../theme/AppTheme';
import FollowList from '../FollowList';
import { useFetchFollow } from '../hook/useFetchFollowers';

const Following: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const { ref, inView } = useInView({ threshold: 0.5 });

    const {
        isContent,
        isLoading,
        fetchFollowersError,
        followers,
        hasMore,
        setPage,
    } = useFetchFollow('following');

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
                    <FollowList
                        isContent={isContent}
                        isLoading={isLoading}
                        fetchFollowersError={fetchFollowersError}
                        followers={followers}
                    />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};
export default Following;
