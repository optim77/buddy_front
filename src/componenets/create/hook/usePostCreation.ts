import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';

const usePostCreation = (
    uploadedFile: File | null,
    description: string,
    tags: string,
    isOpen: boolean,
) => {
    const [isSending, setIsSending] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateInput = () => {
        if (!uploadedFile) return 'Please upload an image!';
        if (uploadedFile.size >= 100000000)
            return 'Your file is too big, max size is 100Mb';
        if (!description) return 'Please fill in all fields!';
        return null;
    };

    const send = async () => {
        setIsSending(true);
        const validationError = validateInput();

        if (validationError) {
            setErrorMessage(validationError);
            setIsSending(false);
            return;
        }

        const formData = new FormData();

        if (uploadedFile) {
            formData.append('file', uploadedFile);
        } else {
            setErrorMessage('File is missing!');
            setIsSending(false);
            return;
        }

        formData.append('description', description);
        formData.append('open', isOpen ? 'true' : 'false');

        tags.split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
            .forEach((tag) => formData.append('tagSet', tag));

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ADDRESS}/image/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                },
            );

            if (response.status === 201) {
                navigate('/profile');
            } else {
                setErrorMessage('An error occurred: ' + response.data.message);
            }
        } catch (error: any) {
            setErrorMessage(
                error.response?.data?.message || 'An error occurred',
            );
        } finally {
            setIsSending(false);
        }
    };

    return { isSending, errorMessage, send };
};

export default usePostCreation;
