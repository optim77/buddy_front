import { useEffect, useState } from 'react';
import Plan from '../Plan';
import { MESSAGE_TYPE, MESSAGE_TYPE_ERROR } from '../../../utils/CODE';
import axios from 'axios';
import authService from '../../../services/authService';

export const useFetchPlan = (id: string | undefined) => {
    if (!id)
        return {
            plan: null,
            messageType: MESSAGE_TYPE.ERROR,
            message: MESSAGE_TYPE_ERROR.FAILED_TO_FETCH,
        };
    const [plan, setPlan] = useState<Plan | null>(null);
    const [fetchPlanMessage, setFetchPlanMessage] = useState<string>('');
    const [fetchPlanMessageType, setFetchPlanMessageType] = useState<string>('');

    useEffect(() => {
        const getPlan = async () => {
            if (!id) {
                setFetchPlanMessageType(MESSAGE_TYPE.ERROR);
                setFetchPlanMessage(MESSAGE_TYPE_ERROR.FAILED_TO_FETCH);
                return;
            }

            const fetchedPlan = await fetchPlan(id);
            if (fetchedPlan) {
                setPlan(fetchedPlan);
            } else {
                setFetchPlanMessageType(MESSAGE_TYPE.ERROR);
                setFetchPlanMessage(MESSAGE_TYPE_ERROR.FAILED_TO_FETCH);
            }
        };

        getPlan();
    }, [id]);

    return { plan, fetchPlanMessage, fetchPlanMessageType };
};

const fetchPlan = async (id: string) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/plan/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + authService.getToken(),
            },
        });
        return res.data;
    } catch (error) {
        return null;
    }
};
