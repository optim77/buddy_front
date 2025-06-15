import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';

const SignInRouter = () => {
    return (
        <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href="/sign-in" variant="body2" sx={{ alignSelf: 'center' }}>
                Sign in
            </Link>
        </Typography>
    );
};

const SingUpRouter = () => {
    return (
        <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" variant="body2">
                Sign up
            </Link>
        </Typography>
    );
};

export { SignInRouter, SingUpRouter };
