import React from "react";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { formatMediaLink } from "../../../utils/FormatMediaLink";
import { truncateText } from "../../../utils/FormatText";
import LikeButton from "../../like/LikeButton";
import { formatLikes } from "../../../utils/FormatLike";

const MediaWall = ({
                       image,
                   }: {
    image: {
        imageId: string;
        mediaType: string;
        imageUrl: string;
        description: string | null;
        username: string;
        userId: string;
        likeCount: number;
        likedByCurrentUser: boolean;
    };
}) => {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
                maxWidth: "800px",
                mx: "auto", // Center horizontally
                overflow: "hidden",
            }}
        >
            <Link to={`/image/${image.imageId}`} style={{ textDecoration: "none", color: "inherit" }}>
                {image.imageUrl ? (
                    image.mediaType === "VIDEO" ? (
                        <video
                            src={formatMediaLink(image.imageUrl)}
                            autoPlay
                            loop
                            muted
                            style={{
                                width: "100%",
                                maxHeight: "600px",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <img
                            src={formatMediaLink(image.imageUrl)}
                            alt={image.description || "Profile image"}
                            style={{
                                width: "100%",
                                maxHeight: "600px",
                                objectFit: "cover",
                            }}
                        />
                    )
                ) : (
                    <Typography sx={{ textAlign: "center", padding: 2 }}>No Access</Typography>
                )}
            </Link>
            <CardContent sx={{ width: "100%", padding: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                    <Link to={`/user/${image.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {image.username}
                    </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {truncateText(image.description || "No description", 200)}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <LikeButton mediaId={image.imageId} isLiked={image.likedByCurrentUser} />
                    <Typography variant="body2" color="text.secondary">
                        {formatLikes(image.likeCount)}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default MediaWall;
