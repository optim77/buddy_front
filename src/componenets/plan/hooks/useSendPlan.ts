import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../../../services/authService';
import { HTTP_CODE } from '../../../utils/CODE';

export const useCreatePlan = (update: boolean = false) => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('error');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number | null>(null);
    const navigate = useNavigate();

    const validate = (): boolean => {
        if (!name) {
            setMessage('You need to fill name!');
            setIsSending(false);
            return false;
        }
        if (description && description.length < 50) {
            setMessage('Description is too short!');
            setIsSending(false);
            return false;
        }
        if (price === null || price < 0 || Number.isNaN(price)) {
            setMessage('Insert correct price');
            setIsSending(false);
            return false;
        }
        setMessage('');
        return true;
    };

    const send = async () => {
        setIsSending(true);

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


                setMessage('Created! You will be redirected to profile page');
                setMessageType('success');
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            } catch (error: any) {
                if (error.response?.status === HTTP_CODE.CONFLICT) {
                    setMessage('You have too many plans');
                } else {
                    setMessage('Something went wrong, try again later');
                }
                setIsSending(false);
            }
        }
    };

    return {
        isSending,
        message,
        messageType,
        setName,
        setDescription,
        setPrice,
        send,
    };
};
