import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { MainContainer } from '../../../customStyles/MainContainer';
import authService from '../../../services/authService';
import { MediaObject } from '../../media/MediaObject';
import AppTheme from '../../theme/AppTheme';
import { UserInformation } from '../../user/UserInformation';
import FollowList from '../FollowList';
import { FollowListUser } from '../FollowListUser';

const Followers: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [followers, setFollowers] = useState<FollowListUser[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { ref, inView } = useInView({ threshold: 0.5 });
    let isContent = false;

    const fetch = useCallback(async () => {
        if (!hasMore) return;
        try {
            await axios
                .get(`${process.env.REACT_APP_API_ADDRESS}/followers`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authService.getToken()
                            ? `Bearer ${authService.getToken()}`
                            : '',
                    },
                    params: { page, size: 20 },
                })
                .then((response) => {
                    const newFollowers = response.data.content;
                    setFollowers((prevFollowers) => [
                        ...prevFollowers,
                        ...newFollowers,
                    ]);
                    setHasMore(page + 1 < response.data.page.totalPages);
                });
        } catch (err) {
            setError('Something went wrong');
        }
    }, [page, hasMore]);

    useEffect(() => {
        fetch().then((res) => {
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
                    <FollowList followers={followers} />
                </MainContainer>
            </AppTheme>
        </Container>
    );
};
export default Followers;
