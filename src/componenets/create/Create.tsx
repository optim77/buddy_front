import React, { useState } from "react";
import {
    Backdrop,
    CircularProgress,
    TextField,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    Tooltip,
    CssBaseline,
    List,
    ListItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AppTheme from "../theme/AppTheme";
import { MainContainer } from "../../customStyles/MainContainer";
import { StyledCard, StyledTextareaAutosize, SuggestionsContainer, StyledListItemText, VisuallyHiddenInput } from "../../customStyles/Element";
import useFileUpload from "../../hooks/useFileUpload";
import useTags from "../../hooks/useTags";
import usePostCreation from "../../hooks/usePostCreation";

const Create: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const { uploadedFile, errorMessage: fileError, handleFileChange } = useFileUpload();
    const { tags, setTags, suggestedTags, showSuggestions, findTags, addTag, tagsInputRef } = useTags();
    const [description, setDescription] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const { isSending, errorMessage, send } = usePostCreation(uploadedFile, description, tags, isOpen);

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <MainContainer>
                <StyledCard variant="outlined">
                    <Typography variant="h4">Create post</Typography>
                    {fileError && <Typography color="error">{fileError}</Typography>}
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" accept="image/*,video/*" onChange={handleFileChange} multiple />
                    </Button>
                    {uploadedFile && <Typography>Selected File: {uploadedFile.name}</Typography>}

                    <Typography variant="h4">Description</Typography>
                    <StyledTextareaAutosize minRows={4} placeholder="Description..." onChange={(e) => setDescription(e.target.value)} />

                    <Typography variant="h4">Tags</Typography>
                    <div style={{ position: "relative" }}>
                        <TextField
                            placeholder="Tags (comma-separated)"
                            value={tags}
                            onChange={(e) => {
                                setTags(e.target.value);
                                const lastTag = e.target.value.split(",").pop()?.trim();
                                if (lastTag) findTags(lastTag);
                            }}
                            fullWidth
                            inputRef={tagsInputRef}
                        />
                        {showSuggestions && (
                            <SuggestionsContainer>
                                <List>
                                    {suggestedTags.map((tag) => (
                                        <ListItem key={tag} sx={{ cursor: "pointer" }} onClick={() => addTag(tag)}>
                                            <StyledListItemText>{tag}</StyledListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </SuggestionsContainer>
                        )}
                    </div>

                    <Tooltip title="Make your post visible to everyone." arrow>
                        <FormControlLabel control={<Checkbox checked={isOpen} onChange={() => setIsOpen((prev) => !prev)} />} label="Open" />
                    </Tooltip>

                    <Button variant="contained" fullWidth onClick={send} disabled={isSending}>Create</Button>
                </StyledCard>
                <Backdrop open={isSending}><CircularProgress /></Backdrop>
            </MainContainer>
        </AppTheme>
    );
};

export default Create;
