import { useState } from 'react';
import {showBanner} from "../../banner/BannerUtils";

export const useAuthValidation = () => {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const validateInputs = (email: string, password: string): boolean => {
        let isValid = true;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            showBanner('Please enter a valid email address.', 'error');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password || password.length < 6) {
            showBanner('Password must be at least 6 characters long.', 'error');
            isValid = false;
        }

        return isValid;
    };

    return {
        emailError,
        emailErrorMessage,
        validateInputs,
    };
};
