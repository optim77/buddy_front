import { useAuth } from './useAuth';
import React, { useState } from 'react';

export const useSingIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        await login(email, password);
        setIsSubmitting(false);
    };

    return { handleSubmit, isSubmitting };
};
