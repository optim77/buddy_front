import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';
import { useLike } from './hook/useLike';

interface LikeButtonProps {
    mediaId: string;
    isLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ mediaId, isLiked }) => {
    const { handleLikeClick, liked } = useLike(mediaId, isLiked);
    return <FavoriteIcon onClick={handleLikeClick} color={liked ? 'primary' : 'disabled'} sx={{ cursor: 'pointer' }} />;
};

export default LikeButton;
