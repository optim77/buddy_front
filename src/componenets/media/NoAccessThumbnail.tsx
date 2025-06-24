import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const NoAccessWall = ({ username, mediaType }: { username: string; mediaType: string }) => {
    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: `linear-gradient(
                to bottom right, 
                rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5), 
                rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)
            )`,
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                textAlign: 'center',
            }}
        >
            <Typography variant="h3" component="div" sx={{ color: '#fff', marginBottom: 2 }}>
                Get a subscription to view the {mediaType === 'VIDEO' ? 'video' : 'photo'}
            </Typography>
            <Typography variant="caption" component="div" sx={{ color: '#fff' }}>
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
        </Box>
    );
};
