import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "../theme/AppTheme";
import {alpha, styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";


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

const StyledBox = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme
        ? `rgba(${theme.palette.background.default} / 0.4)`
        : alpha(theme, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

const Account: React.FC = (props: { disableCustomTheme?: boolean }) => {
    return(
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme/>
                <DashboardContainer>
                    <StyledBox>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <h1>Account</h1>
                            </Grid>
                            <Grid size={4}>
                                <Avatar src="" />
                            </Grid>
                        </Grid>
                        <Button variant="outlined">Save</Button>
                    </StyledBox>
                </DashboardContainer>
            </AppTheme>
        </Container>
    )
}
export default Account