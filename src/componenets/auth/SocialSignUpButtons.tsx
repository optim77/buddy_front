import Button from '@mui/material/Button';
import { FacebookIcon, GoogleIcon } from '../CustomIcons';
import * as React from 'react';

const SocialSignUpButtons = () => {
    return (
        <>
            <Button
                fullWidth
                variant="outlined"
                onClick={() => alert('Sign up with Google')}
                startIcon={<GoogleIcon />}
            >
                Sign up with Google
            </Button>
            <Button
                fullWidth
                variant="outlined"
                onClick={() => alert('Sign up with Facebook')}
                startIcon={<FacebookIcon />}
            >
                Sign up with Facebook
            </Button>
        </>
    );
};
export { SocialSignUpButtons };
