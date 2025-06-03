import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContainer } from '../../customStyles/MainContainer';
import authService from '../../services/authService';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../CustomIcons';
import AppTheme from '../theme/AppTheme';
import ColorModeSelect from '../theme/ColorModeSelect';
import { CustomCard } from '../../customStyles/Element';

export default function SignUp(props: { disableCustomTheme?: boolean }) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [isSubmiting, setIsSubmitting] = React.useState(false);

    const navigate = useNavigate();

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password',) as HTMLInputElement;
        const repeatPassword = document.getElementById('repeatPassword',) as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        // if (!password.value || password.value.length < 6 && !repeatPassword.value || repeatPassword.value.length < 6 &&password.value !== repeatPassword.value) {
        //     setEmailError(true);
        //     setPasswordErrorMessage("Passwords do not match.");
        // }else{
        //     setPasswordError(false);
        //     setPasswordErrorMessage('');
        // }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage(
                'Password must be at least 6 characters long.',
            );
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        if (nameError || emailError || passwordError) {
            event.preventDefault();
            setIsSubmitting(false);
            return;
        }
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string | null;
        const password = data.get('password') as string | null;
        if (email && password) {
            authService
                .register(email, password)
                .then(function () {
                    navigate('/registered');
                })
                .catch((error) => {
                    setIsSubmitting(false);
                    if (error.code == 'ERR_NETWORK') {
                        setEmailError(true);
                        setEmailErrorMessage(
                            'Something went wrong, try again.',
                        );
                        return;
                    }
                    if (
                        error.response &&
                        error.response.data.message === 'Invalid email format'
                    ) {
                        setEmailError(true);
                        setEmailErrorMessage(error.response.data.message);
                    }
                    if (
                        error.response.data.message ===
                        'Password does not meet the requirements (8-32 characters, upper and lower case, special character)'
                    ) {
                        setPasswordError(true);
                        setPasswordErrorMessage(error.response.data.message);
                    }
                    if (
                        error.response.data.message ===
                        'Email is already in use'
                    ) {
                        setEmailError(true);
                        setEmailErrorMessage(error.response.data.message);
                    }
                });
        }
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect
                sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
            />
            <MainContainer direction="column" justifyContent="space-between">
                <CustomCard variant="outlined">
                    <SitemarkIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">
                                Repeat password
                            </FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="repeat-password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="allowExtraEmails"
                                    color="primary"
                                />
                            }
                            label="I accept rules "
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                            disabled={isSubmiting}
                        >
                            {isSubmiting ? 'Signing up...' : 'Sign up'}
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>
                            or
                        </Typography>
                    </Divider>
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
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                href="/sign-in"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </CustomCard>
            </MainContainer>
        </AppTheme>
    );
}
