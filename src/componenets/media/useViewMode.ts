import { useState } from 'react';

export const useViewMode = () => {
    const [viewMode, setViewMode] = useState<string>(localStorage.getItem('buddy-grip') || 'grid');

    const handleViewChange = (mode: string) => {
        setViewMode(mode);
        localStorage.setItem('buddy-grip', mode);
    };

    return { viewMode, handleViewChange };
};
