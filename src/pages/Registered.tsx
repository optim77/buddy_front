import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { SitemarkIcon } from '../componenets/CustomIcons';
import AppTheme from '../componenets/theme/AppTheme';
import ColorModeSelect from '../componenets/theme/ColorModeSelect';
import { MainContainer } from '../customStyles/MainContainer';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export default function Registered(props: { disableCustomTheme?: boolean }) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect
                sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
            />
            <MainContainer direction="column" justifyContent="center">
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                            textAlign: 'center',
                        }}
                    >
                        Registration Successful!
                    </Typography>
                    <Typography
                        component="p"
                        variant="body1"
                        sx={{ textAlign: 'center', color: 'text.secondary' }}
                    >
                        Thank you for registering. Verify your email and then
                        you can now sign in to your account &nbsp;
                        <Link to="/sign-in">Sign in</Link>
                    </Typography>
                </Card>
            </MainContainer>
        </AppTheme>
    );
}
