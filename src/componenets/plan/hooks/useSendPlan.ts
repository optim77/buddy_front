import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HTTP_CODE } from '../../../utils/CODE';
import { showBanner } from '../../banner/BannerUtils';
import { apiClient } from '../../api/apiClient';

export const useCreatePlan = (update = false) => {
    const [isSendingPlan, setIsSendingPlan] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number | null>(null);
    const navigate = useNavigate();

    const validate = (): boolean => {
        if (!name) {
            showBanner('You need to fill name!', 'error');
            setIsSendingPlan(false);
            return false;
        }
        if (description && description.length < 50) {
            showBanner('Description is too short!', 'error');
            setIsSendingPlan(false);
            return false;
        }
        if (price === null || price < 0 || Number.isNaN(price)) {
            showBanner('Insert correct price', 'error');
            setIsSendingPlan(false);
            return false;
        }
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
                    await apiClient.post('/plan/update', { formData });
                } else {
                    await apiClient.post('/plan/create', { formData });
                }

                showBanner('Created! You will be redirected to profile page', 'info');
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            } catch (error: any) {
                if (error.response?.status === HTTP_CODE.CONFLICT) {
                    showBanner('You have too many plans', 'error');
                } else {
                    showBanner('Something went wrong, try again later', 'error');
                }
                setIsSendingPlan(false);
            }
        }
    };

    return {
        isSendingPlan,
        setName,
        setDescription,
        setPrice,
        sendPlan,
    };
};
