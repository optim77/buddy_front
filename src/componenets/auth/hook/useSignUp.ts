import { useAuth } from './useAuth';
import { useState } from 'react';
import * as React from 'react';

export const useSignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const repeatPassword = formData.get('repeatPassword') as string;

        await signUp(email, password, repeatPassword);
        setIsSubmitting(false);
    }

    return { handleSubmit, isSubmitting };
}