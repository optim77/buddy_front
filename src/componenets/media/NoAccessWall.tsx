import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { formatMediaLink } from '../../utils/FormatMediaLink';
import { NoAccessBox } from "./elements/MediaElements";

export const NoAccessWall = ({
    username,
    mediaType,
    backgroundImage,
}: {
    username: string;
    mediaType: string;
    backgroundImage: string;
}) => {
    const blurredLink = formatMediaLink(backgroundImage);

    return (
        <NoAccessBox sx={{backgroundImage: `url(${blurredLink})`}}>
            <Typography variant="h3" component="div" sx={{ marginBottom: 2 }}>
                Get a subscription to view the {mediaType === 'VIDEO' ? 'video' : 'photo'}
            </Typography>
            <Typography variant="caption" component="div">
                {username} does not make this {mediaType === 'VIDEO' ? 'video' : 'photo'} available to the public
            </Typography>
            <Button
                variant="contained"
                color="primary"
                href="/subscribe"
                sx={{
                    position: 'absolute',
                    bottom: 20,
                }}
            >
                Get Access
            </Button>
        </NoAccessBox>
    );
};
