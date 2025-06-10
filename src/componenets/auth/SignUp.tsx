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
import {useAuthValidation} from "./hook/useAuthValidation";
import {useAuth} from "./hook/useAuth";
import AuthLayout from "../layout/AuthLayout";
import {useSignUp} from "./hook/useSignUp";
import {SocialSignUpButtons} from "./SocialSignUpButtons";
import FormField from "../form/FormField";

export default function SignUp() {

    const { handleSubmit, isSubmitting} = useSignUp();


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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Signing up...' : 'Sign up'}
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
                <SocialSignUpButtons />
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?
                    <Link
                        href="/sign-in"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </AuthLayout>



    );
}
