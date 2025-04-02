import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';
import { ProfileInformation } from '../ProfileInformation';

export const useProfile = () => {
    const [profile, setProfile] = useState<ProfileInformation>();
    const [profileError, setProfileError] = useState<string>('');

    const fetchProfile = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/profile`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authService.getToken(),
                    },
                },
            );
            setProfile(response.data);
        } catch (error) {
            setProfileError('Error fetching profile information');
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, profileError };
};
