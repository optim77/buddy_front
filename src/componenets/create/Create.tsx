import React, {useEffect, useState} from 'react';
import {
    TextField,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    Tooltip,
    List,
    ListItem
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    StyledTextareaAutosize,
    SuggestionsContainer,
    StyledListItemText,
    VisuallyHiddenInput
} from '../../customStyles/Element';
import useFileUpload from './hook/useFileUpload';
import useTags from './hook/useTags';
import usePostCreation from './hook/usePostCreation';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import CreateLayout from "../layout/CreateLayout";

const Create: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const {uploadedFile, handleFileChange} = useFileUpload();
    const {tags, setTags, suggestedTags, showSuggestions, findTags, addTag, tagsInputRef} = useTags();
    const [description, setDescription] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const {isSending, errorMessage, send} = usePostCreation(uploadedFile, description, tags, isOpen);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authService.getBuddyUser()) {
            navigate('/sing-in');
        }
    }, []);

    return (
        <CreateLayout>
            <Box onSubmit={send}>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon/>}
                >
                    Upload file
                    <VisuallyHiddenInput
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        multiple
                    />
                </Button>
                {uploadedFile && (
                    <Typography>
                        Selected File: {uploadedFile.name}
                    </Typography>
                )}

                <Typography variant="h4">Description</Typography>
                <StyledTextareaAutosize
                    minRows={4}
                    placeholder="Description..."
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Typography variant="h4">Tags</Typography>
                <div style={{position: 'relative'}}>
                    <TextField
                        placeholder="Tags (comma-separated)"
                        value={tags}
                        onChange={(e) => {
                            setTags(e.target.value);
                            const lastTag = e.target.value
                                .split(',')
                                .pop()
                                ?.trim();
                            if (lastTag) findTags(lastTag);
                        }}
                        fullWidth
                        inputRef={tagsInputRef}
                    />
                    {showSuggestions && (
                        <SuggestionsContainer>
                            <List>
                                {suggestedTags.map((tag) => (
                                    <ListItem
                                        key={tag}
                                        sx={{cursor: 'pointer'}}
                                        onClick={() => addTag(tag)}
                                    >
                                        <StyledListItemText>
                                            {tag}
                                        </StyledListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </SuggestionsContainer>
                    )}
                </div>

                <Tooltip title="Make your post visible to everyone." arrow>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isOpen}
                                onChange={() => setIsOpen((prev) => !prev)}
                            />
                        }
                        label="Open"
                    />
                </Tooltip>

                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isSending}
                >
                    Create
                </Button>
            </Box>
        </CreateLayout>
    );
};

export default Create;
