import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';

import Footer from '../elements/Footer';
import Navbar from '../elements/Navbar';
import AppTheme from '../theme/AppTheme';

export default function Blog(props: { disableCustomTheme?: boolean }) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />

            <Navbar />
            <Container
                maxWidth="lg"
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    my: 16,
                    gap: 4,
                }}
            ></Container>
            <Footer />
        </AppTheme>
    );
}
