import React, {useRef, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../theme/AppTheme";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {List, ListItem, ListItemText, TextareaAutosize, TextField, Typography} from "@mui/material";
import MuiCard from "@mui/material/Card";
import axios from "axios";
import authService from "../../services/authService";
import {useNavigate} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";

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

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "16.5px 14px",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    boxSizing: "border-box",
    background: "none",
    width: "100%",
    margin: 0,
    resize: "none",
    "-webkit-tap-highlight-color": "transparent",
    "&:focus": {
        outline: "none",
        borderColor: theme.palette.primary.main,
    },
    "&:disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
    },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    padding: "16.5px 14px",
}));

const SuggestionsContainer = styled("div")(({ theme }) => ({
    position: "absolute",
    zIndex: 10,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    width: "100%",
    maxHeight: "150px",
    overflowY: "auto",
}));


const Create: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [tags, setTags] = useState<string | null>(null);
    const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSending, setIsSending] = useState(false);

    const navigate = useNavigate();
    const tagsInputRef = useRef<HTMLInputElement>(null);

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
        if (!description) {
            setErrorMessage("Please fill in all fields!");
            return false;
        }
        return true;
    };

    const send = async () => {
        if (validateInput()) {
            const formData = new FormData();
            formData.append("file", uploadedImage as Blob);
            formData.append("description", description as string);
            formData.append("open", isOpen ? "true" : "false");
            const tagsArray = tags
                ? tags.split(",")
                    .map(tag => tag.trim())
                    .filter(tag => tag.length > 0)
                : [];
            tagsArray.forEach(tag => formData.append("tagSet", tag));

            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_ADDRESS}/image/upload`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    }
                );

                if (response.status === 201) {
                    navigate("/profile");
                } else {
                    setErrorMessage("An error occurred: " + response.data.message);
                }
            } catch (error: any) {
                setErrorMessage(error.response?.data?.message || "An error occurred");
            }
        }
    };

    const findTags = async (input: string) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/tags/${input}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const fetchedTags = response.data.content.map(
                (tag: { name: string }) => tag.name
            ).slice(0,5);

            setSuggestedTags(fetchedTags);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching tags:", error);
            setSuggestedTags([]);
            setShowSuggestions(false);
        }
    };

    const addTag = (newTag: string) => {
        setTags((prevTags) => {
            let tagsArray = prevTags ? prevTags.split(',').map(t => t.trim()) : [];

            // Usuń ostatni, niedokończony tag
            if (tagsArray.length > 0) {
                tagsArray.pop();
            }

            // Sprawdź, czy tag już istnieje
            if (tagsArray.includes(newTag)) {
                setErrorMessage("This tag is already added.");
                return prevTags;
            }

            // Sprawdź, czy liczba tagów nie przekracza 20
            if (tagsArray.length >= 20) {
                setErrorMessage("You can only add up to 20 tags.");
                return prevTags;
            }

            // Dodaj nowy tag i zwróć nową listę jako string
            return [...tagsArray, newTag].join(", ") + ", ";
        });
        tagsInputRef.current?.focus();
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
                            Selected File: {uploadedImage.name}
                        </Typography>
                    )}

                    <Typography variant="h4" component="h1" gutterBottom>
                        Description
                    </Typography>
                    <StyledTextareaAutosize
                        minRows={4}
                        placeholder="Description..."
                        onChange={(event) => setDescription(event.target.value)}
                    />

                    <Typography variant="h4" component="h1" gutterBottom>
                        Tags
                    </Typography>

                    <div style={{position: "relative"}}>
                        <TextField
                            placeholder="Tags (comma-separated)"
                            multiline
                            rows={1}
                            maxRows={4}
                            value={tags}
                            onChange={(event) => {
                                const input = event.target.value;
                                const tagsArray = input.split(',').map(t => t.trim());

                                if (tagsArray.length > 20) {
                                    setErrorMessage("You can only add up to 20 tags.");
                                    return;
                                }

                                setTags(input);

                                const lastTag = tagsArray.pop()?.trim() || "";
                                if (lastTag.length > 0) {
                                    findTags(lastTag);
                                    setShowSuggestions(true);
                                } else {
                                    setShowSuggestions(false);
                                }
                            }}
                            fullWidth
                            inputRef={tagsInputRef} // Referencja do focusa
                        />

                        {showSuggestions && (
                            <SuggestionsContainer>
                                <List>
                                    {suggestedTags.map((tag, index) => (
                                        <ListItem
                                            component="div"
                                            key={index}
                                            onClick={() => {
                                                addTag(tag);
                                                setShowSuggestions(false);
                                            }}
                                            sx={{cursor: "pointer"}}
                                        >
                                            <StyledListItemText>{tag}</StyledListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </SuggestionsContainer>
                        )}
                    </div>
                    <div>
                        <Tooltip
                            title="Check this option to make your post visible to everyone. If unchecked, the post will remain private."
                            arrow
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isOpen}
                                        onChange={(event) => setIsOpen(event.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Open"
                            />
                        </Tooltip>
                    </div>
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
