import ViewModeToggle from '../media/ViewModeToggle';
import MediaGrip from '../media/grid/MediaGrip';
import MediaWall from '../media/wall/MediaWall';
import TagList from './TagList';
import React from 'react';
import { MediaObject } from '../media/types/MediaObject';
import { ITag } from '../tag/ITag';

interface ExploreTabProps {
    contentType: 'posts' | 'tags';
    handleViewChange: (mode: string) => void;
    viewMode: string;
    images: MediaObject[];
    tags: ITag[];
}

export const ExploreTab: React.FC<ExploreTabProps> = ({ contentType, handleViewChange, viewMode, images, tags }) => {
    return (
        <>
            {contentType === 'posts' ? <ViewModeToggle viewMode={viewMode} onChange={handleViewChange} /> : null}
            {contentType === 'posts' ? (
                viewMode === 'grid' ? (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '0px',
                        }}
                    >
                        {images.map((image) => (
                            <MediaGrip key={image.imageId} image={image} />
                        ))}
                    </div>
                ) : (
                    <div>
                        {images.map((image) => (
                            <MediaWall key={image.imageId} image={image} />
                        ))}
                    </div>
                )
            ) : (
                <TagList tags={tags} />
            )}
        </>
    );
};
