import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { CircularProgress, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { MainContainer } from "../../customStyles/MainContainer";
import AppTheme from "../theme/AppTheme";
import authService from "../../services/authService";
import {styled} from "@mui/material/styles";

interface UserData {
    active: boolean;
    age: number;
    avatar: string | null;
    description: string | null;
    email: string;
    locked: boolean;
    username: string;
    uuid: string;
}

const StyledTextareaAutosize = styled("textarea")(({ theme }) => ({
    width: "100%",
    minHeight: "100px",
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    fontSize: "1rem",
    fontFamily: theme.typography.fontFamily,
    resize: "vertical",
    outline: "none",
}));

const UserProfile: React.FC<{ disableCustomTheme?: boolean }> = (props) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editField, setEditField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/profile`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                }
            );
            setUserData(response.data);
        } catch (err) {
            setError("Failed to fetch user data.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleEdit = (field: string, currentValue: string | null) => {
        setEditField(field);
        setEditValue(currentValue || "");
        setOpenDialog(true);
    };

    const handleSave = async () => {
        if (userData && editField) {
            try {
                const updatedUserData = {
                    ...userData,
                    [editField]: editValue,
                };
                console.log(updatedUserData)
                await axios.put(
                    `${process.env.REACT_APP_API_ADDRESS}/user/update`,
                    updatedUserData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    }
                );

                setUserData(updatedUserData);
                setOpenDialog(false);
            } catch (err) {
                setError("Failed to update user data.");
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{
                gap: 4,
                my: 8,
            }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "60vh",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : userData ? (
                        <Card
                            sx={{
                                width: "100%",
                                padding: 4,
                                gap: 2,
                            }}
                        >
                            <Avatar
                                src={userData.avatar || undefined}
                                alt={userData.username}
                                sx={{ width: 100, height: 100 }}
                            />
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography variant="h4" gutterBottom>
                                        {userData.username}
                                    </Typography>
                                    <IconButton onClick={() => handleEdit("username", userData?.username.toString())}>
                                        <EditIcon fontSize={"small"} />
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography variant="body1" color="text.secondary" gutterBottom>
                                        {userData.email}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Status:</strong> {userData.active ? "Active" : "Inactive"}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {userData.description || "No description available"}
                                    </Typography>
                                    <IconButton  onClick={() => handleEdit("description", userData.description)}>
                                        <EditIcon fontSize={"small"} />
                                    </IconButton>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Age:</strong> {userData.age > 0 ? userData.age : "Not provided"}
                                    </Typography>
                                    <IconButton onClick={() => handleEdit("age", userData.age.toString())}>
                                        <EditIcon fontSize={"small"} />
                                    </IconButton>
                                </Box>
                                <Button>Change password</Button>
                                <Button>Deactivate account</Button>
                                <Button>Delete account</Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography variant="h5">No user data found.</Typography>
                    )}
                </MainContainer>

                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    maxWidth={editField === "description" ? "lg" : "sm"} // Większy dla opisu, standardowy dla wieku
                    fullWidth={editField === "description"} // Wypełnia szerokość tylko dla opisu
                >
                    <DialogTitle sx={{ fontSize: "1.2rem" }}>Edit {editField}</DialogTitle>
                    <DialogContent
                        sx={{
                            minHeight: editField === "description" ? "200px" : "auto", // Większa wysokość dla opisu
                        }}
                    >
                        {editField === "description" ? (
                            <StyledTextareaAutosize
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                style={{
                                    width: "100%",
                                    minHeight: "200px", // Większe pole tekstowe
                                }}
                            />
                        ) : (
                            <TextField
                                fullWidth
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                variant="outlined"
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </AppTheme>
        </Container>
    );
};

export default UserProfile;
