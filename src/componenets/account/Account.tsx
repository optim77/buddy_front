import React, {useEffect, useState, useCallback} from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {
    CircularProgress,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {MainContainer} from "../../customStyles/MainContainer";
import AppTheme from "../theme/AppTheme";
import authService from "../../services/authService";
import {styled} from "@mui/material/styles";
import {isValidPassword} from "../../utils/ValidPassword";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {VisuallyHiddenInput} from "../../customStyles/Element";

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

const StyledTextareaAutosize = styled("textarea")(({theme}) => ({
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
    const [avatarError, setAvatarError] = useState<string | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [lockError, setLockError] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [editAvatar, setEditAvatar] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editField, setEditField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>("");
    const [deactivateStatus, setDeactivateStatus] = useState<boolean>(false);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

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
        if (editField === 'description' && editValue.length > 1000) {
            setEditError("Description cannot be more than 1000 characters");
            return;
        }
        if (userData && editField) {
            try {
                const updatedUserData = {
                    ...userData,
                    [editField]: editValue,
                };
                await axios.put(
                    `${process.env.REACT_APP_API_ADDRESS}/user/update`,
                    updatedUserData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    }
                ).then((res) => {
                    if (res.status === 200 && editField === 'username') {
                        authService.logout()
                    }
                })

                setUserData(updatedUserData);
                setOpenDialog(false);
            } catch (err) {
                setEditError("Failed to update user data.");
            }
        }
    };

    const changePassword = async () => {

        if (confirmPassword !== newPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        if (confirmPassword.length < 6 && newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        }
        if (isValidPassword(newPassword)) {
            setPasswordError("Password does not meet the requirements (8-32 characters, upper and lower case, special character)");
            return;
        }
        try {
            await axios.put(`${process.env.REACT_APP_API_ADDRESS}/user/change_password`,
                newPassword,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authService.getToken()}`,
                    }
                }
            ).then((res) => {
                if (res.status === 200) {
                    setPasswordDialogOpen(false);
                    setMessage("Password changed successfully!");
                } else {
                    setPasswordError("Something went wrong");
                }
            })
        } catch (error) {
            setPasswordError("Error occurred while trying to change your password");
        }

    }

    const deleteAccount = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_ADDRESS}/user/delete`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }).then((res) => {
                if (res.status === 200) {
                    authService.logout();
                }
                setDeleteError("Error occurred while deleting account")

            })
        } catch (error) {
            setDeleteError("Error occurred while deleting account");
        }
    }

    const deactivateAccount = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_ADDRESS}/user/lock`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }).then((res) => {
                if (res.status === 200) {
                    if (userData?.locked && userData.locked) {
                        setMessage("Deactivation account successfully!");
                    } else {
                        setMessage("Reactivation account successfully!");
                    }
                    document.location.reload();
                    setDeactivateDialogOpen(false);
                    setDeactivateStatus(!deactivateStatus);
                } else {
                    setLockError("Something went wrong");
                }
            })
        } catch (err) {
            setLockError("Something went wrong");
        }
    }

    const changeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);

            const images = files.filter(file => file.type.startsWith('image/'));
            const invalidFiles = files.filter(file => !file.type.startsWith('image/') && !file.type.startsWith('video/'));

            if (invalidFiles.length > 0) {
                setAvatarError("Only images and videos are allowed.");
            } else {
                setAvatarError(null);
            }

            if (images.length > 0) {
                setUploadedImage(images[0]);
            }
        }
    }
    const handleChangeAvatar = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_ADDRESS}/user/change_avatar`, uploadedImage, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            })
        } catch (err) {
            setAvatarError("Something went wrong");
        }
    }

    useEffect(() => {
        fetchUserData();
        if (userData?.locked) {
            setDeactivateStatus(userData.locked)
        }
    }, [fetchUserData]);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{
                mt: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme/>
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
                            <CircularProgress/>
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : userData ? (
                        <Card
                            sx={{
                                width: "100%",
                                p: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            {message ? <Typography color="success">{message}</Typography> : null}

                            <Avatar
                                src={userData.avatar || undefined}
                                alt={userData.username}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    cursor: "pointer",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                        transform: "scale(1.05)",
                                    },
                                }}
                                onClick={() => setEditAvatar(true)}
                            />
                            <CardContent sx={{textAlign: "center", width: "100%"}}>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 2
                                }}>
                                    <Typography variant="h4" gutterBottom>
                                        {userData.username}
                                    </Typography>
                                    <IconButton onClick={() => handleEdit("username", userData?.username.toString())}>
                                        <EditIcon fontSize={"small"}/>
                                    </IconButton>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 2
                                }}>
                                    <Typography variant="body1" color="text.secondary" gutterBottom>
                                        {userData.email}
                                    </Typography>
                                </Box>
                                {userData.locked ? (
                                        <Box sx={{textAlign: "center", width: "100%"}}>
                                            <Typography variant="body2" color="text.secondary">
                                                {userData.locked ? <Typography color={"error"}>Your account is
                                                    locked</Typography> : "Unlocked"}
                                            </Typography>
                                        </Box>
                                    ) :
                                    null}

                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 2
                                }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Description: {userData.description || "No description available"}
                                    </Typography>
                                    <IconButton onClick={() => handleEdit("description", userData.description)}>
                                        <EditIcon fontSize={"small"}/>
                                    </IconButton>
                                </Box>

                                <Button variant="contained"
                                        color="primary"
                                        fullWidth sx={{textAlign: "center", width: "100%", marginTop: '10px'}}
                                        onClick={() => setPasswordDialogOpen(true)}>
                                    Change password
                                </Button>

                                <Button variant="outlined"
                                        color="secondary"
                                        fullWidth sx={{textAlign: "center", width: "100%", marginTop: '10px'}}
                                        onClick={() => setDeactivateDialogOpen(true)}>
                                    {userData?.locked && userData.locked ? 'Active account' : 'Deactivate account'}
                                </Button>

                                <Button variant="text"
                                        color="error"
                                        fullWidth
                                        sx={{textAlign: "center", width: "100%", marginTop: '10px'}}
                                        onClick={() => setDeleteDialogOpen(true)}>
                                    Delete account
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography variant="h5">No user data found.</Typography>
                    )}
                </MainContainer>

                <Dialog
                    open={openDialog}
                    onClose={() => {
                        setOpenDialog(false);
                        setEditError("");
                    }
                    }
                    maxWidth={editField === "description" ? "lg" : "sm"}
                    fullWidth={editField === "description"}
                >
                    <DialogTitle sx={{fontSize: "1.2rem"}}>Edit {editField}</DialogTitle>
                    {editError ? (<Typography color={"error"}>{editError}</Typography>) : null}
                    <DialogContent
                        sx={{
                            minHeight: editField === "description" ? "200px" : "auto",
                        }}
                    >
                        {editField === 'username' ?
                            <Typography sx={{padding: '10px'}}>After changing your username, you will be required to log
                                in again!</Typography>
                            : null}
                        {editField === "description" ? (
                            <StyledTextareaAutosize
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                style={{
                                    width: "100%",
                                    minHeight: "200px",
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
                <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} fullWidth>
                    <DialogTitle>Change Password</DialogTitle>
                    {passwordError ? <Typography color="error">{passwordError}</Typography> : null}
                    <DialogContent>
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{my: 4}}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => changePassword()} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} fullWidth>
                    <DialogTitle>Delete account</DialogTitle>
                    {deleteError ? <Typography color="error">{deleteError}</Typography> : null}
                    <DialogContent>
                        <Typography>
                            Are you sure to delete account?
                        </Typography>
                        <br/>
                        <Typography>
                            After deletion we will keep your data for 3 months after that time it will be deleted, your
                            account will not be visible from the moment you delete your account
                        </Typography>
                        <br/>
                        <Typography>
                            Once you delete your account, you will be logged out and will no longer have access to it
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color={"success"} onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => deleteAccount()}>Delete</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={deactivateDialogOpen} onClose={() => setDeactivateDialogOpen(false)} fullWidth>
                    <DialogTitle>{userData?.locked && userData.locked ? 'Active account' : 'Deactivate account'}</DialogTitle>
                    {lockError ? <Typography color="error">{lockError}</Typography> : null}
                    <DialogContent>
                        <Typography>
                            Are you sure you want
                            to {userData?.locked && userData.locked ? 'active ' : 'deactivate '} the account?
                        </Typography>
                        <br/>
                        <Typography>
                            {userData?.locked && userData.locked ? 'After reactivation it will be possible to search for your account and your posts will become viewable' :
                                'After deactivation, it will not be possible to search for your account or see your posts, your account will remain active'
                            }
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color={"success"} onClick={() => setDeactivateDialogOpen(false)}>Cancel</Button>
                        <Button
                            onClick={() => deactivateAccount()}>{userData?.locked && userData.locked ? 'Active account' : 'Deactivate account'}</Button>
                    </DialogActions>

                </Dialog>

                <Dialog open={editAvatar} onClose={() => setEditAvatar(false)} fullWidth>
                    <DialogTitle>Edit avatar</DialogTitle>
                    {avatarError ? <Typography color="error">{avatarError}</Typography> : null}
                    <DialogContent>
                        <Typography sx={{mb: 2}}>
                            Your current avatar will be replaced with an uploaded one.
                        </Typography>
                        <Box>
                            <Typography variant="body2" sx={{mb: 1}}>
                                Select a file to upload:
                            </Typography>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon/>}
                            >
                                Upload file
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={changeAvatar}
                                    multiple
                                />
                            </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button color={"success"} onClick={() => setEditAvatar(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => handleChangeAvatar()} color="primary">
                            Change avatar
                        </Button>
                    </DialogActions>
                </Dialog>


            </AppTheme>
        </Container>
    );
};

export default UserProfile;
