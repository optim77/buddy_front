import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../../../services/authService';
import { HTTP_CODE } from '../../../utils/CODE';

export const useCreatePlan = (update: boolean = false) => {
    const [isSendingPlan, setIsSendingPlan] = useState<boolean>(false);
    const [messageSendPlan, setMessageSendPlan] = useState<string>('');
    const [messageTypeSendPlan, setMessageTypeSendPlan] = useState<string>('error');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number | null>(null);
    const navigate = useNavigate();

    const validate = (): boolean => {
        if (!name) {
            setMessageSendPlan('You need to fill name!');
            setIsSendingPlan(false);
            return false;
        }
        if (description && description.length < 50) {
            setMessageSendPlan('Description is too short!');
            setIsSendingPlan(false);
            return false;
        }
        if (price === null || price < 0 || Number.isNaN(price)) {
            setMessageSendPlan('Insert correct price');
            setIsSendingPlan(false);
            return false;
        }
        setMessageSendPlan('');
        return true;
    };

    const sendPlan = async () => {
        setIsSendingPlan(true);

        if (validate()) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', String(price));

            try {
                if (update) {
                    await axios.post(
                        `${process.env.REACT_APP_API_ADDRESS}/plan/create`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authService.getToken()}`,
                            },
                        },
                    );
                }else{
                    await axios.post(
                        `${process.env.REACT_APP_API_ADDRESS}/plan/create`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authService.getToken()}`,
                            },
                        },
                    );
                }


                setMessageSendPlan('Created! You will be redirected to profile page');
                setMessageTypeSendPlan('success');
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            } catch (error: any) {
                if (error.response?.status === HTTP_CODE.CONFLICT) {
                    setMessageSendPlan('You have too many plans');
                } else {
                    setMessageSendPlan('Something went wrong, try again later');
                }
                setIsSendingPlan(false);
            }
        }
    };

    return {
        isSendingPlan,
        messageSendPlan,
        messageTypeSendPlan,
        setName,
        setDescription,
        setPrice,
        sendPlan,
    };
};
