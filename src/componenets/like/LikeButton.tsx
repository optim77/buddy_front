import React, { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {likePhoto} from "./LikeService";

interface LikeButtonProps {
    mediaId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ mediaId }) => {
    const [liked, setLiked] = useState(false);

    const handleLikeClick = async () => {
        if (!liked) {
            try {
                await likePhoto(mediaId);
                setLiked(true);
            } catch (error) {
                console.error("Failed to like photo:", error);
            }
        }
    };

    return (
        <Button onClick={handleLikeClick}  startIcon={<FavoriteIcon />}>
            {liked ? "Liked" : "Like"}
        </Button>
    );
};

export default LikeButton;
