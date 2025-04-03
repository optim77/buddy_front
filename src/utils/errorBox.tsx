import Typography from '@mui/material/Typography';

export const errorBox = (error: string) => {
    return (
        <>
            <Typography
                variant="body2"
                component="div"
                color="error"
                sx={{
                    alignItems: 'center',
                }}
            >
                {error}
            </Typography>
        </>
    );
};
