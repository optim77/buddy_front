import React from 'react';
import { Grid, Card, CardContent, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import {formatMediaLink} from "../../../utils/FormatMediaLink";
import {truncateText} from "../../../utils/FormatText";
import LikeButton from "../../like/LikeButton";
import {formatLikes} from "../../../utils/FormatLike";
import {NoAccessWall} from "../NoAccessWall";

const MediaGrip = ({
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
        <Grid item xs={12} sm={6} md={4} key={image.imageId}>
            <Card>
                <Link to={`/image/${image.imageId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {image.imageUrl ? ( image.mediaType === 'VIDEO' ? (
                        <video
                            src={formatMediaLink(image.imageUrl)}
                            autoPlay
                            loop
                            muted
                            style={{
                                width: '100%',
                                maxHeight: 200,
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <img
                            src={formatMediaLink(image.imageUrl)}
                            alt={image.description || 'Profile image'}
                            style={{
                                width: '100%',
                                height: 200,
                                objectFit: 'cover',
                            }}
                        />
                    )) : <NoAccessWall username={image.username} mediaType={image.mediaType} type={"min"}/>}
                </Link>
                <CardContent>
                    <Typography variant="subtitle1" noWrap>
                        <Link to={`/user/${image.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {image.username}
                        </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {truncateText(image.description || 'No description', 50)}
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mt: 1 }}
                    >
                        <LikeButton mediaId={image.imageId} isLiked={image.likedByCurrentUser} />
                        <Typography variant="body2" color="text.secondary">
                            { formatLikes(image.likeCount) }
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default MediaGrip;
