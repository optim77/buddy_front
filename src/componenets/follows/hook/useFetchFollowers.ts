import {useCallback, useEffect, useState} from "react";
import {FollowListUser} from "../FollowListUser";
import axios from "axios";
import authService from "../../../services/authService";

export const useFetchFollow = (type: string) => {
    const [isContent, setIsContent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [followers, setFollowers] = useState<FollowListUser[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [fetchFollowersError, setFetchFollowersError] = useState<string | null>(null);

    const fetchFollowers = useCallback(async () => {
        if (!hasMore) return;
        try {
            await axios
                .get(`${process.env.REACT_APP_API_ADDRESS}/${type}`, {
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
            setFetchFollowersError('Something went wrong');
        }
    }, [page, hasMore]);

    useEffect(() => {
        fetchFollowers();
        setIsLoading(false);
        setIsContent(true);
    }, []);

    return {isContent, isLoading, fetchFollowersError, followers, hasMore , setPage };
}