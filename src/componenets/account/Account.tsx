import React, {useCallback, useEffect, useState} from "react";
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
import {MainContainer} from "../../customStyles/MainContainer";
import axios from "axios";
import authService from "../../services/authService";


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

    const [profile, setProfile] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/profile`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + (authService.getToken() || ""),
                    },
                }
            );

        } catch (error) {
            setError("Error fetching videos");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, []);


    return(
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme/>
                <MainContainer>
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
                </MainContainer>
            </AppTheme>
        </Container>
    )
}
export default Account