import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import { MainContainer } from '../../customStyles/MainContainer';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../CustomIcons';
import AppTheme from '../theme/AppTheme';
import ColorModeSelect from '../theme/ColorModeSelect';
import ForgotPassword from './ForgotPassword';
import { CustomCard } from '../../customStyles/Element';
import { useAuth } from './hook/useAuth';

export default function SignIn({
    disableCustomTheme,
}: {
    disableCustomTheme?: boolean;
}) {
    const { login, isSubmittingLogin } = useAuth();
    const [open, setOpen] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        login(email, password);
    };

    return (
        <AppTheme disableCustomTheme={disableCustomTheme}>
            <CssBaseline enableColorScheme />
            <MainContainer direction="column" justifyContent="space-between">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }}/>
                <CustomCard variant="outlined">
                    <SitemarkIcon />
                    <Typography component="h1" variant="h4">
                        Sign in
                    </Typography>
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
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                name="password"
                                type="password"
                                placeholder="••••••"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <ForgotPassword
                            open={open}
                            handleClose={() => setOpen(false)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isSubmittingLogin}
                        >
                            {isSubmittingLogin ? 'Signing in...' : 'Sign in'}
                        </Button>
                        <Link
                            component="button"
                            onClick={() => setOpen(true)}
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
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
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with Google')}
                            startIcon={<GoogleIcon />}
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with Facebook')}
                            startIcon={<FacebookIcon />}
                        >
                            Sign in with Facebook
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" variant="body2">
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </CustomCard>
            </MainContainer>
        </AppTheme>
    );
}
