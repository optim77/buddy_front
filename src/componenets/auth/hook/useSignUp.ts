import { useAuth } from './useAuth';
import { useState } from 'react';

export const useSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        await signUp(email, password, repeatPassword);
        setIsSubmitting(false);
    };

    return {
        email,
        password,
        repeatPassword,
        setEmail,
        setPassword,
        setRepeatPassword,
        handleSubmit,
        isSubmitting,
    };
};
