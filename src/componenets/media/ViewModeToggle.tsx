import Button from '@mui/material/Button';
import React from 'react';

import { GridView, WallView } from '../CustomIcons';

interface ViewModeToggleProps {
    viewMode: string;
    onChange: (mode: string) => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
    viewMode,
    onChange,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
            }}
        >
            <Button
                variant={viewMode === 'wall' ? 'contained' : 'outlined'}
                onClick={() => onChange('wall')}
                sx={{
                    backgroundColor:
                        viewMode === 'wall' ? 'primary.dark' : 'transparent',
                    color: viewMode === 'wall' ? '#2c2020' : 'primary.main',
                    borderColor: 'primary.main',
                    '&:hover': {
                        backgroundColor:
                            viewMode === 'wall'
                                ? 'primary.dark'
                                : 'rgba(0, 0, 0, 0.04)',
                    },
                }}
            >
                <WallView />
            </Button>
            <Button
                variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                onClick={() => onChange('grid')}
                sx={{
                    backgroundColor:
                        viewMode === 'grid' ? 'primary.dark' : 'transparent',
                    color: viewMode === 'grid' ? '#2c2020' : 'primary.main',
                    borderColor: 'primary.main',
                    '&:hover': {
                        backgroundColor:
                            viewMode === 'grid'
                                ? 'primary.dark'
                                : 'rgba(0, 0, 0, 0.04)',
                    },
                }}
            >
                <GridView />
            </Button>
        </div>
    );
};

export default ViewModeToggle;
