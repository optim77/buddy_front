import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import {
    CircularProgress,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    IconButton,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import {
    StyledTextareaAutosizeEditProfile,
    VisuallyHiddenInput,
} from '../../customStyles/Element';
import { MainContainer } from '../../customStyles/MainContainer';
import authService from '../../services/authService';
import { buildMediaLink } from '../../utils/FormatMediaLink';
import { TikTok } from '../CustomIcons';
import AppTheme from '../theme/AppTheme';
import { IUserData } from './types/IUserData';
import { useChangePassword } from './hook/useChangePassword';
import { useDeleteAccount } from './hook/useDeleteAccount';

const UserProfile: React.FC<{ disableCustomTheme?: boolean }> = (props) => {
    const [userData, setUserData] = useState<IUserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [avatarError, setAvatarError] = useState<string | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const [lockError, setLockError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [editAvatar, setEditAvatar] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editField, setEditField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [deactivateStatus, setDeactivateStatus] = useState<boolean>(false);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

    const {
        changePasswordNewPassword,
        changePasswordNewPasswordConfirm,
        setChangePasswordNewPassword,
        setChangePasswordNewPasswordConfirm,
        setChangePasswordDialogOpen,
        changePasswordDialogOpen,
        changePasswordError,
        changePasswordMessage,
        changePassword,
    } = useChangePassword();

    const { deleteAccountError, deleteAccount } = useDeleteAccount();

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/profile`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                },
            );
            setUserData(response.data);
        } catch (err) {
            setError('Failed to fetch user data.');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleEdit = (field: string, currentValue: string | null) => {
        setEditField(field);
        setEditValue(currentValue || '');
        setOpenDialog(true);
    };

    useEffect(() => {
        fetchUserData();
        if (userData?.locked) {
            setDeactivateStatus(userData.locked);
        }
    }, [fetchUserData]);

    const handleSave = async () => {
        if (editField === 'description' && editValue.length > 1000) {
            setEditError('Description cannot be more than 1000 characters');
            return;
        }
        if (userData && editField) {
            try {
                const updatedUserData = {
                    ...userData,
                    [editField]: editValue,
                };
                await axios
                    .put(
                        `${process.env.REACT_APP_API_ADDRESS}/user/update`,
                        updatedUserData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authService.getToken()}`,
                            },
                        },
                    )
                    .then((res) => {
                        if (res.status === 200 && editField === 'username') {
                            authService.logout();
                        }
                    });

                setUserData(updatedUserData);
                setOpenDialog(false);
            } catch (err) {
                setEditError('Failed to update user data.');
            }
        }
    };

    const deactivateAccount = async () => {
        try {
            await axios
                .post(
                    `${process.env.REACT_APP_API_ADDRESS}/user/lock`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        if (userData?.locked && userData.locked) {
                            setMessage('Deactivation account successfully!');
                        } else {
                            setMessage('Reactivation account successfully!');
                        }
                        document.location.reload();
                        setDeactivateDialogOpen(false);
                        setDeactivateStatus(!deactivateStatus);
                    } else {
                        setLockError('Something went wrong');
                    }
                });
        } catch (err) {
            setLockError('Something went wrong');
        }
    };

    const changeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);

            const images = files.filter((file) =>
                file.type.startsWith('image/'),
            );
            const invalidFiles = files.filter(
                (file) => !file.type.startsWith('image/'),
            );

            if (invalidFiles.length > 0) {
                setAvatarError('Only images are allowed.');
            } else {
                setAvatarError(null);
            }

            if (images.length > 0) {
                setUploadedImage(images[0]);
            }
        }
    };

    const handleChangeAvatar = async () => {
        if (!uploadedImage) {
            setAvatarError('Please upload an image!');
            return false;
        }
        if (uploadedImage.size >= 5000000) {
            setAvatarError('Your file is too big, max size is 5Mb');
            return false;
        }
        try {
            const formData = new FormData();
            formData.append('file', uploadedImage);
            await axios
                .put(
                    `${process.env.REACT_APP_API_ADDRESS}/user/change_avatar`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        setEditAvatar(false);
                        document.location.reload();
                    }
                });
        } catch (err) {
            setAvatarError('Something went wrong');
        }
    };

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{
                mt: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '60vh',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : userData ? (
                        <Card
                            sx={{
                                width: '100%',
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            {message ? (
                                <Typography color="success">
                                    {message}
                                </Typography>
                            ) : null}
                            {changePasswordMessage ? (
                                <Typography color="success">
                                    {changePasswordMessage}
                                </Typography>
                            ) : null}

                            <Avatar
                                src={
                                    userData.avatar
                                        ? buildMediaLink(userData.avatar)
                                        : undefined
                                }
                                alt={userData.username}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': {
                                        boxShadow:
                                            '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                        transform: 'scale(1.05)',
                                    },
                                }}
                                onClick={() => setEditAvatar(true)}
                            />
                            <CardContent
                                sx={{ textAlign: 'center', width: '100%' }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Typography variant="h4" gutterBottom>
                                        {userData.username}
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            handleEdit(
                                                'username',
                                                userData?.username.toString(),
                                            )
                                        }
                                    >
                                        <EditIcon fontSize={'small'} />
                                    </IconButton>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {userData.email}
                                    </Typography>
                                </Box>
                                {userData.locked ? (
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                            width: '100%',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {userData.locked ? (
                                                <Typography color={'error'}>
                                                    Your account is locked
                                                </Typography>
                                            ) : (
                                                'Unlocked'
                                            )}
                                        </Typography>
                                    </Box>
                                ) : null}

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Description:{' '}
                                        {userData.description ||
                                            'No description available'}
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            handleEdit(
                                                'description',
                                                userData.description,
                                            )
                                        }
                                    >
                                        <EditIcon fontSize={'small'} />
                                    </IconButton>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        <TikTok />
                                        {userData.socialTikTok || ''}
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            handleEdit(
                                                'description',
                                                userData.description,
                                            )
                                        }
                                    >
                                        <EditIcon fontSize={'small'} />
                                    </IconButton>
                                </Box>
                                <hr />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Link to="/plan/create">
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth
                                            sx={{
                                                textAlign: 'center',
                                                width: '100%',
                                                marginTop: '10px',
                                            }}
                                        >
                                            Create plan
                                        </Button>
                                    </Link>
                                </Box>
                                <hr />
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                    to="/sessions"
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{
                                            textAlign: 'center',
                                            width: '100%',
                                            marginTop: '10px',
                                        }}
                                    >
                                        Your sessions
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        textAlign: 'center',
                                        width: '100%',
                                        marginTop: '10px',
                                    }}
                                    onClick={() =>
                                        setChangePasswordDialogOpen(true)
                                    }
                                >
                                    Change password
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    sx={{
                                        textAlign: 'center',
                                        width: '100%',
                                        marginTop: '10px',
                                    }}
                                    onClick={() =>
                                        setDeactivateDialogOpen(true)
                                    }
                                >
                                    {userData?.locked && userData.locked
                                        ? 'Active account'
                                        : 'Deactivate account'}
                                </Button>

                                <Button
                                    variant="text"
                                    color="error"
                                    fullWidth
                                    sx={{
                                        textAlign: 'center',
                                        width: '100%',
                                        marginTop: '10px',
                                    }}
                                    onClick={() => setDeleteDialogOpen(true)}
                                >
                                    Delete account
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography variant="h5">
                            No user data found.
                        </Typography>
                    )}
                </MainContainer>

                <Dialog
                    open={openDialog}
                    onClose={() => {
                        setOpenDialog(false);
                        setEditError('');
                    }}
                    maxWidth={editField === 'description' ? 'lg' : 'sm'}
                    fullWidth={editField === 'description'}
                >
                    <DialogTitle sx={{ fontSize: '1.2rem' }}>
                        Edit {editField}
                    </DialogTitle>
                    {editError ? (
                        <Typography color={'error'}>{editError}</Typography>
                    ) : null}
                    <DialogContent
                        sx={{
                            minHeight:
                                editField === 'description' ? '200px' : 'auto',
                        }}
                    >
                        {editField === 'username' ? (
                            <Typography sx={{ padding: '10px' }}>
                                After changing your username, you will be
                                required to log in again!
                            </Typography>
                        ) : null}
                        {editField === 'description' ? (
                            <StyledTextareaAutosizeEditProfile
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                style={{
                                    width: '100%',
                                    minHeight: '200px',
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
                        <Button onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={changePasswordDialogOpen}
                    onClose={() => setChangePasswordDialogOpen(false)}
                    fullWidth
                >
                    <DialogTitle>Change Password</DialogTitle>
                    {changePasswordError ? (
                        <Typography color="error">
                            {changePasswordError}
                        </Typography>
                    ) : null}
                    <DialogContent>
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            value={changePasswordNewPassword}
                            onChange={(e) =>
                                setChangePasswordNewPassword(e.target.value)
                            }
                            sx={{ my: 4 }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            value={changePasswordNewPasswordConfirm}
                            onChange={(e) =>
                                setChangePasswordNewPasswordConfirm(
                                    e.target.value,
                                )
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setChangePasswordDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => changePassword()}
                            color="primary"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    fullWidth
                >
                    <DialogTitle>Delete account</DialogTitle>
                    {deleteAccountError ? (
                        <Typography color="error">
                            {deleteAccountError}
                        </Typography>
                    ) : null}
                    <DialogContent>
                        <Typography>Are you sure to delete account?</Typography>
                        <br />
                        <Typography>
                            After deletion we will keep your data for 3 months
                            after that time it will be deleted, your account
                            will not be visible from the moment you delete your
                            account
                        </Typography>
                        <br />
                        <Typography>
                            Once you delete your account, you will be logged out
                            and will no longer have access to it
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color={'success'}
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => deleteAccount()}>Delete</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={deactivateDialogOpen}
                    onClose={() => setDeactivateDialogOpen(false)}
                    fullWidth
                >
                    <DialogTitle>
                        {userData?.locked && userData.locked
                            ? 'Active account'
                            : 'Deactivate account'}
                    </DialogTitle>
                    {lockError ? (
                        <Typography color="error">{lockError}</Typography>
                    ) : null}
                    <DialogContent>
                        <Typography>
                            Are you sure you want to{' '}
                            {userData?.locked && userData.locked
                                ? 'active '
                                : 'deactivate '}{' '}
                            the account?
                        </Typography>
                        <br />
                        <Typography>
                            {userData?.locked && userData.locked
                                ? 'After reactivation it will be possible to search for your account and your posts will become viewable'
                                : 'After deactivation, it will not be possible to search for your account or see your posts, your account will remain active'}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color={'success'}
                            onClick={() => setDeactivateDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => deactivateAccount()}>
                            {userData?.locked && userData.locked
                                ? 'Active account'
                                : 'Deactivate account'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={editAvatar}
                    onClose={() => {
                        setEditAvatar(false);
                        setAvatarError(null);
                    }}
                    fullWidth
                >
                    <DialogTitle>Edit avatar</DialogTitle>
                    {avatarError ? (
                        <Typography color="error">{avatarError}</Typography>
                    ) : null}
                    <DialogContent>
                        <Typography sx={{ mb: 2 }}>
                            Your current avatar will be replaced with an
                            uploaded one.
                        </Typography>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Select a file to upload:
                            </Typography>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
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
                        <Button
                            color={'success'}
                            onClick={() => setEditAvatar(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleChangeAvatar()}
                            color="primary"
                        >
                            Change avatar
                        </Button>
                    </DialogActions>
                </Dialog>
            </AppTheme>
        </Container>
    );
};

export default UserProfile;
