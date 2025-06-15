import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import AuthLayout from '../layout/AuthLayout';
import { SocialSignUpButtons } from './SocialSignUpButtons';
import { SingUpRouter } from './AuthRouter';
import { useSingIn } from './hook/useSingIn';
import FormField from '../form/FormField';

export default function SignIn() {
    const { handleSubmit, isSubmitting } = useSingIn();
    const [open, setOpen] = useState(false);

    return (
        <AuthLayout title="Sign Up">
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <FormField name="email" label="Email" type="email" />
                <FormField name="password" label="Password" type="password" />

                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <ForgotPassword open={open} handleClose={() => setOpen(false)} />
                <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
                <Link component="button" onClick={() => setOpen(true)} variant="body2" sx={{ alignSelf: 'center' }}>
                    Forgot your password?
                </Link>
            </Box>
            <Divider>or</Divider>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <SocialSignUpButtons />
                <SingUpRouter />
            </Box>
        </AuthLayout>
    );
}
