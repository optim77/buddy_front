import { showBanner } from '../../banner/BannerUtils';

export const useFileValidation = () => {

    const validatePostCreate = (file: File | null, description: string): boolean => {
        let isValid = true;

        if (!file){
            isValid = false;
            showBanner('Please upload an image!', 'error')
        }
        if (file && file.size >= 100000000){
            isValid = false;
            showBanner('Your file is too big, max size is 100Mb', 'error');
        }
        if (!description) {
            isValid = false;
            showBanner('Please fill in all fields!', 'error');
        }
        return isValid
    }

    return { validatePostCreate }
}
