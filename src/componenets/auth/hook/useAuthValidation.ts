import { showBanner } from '../../banner/BannerUtils';

export const useAuthValidation = () => {
    const validateInputs = (email: string, password: string): boolean => {
        let isValid = true;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            showBanner('Please enter a valid email address.', 'error');
            isValid = false;
        }

        if (!password || password.length < 6) {
            showBanner('Password must be at least 6 characters long.', 'error');
            isValid = false;
        }

        return isValid;
    };

    const validateSignUpInputs = (email: string, password: string, confirm: string): boolean => {
        let isValid = true;
        if (!/\S+@\S+\.\S+/.test(email)) {
            showBanner('Please enter a valid email address.', 'error');
            isValid = false;
        }

        if (password.length < 6 && confirm.length < 6 && password !== confirm) {
            showBanner('Passwords do not match.', 'error');
            isValid = false;
        }

        if (password.length < 6) {
            showBanner('Password must be at least 6 characters long.', 'error');
            isValid = false;
        }
        return isValid;
    };

    return { validateInputs, validateSignUpInputs };
};
