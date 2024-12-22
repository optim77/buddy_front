import React, { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { likePhoto } from "./LikeService";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

interface LikeButtonProps {
    mediaId: string;
    isLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ mediaId, isLiked }) => {
    const [liked, setLiked] = useState(isLiked);
    const [errorOpen, setErrorOpen] = useState(false);

    const handleLikeClick = async () => {
        try {
            await likePhoto(mediaId);
            setLiked(!liked);
        } catch (error) {
            setErrorOpen(true);
        }
    };

    const handleCloseError = () => {
        setErrorOpen(false);
    };

    return (
        <>

            <FavoriteIcon onClick={handleLikeClick} color={liked ? "primary" : "disabled"} sx={{ cursor: "pointer" }} />


            <Dialog open={errorOpen} onClose={handleCloseError}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <p>Failed to like the photo. Please try again later.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseError}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LikeButton;
