import { useState, useRef } from 'react';
import axios from 'axios';

const useTags = () => {
    const [tags, setTags] = useState<string>('');
    const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const tagsInputRef = useRef<HTMLInputElement>(null);

    const findTags = async (input: string) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/tags/${input}`,
            );
            const fetchedTags = response.data.content
                .map((tag: { name: string }) => tag.name)
                .slice(0, 5);
            setSuggestedTags(fetchedTags);
            setShowSuggestions(fetchedTags.length > 0);
        } catch {
            setSuggestedTags([]);
            setShowSuggestions(false);
        }
    };

    const addTag = (newTag: string) => {
        setTags((prevTags) => {
            const tagArray = prevTags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean);
            if (tagArray.includes(newTag) || tagArray.length >= 20)
                return prevTags;
            return [...tagArray, newTag].join(', ') + ', ';
        });
        setShowSuggestions(false);
        tagsInputRef.current?.focus();
    };

    return {
        tags,
        setTags,
        suggestedTags,
        showSuggestions,
        findTags,
        addTag,
        tagsInputRef,
    };
};

export default useTags;
