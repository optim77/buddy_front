import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React, {useEffect} from "react";
import AppTheme from "../theme/AppTheme";
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import axios from "axios";
import exploreService from "./exploreService";
import authService from "../../services/authService";


const DashboardContainer = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const Explore: React.FC = (props: { disableCustomTheme?: boolean }) => {

    useEffect(() => {
        exploreService.fetch(authService.getToken());
    }, []);

    return(
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme/>
                <DashboardContainer>

                    Explore
                </DashboardContainer>
            </AppTheme>
        </Container>




    )
}
export default Explore