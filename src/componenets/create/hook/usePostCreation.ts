import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import { useFileValidation } from './useFileValidation';
import { showBanner } from '../../banner/BannerUtils';

const usePostCreation = (tags: string) => {
    const [isSending, setIsSending] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState<string>('');
    const navigate = useNavigate();

    const { validatePostCreate } = useFileValidation();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const files = Array.from(event.target.files);
        const validFile = files.find((file) => ['image/', 'video/'].some((type) => file.type.startsWith(type)));

        if (!validFile) {
            showBanner('Only images and videos are allowed.', 'error');
            return;
        }

        setFile(validFile);
    };

    const send = async () => {
        setIsSending(true);

        if (!validatePostCreate(file, description)) {
            return;
        }

        const formData = new FormData();

        if (file) {
            formData.append('file', file);
        } else {
            showBanner('File is missing!', 'error');
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
            const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/image/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authService.getToken()}`}
                },
            );

            if (response.status === 201) {
                navigate('/profile');
            } else {
                showBanner('An error occurred', 'error');
            }
        } catch (error: any) {
            showBanner('An error occurred', 'error');
        } finally {
            setIsSending(false);
        }
    };

    return { isSending, send, file, handleFileChange, setDescription, setIsOpen, isOpen };
};

export default usePostCreation;
