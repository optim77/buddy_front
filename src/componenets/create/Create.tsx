import React from 'react';
import { TextField, Typography, Button, Checkbox, FormControlLabel, Tooltip, List, ListItem } from '@mui/material';
import { StyledTextareaAutosize, SuggestionsContainer, StyledListItemText } from '../../customStyles/Element';
import useTags from './hook/useTags';
import usePostCreation from './hook/usePostCreation';
import Box from '@mui/material/Box';
import CreateLayout from '../layout/CreateLayout';
import { CheckCircle } from '@mui/icons-material';

const Create: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const { tags, setTags, suggestedTags, showSuggestions, findTags, addTag, tagsInputRef } = useTags();
    const { isSending, send, handleFileChange, setDescription, setIsOpen, isOpen, selectedFile } =
        usePostCreation(tags);

    return (
        <CreateLayout>
            <Box component="form" onSubmit={send}>
                <div className="flex items-center justify-center w-full mb-5">
                    <label
                        htmlFor="dropzone-watermark"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300
                        border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700
                        hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600
                        relative"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {selectedFile ? (
                                <>
                                    <CheckCircle className="w-10 h-10 text-green-500 mb-2" />
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedFile.name}</p>
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207
                  5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload a file</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, MP4, AVI</p>
                                </>
                            )}
                        </div>
                        <input
                            id="dropzone-watermark"
                            type="file"
                            className="hidden"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                <Typography variant="h4">Description</Typography>
                <StyledTextareaAutosize
                    minRows={4}
                    placeholder="Description..."
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Typography variant="h4">Tags</Typography>
                <div style={{ position: 'relative' }}>
                    <TextField
                        placeholder="Tags (comma-separated)"
                        value={tags}
                        onChange={(e) => {
                            setTags(e.target.value);
                            const lastTag = e.target.value.split(',').pop()?.trim();
                            if (lastTag) findTags(lastTag);
                        }}
                        fullWidth
                        inputRef={tagsInputRef}
                    />
                    {showSuggestions && (
                        <SuggestionsContainer>
                            <List>
                                {suggestedTags.map((tag) => (
                                    <ListItem key={tag} sx={{ cursor: 'pointer' }} onClick={() => addTag(tag)}>
                                        <StyledListItemText>{tag}</StyledListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </SuggestionsContainer>
                    )}
                </div>

                <Tooltip title="Make your post visible to everyone." arrow>
                    <FormControlLabel
                        control={<Checkbox checked={isOpen} onChange={() => setIsOpen((prev) => !prev)} />}
                        label="Open"
                    />
                </Tooltip>

                <Button variant="contained" fullWidth type="submit" disabled={isSending}>
                    Create
                </Button>
            </Box>
        </CreateLayout>
    );
};

export default Create;
