import {useCallback, useEffect, useState} from "react";
import {IUserData} from "../IUserData";
import axios from "axios";
import authService from "../../../services/authService";

export const useFetchOwnProfile = () => {
    const [isLoadingFetchOwnProfile, setIsLoadingFetchOwnProfile,] = useState(true);
    const [ownProfileData, setOwnProfileData] = useState<IUserData | null>(null);
    const [fetchOwnProfileError, setFetchOwnProfileError] = useState<string | null>(null);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/profile`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                },
            );
            setOwnProfileData(response.data);
        } catch (err) {
            setFetchOwnProfileError('Failed to fetch user data.');
        }
    }, []);
    useEffect(() => {
        fetchUserData();
        setIsLoadingFetchOwnProfile(false);
    });

    return { isLoadingFetchOwnProfile, ownProfileData, fetchOwnProfileError };

}