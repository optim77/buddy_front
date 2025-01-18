import React, { useRef, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../theme/AppTheme";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Backdrop, CircularProgress, List, ListItem, TextField, Typography} from "@mui/material";
import axios from "axios";
import authService from "../../services/authService";
import {useNavigate} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import {MainContainer} from "../../customStyles/MainContainer";
import {
    StyledCard, StyledListItemText,
    StyledTextareaAutosize,
    SuggestionsContainer,
    VisuallyHiddenInput
} from "../../customStyles/Element";




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
        setIsSending(true);
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
            if (fetchedTags.length > 0){
                setShowSuggestions(true);
            }

        } catch (error) {
            console.error("Error fetching tags:", error);
            setSuggestedTags([]);
            setShowSuggestions(false);
        }
    };

    const addTag = (newTag: string) => {
        setTags((prevTags) => {
            let tagsArray = prevTags ? prevTags.split(',').map(t => t.trim()) : [];

            if (tagsArray.length > 0) {
                tagsArray.pop();
            }

            if (tagsArray.includes(newTag)) {
                setErrorMessage("This tag is already added.");
                return prevTags;
            }

            if (tagsArray.length >= 20) {
                setErrorMessage("You can only add up to 20 tags.");
                return prevTags;
            }

            return [...tagsArray, newTag].join(", ") + ", ";
        });
        tagsInputRef.current?.focus();
    };


    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <MainContainer>
                <StyledCard variant="outlined">
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

                                } else {
                                    setShowSuggestions(false);
                                }
                            }}
                            fullWidth
                            inputRef={tagsInputRef}
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
                </StyledCard>
                <Backdrop
                    open={isSending}
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </MainContainer>
        </AppTheme>
    );
};

export default Create;
