import { VolumeOff, VolumeUp } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatLikes } from '../../utils/FormatLike';
import { buildMediaLink } from '../../utils/FormatMediaLink';
import { EditIcon, InfoIcon } from '../CustomIcons';
import LikeButton from '../like/LikeButton';
import { ITag } from '../tag/ITag';
import AppTheme from '../theme/AppTheme';

import { NoAccessWall } from './NoAccessWall';
import { MediaDashboardContainer } from './elements/MediaElements';
import { buildImageUrl } from '../../utils/BuildMediaUrl';
import { useMedia } from './hook/useMedia';

const Media: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const { media, editable, muted, setMuted } = useMedia();

    return (
        <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MediaDashboardContainer>
                    {media ? (
                        <Card sx={{ borderRadius: '0px' }}>
                            {media.imageUrl ? (
                                media.mediaType === 'VIDEO' ? (
                                    <video
                                        src={buildImageUrl(media.imageUrl)}
                                        //controls
                                        autoPlay
                                        loop
                                        muted={muted}
                                        preload="auto"
                                        style={{
                                            maxHeight: 500,
                                            width: '100%',
                                            marginTop: '30px',
                                        }}
                                    />
                                ) : (
                                    <CardMedia
                                        component="img"
                                        image={buildImageUrl(media.imageUrl)}
                                        alt={media.description || 'Image'}
                                        sx={{ maxHeight: 1000 }}
                                    />
                                )
                            ) : (
                                <NoAccessWall
                                    username={media.username}
                                    mediaType={media.mediaType}
                                    backgroundImage={media.blurredUrl}
                                />
                            )}

                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1.5,
                                        marginTop: 1,
                                        marginBottom: 1,
                                    }}
                                >
                                    {media.tags
                                        ? media.tags.map((tag: ITag) => (
                                              <Link to={`/tag/${tag}`} key={tag.toString()}>
                                                  <Chip
                                                      label={tag.toString()}
                                                      variant="filled"
                                                      sx={{
                                                          fontSize: '1rem',
                                                          padding: '10px',
                                                      }}
                                                  />
                                              </Link>
                                          ))
                                        : null}
                                </Box>

                                <Typography
                                    gutterBottom
                                    sx={{
                                        marginBottom: 5,
                                        marginTop: 5,
                                        marginLeft: 1,
                                        marginRight: 1,
                                    }}
                                >
                                    {media.description}
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ marginBottom: 2 }}
                                >
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            src={media.avatar ? buildMediaLink(media.avatar) : undefined}
                                            alt={media.username}
                                        />
                                        <Typography variant="subtitle1">
                                            <Link
                                                to={`/user/${media.userId}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                }}
                                            >
                                                {media.username}
                                            </Link>
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 'auto' }}>
                                        <Tooltip
                                            title={`Uploaded on: ${new Date(media.uploadedDate).toLocaleString()}`}
                                        >
                                            <Button variant="text" size="small">
                                                <InfoIcon />
                                            </Button>
                                        </Tooltip>
                                        {editable && (
                                            <Button variant="text" size="small">
                                                <Link to={'/edit/' + media.imageId}>
                                                    <EditIcon />
                                                </Link>
                                            </Button>
                                        )}
                                        {media.mediaType === 'VIDEO' ? (
                                            <Button
                                                onClick={() => {
                                                    setMuted(!muted);
                                                }}
                                            >
                                                {muted ? <VolumeOff /> : <VolumeUp />}
                                            </Button>
                                        ) : null}
                                    </Stack>
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <LikeButton mediaId={media.imageId} isLiked={media.likedByCurrentUser}></LikeButton>
                                <Typography variant="body2" color="text.secondary">
                                    {formatLikes(media.likeCount)}
                                </Typography>
                            </CardActions>
                        </Card>
                    ) : (
                        <Typography>Loading media...</Typography>
                    )}
                </MediaDashboardContainer>
            </AppTheme>
        </Container>
    );
};

export default Media;
