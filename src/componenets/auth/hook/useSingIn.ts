import { useAuth } from './useAuth';
import React, { useState } from 'react';

export const useSingIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        event.preventDefault();
        await login(email, password);
        setIsSubmitting(false);
    };

    return { email, password, setEmail, setPassword, handleSubmit, isSubmitting };
};
