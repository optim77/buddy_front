import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import AuthLayout from '../layout/AuthLayout';
import { useSignUp } from './hook/useSignUp';
import { SocialSignUpButtons } from './SocialSignUpButtons';
import FormField from '../form/FormField';
import { SignInRouter } from './AuthRouter';

export default function SignUp() {
    const { handleSubmit, isSubmitting } = useSignUp();

    return (
        <AuthLayout title="Sign Up">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <FormField name="email" label="Email" type="email" />
                <FormField name="password" label="Password" type="password" />
                <FormField name="repeatPassword" label="Repeat Password" type="password" />

                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I accept rules"
                />
                <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing up...' : 'Sign up'}
                </Button>
            </Box>
            <Divider>
                <Typography sx={{ color: 'text.secondary' }}>or</Typography>
            </Divider>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <SocialSignUpButtons />
                <SignInRouter />
            </Box>
        </AuthLayout>
    );
}
