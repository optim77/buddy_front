import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../theme/AppTheme";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import MuiCard from "@mui/material/Card";
import axios from "axios";
import authService from "../../services/authService";
import {useNavigate} from "react-router-dom";

const DashboardContainer = styled(Stack)(({ theme }) => ({
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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '800px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const Create: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [tags, setTags] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);

            const images = files.filter(file => file.type.startsWith('image/'));
            const videos = files.filter(file => file.type.startsWith('video/'));
            const invalidFiles = files.filter(file => !file.type.startsWith('image/') && !file.type.startsWith('video/'));

            if (invalidFiles.length > 0) {
                setErrorMessage("Only images and videos are allowed.");
            } else {
                setErrorMessage(null);
            }

            if (images.length > 0) {
                setUploadedImage(images[0]);
            }
            if (videos.length > 0){
                setUploadedImage(videos[0]);
            }
        }
    };

    const validateInput = () => {
        if (!uploadedImage) {
            setErrorMessage("Please upload an image!");
            return false;
        }
        if (uploadedImage.size >= 100000000){
            setErrorMessage("Your file is to big, max size is 100Mb");
            return false;
        }
        if (!description || !tags) {
            setErrorMessage("Please fill in all fields!");
            return false;
        }
        return true;
    };

    const send = async () => {

        if (validateInput()) {

            if (authService.getToken()){
                await axios.post(`${process.env.REACT_APP_API_ADDRESS}/image/upload`, { file: uploadedImage, description: description, tags: tags, open: true }, {
                    headers: {
                        "Content-type": "multipart/form-data",
                        "Authorization": 'Bearer ' + authService.getToken(),

                    }
                }).then((res) => {
                    setIsSending(true);
                    if (res.status === 201){
                        navigate("/profile");
                    }else{
                        setErrorMessage(res.data);
                    }
                })
            }


        }
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <DashboardContainer>
                <Card variant="outlined">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create post
                    </Typography>

                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}

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
                            onChange={handleFileChange}
                            multiple
                        />
                    </Button>

                    {uploadedImage && (
                        <Typography variant="body1">
                            Selected Image: {uploadedImage.name}
                        </Typography>
                    )}

                    <Typography variant="h4" component="h1" gutterBottom>
                        Description
                    </Typography>
                    <TextField
                        placeholder="Description..."
                        multiline
                        rows={1}
                        maxRows={4}
                        onChange={event => setDescription(event.target.value)}
                    />

                    <Typography variant="h4" component="h1" gutterBottom>
                        Tags
                    </Typography>

                    <TextField
                        placeholder="Tags (comma-separated)"
                        multiline
                        rows={1}
                        maxRows={4}
                        onChange={event => setTags(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={send}
                        disabled={isSending}
                    >
                        Create
                    </Button>
                </Card>
            </DashboardContainer>
        </AppTheme>
    );
};

export default Create;
