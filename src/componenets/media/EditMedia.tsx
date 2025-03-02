import { List, ListItem, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    StyledCard,
    StyledListItemText,
    StyledTextareaAutosize,
    SuggestionsContainer,
} from '../../customStyles/Element';
import { MainContainer } from '../../customStyles/MainContainer';
import authService from '../../services/authService';
import AppTheme from '../theme/AppTheme';

const EditMedia: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [tags, setTags] = useState<string | null>(null);
    const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSending, setIsSending] = useState(false);
    const { imageId } = useParams<{ imageId: string }>();
    const navigate = useNavigate();
    const tagsInputRef = useRef<HTMLInputElement>(null);
    const [media, setMedia] = useState<any>(null);

    const fetchMedia = async (imageId: string) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/image/` + imageId,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authService.getToken(),
                    },
                },
            );
            return response.data;
        } catch (err) {
            throw new Error('Error fetching media');
        }
    };

    useEffect(() => {
        if (imageId) {
            fetchMedia(imageId)
                .then((data) => {
                    setMedia(data);
                    if (data.userId !== authService.getBuddyUser()) {
                        navigate('/');
                    }
                    setDescription(data.description);
                    setTags(data.tags);
                    setIsOpen(data.open);
                })
                .catch(() => {
                    setErrorMessage('Failed to load media');
                });
        }
    }, [imageId]);

    const send = async () => {
        setIsSending(true);
        const formData = new FormData();
        formData.append('description', description as string);
        formData.append('open', isOpen ? 'true' : 'false');
        const tagsArray = tags
            ? tags
                  .split(',')
                  .map((tag) => tag.trim())
                  .filter((tag) => tag.length > 0)
            : [];
        tagsArray.forEach((tag) => formData.append('tagSet', tag));

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_ADDRESS}/image/update/` +
                    media.imageId,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                },
            );

            if (response.status === 201) {
                navigate('/profile');
            } else {
                setErrorMessage('An error occurred: ' + response.data.message);
            }
        } catch (error: any) {
            setErrorMessage(
                error.response?.data?.message || 'An error occurred',
            );
        }
    };

    const findTags = async (input: string) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/tags/${input}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const fetchedTags = response.data.content
                .map((tag: { name: string }) => tag.name)
                .slice(0, 5);
            setSuggestedTags(fetchedTags);
            if (fetchedTags.length > 0) {
                setShowSuggestions(true);
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
            setSuggestedTags([]);
            setShowSuggestions(false);
        }
    };

    const addTag = (newTag: string) => {
        setTags((prevTags) => {
            const tagsArray = prevTags
                ? prevTags.split(',').map((t) => t.trim())
                : [];

            if (tagsArray.length > 0) {
                tagsArray.pop();
            }

            if (tagsArray.includes(newTag)) {
                setErrorMessage('This tag is already added.');
                return prevTags;
            }

            if (tagsArray.length >= 20) {
                setErrorMessage('You can only add up to 20 tags.');
                return prevTags;
            }

            return [...tagsArray, newTag].join(', ') + ', ';
        });
        tagsInputRef.current?.focus();
    };

    const deleteMedia = async () => {
        try {
            await axios
                .post(
                    `${process.env.REACT_APP_API_ADDRESS}/image/delete/` +
                        media.imageId,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authService.getToken()}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        navigate('/profile');
                    } else {
                        setErrorMessage('Error occurred while deleting media');
                    }
                });
        } catch (error) {
            setErrorMessage('Error occurred while deleting media');
        }
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <MainContainer>
                <StyledCard variant="outlined">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Update post
                    </Typography>

                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}

                    <Typography variant="h4" component="h1" gutterBottom>
                        Description
                    </Typography>
                    <StyledTextareaAutosize
                        minRows={4}
                        placeholder="Description..."
                        onChange={(event) => setDescription(event.target.value)}
                        defaultValue={description ? description : ''}
                    />

                    <Typography variant="h4" component="h1" gutterBottom>
                        Tags
                    </Typography>

                    <div style={{ position: 'relative' }}>
                        <TextField
                            placeholder="Tags (comma-separated)"
                            multiline
                            rows={1}
                            maxRows={4}
                            value={tags}
                            onChange={(event) => {
                                const input = event.target.value;
                                const tagsArray = input
                                    .split(',')
                                    .map((t) => t.trim());

                                if (tagsArray.length > 20) {
                                    setErrorMessage(
                                        'You can only add up to 20 tags.',
                                    );
                                    return;
                                }

                                setTags(input);

                                const lastTag = tagsArray.pop()?.trim() || '';
                                if (lastTag.length > 0) {
                                    findTags(lastTag);
                                } else {
                                    setShowSuggestions(false);
                                }
                            }}
                            fullWidth
                            inputRef={tagsInputRef}
                            defaultValue={tags ? tags : []}
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
                                            sx={{ cursor: 'pointer' }}
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
                    <div>
                        <Tooltip
                            title="Check this option to make your post visible to everyone. If unchecked, the post will remain private."
                            arrow
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isOpen}
                                        onChange={(event) =>
                                            setIsOpen(event.target.checked)
                                        }
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
                        Update
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={deleteMedia}
                        disabled={isSending}
                    >
                        Delete
                    </Button>
                </StyledCard>
            </MainContainer>
        </AppTheme>
    );
};

export default EditMedia;
