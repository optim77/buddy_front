import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';
import { ProfileInformation } from '../ProfileInformation';
import { Plan } from '../../plan/Plan';

export const useProfile = () => {
    const [profile, setProfile] = useState<ProfileInformation>();
    const [plans, setPlans] = useState<Plan[] | null>([]);
    const [profileError, setProfileError] = useState<string>('');
    const [profileLoading, setProfileLoading] = useState<boolean>(true);

    const fetchProfile = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authService.getToken(),
                },
            });
            setPlans(response.data.plans);
            setProfile(response.data);
        } catch (error) {
            setProfileError('Error fetching profile information');
        }
    }, []);

    useEffect(() => {
        fetchProfile();
        setProfileLoading(false);
    }, [fetchProfile]);

    return { profile, profileError, profileLoading, plans };
};
