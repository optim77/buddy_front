import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { StyledCard, StyledTextareaAutosize } from '../../customStyles/Element';
import { MainContainer } from '../../customStyles/MainContainer';
import AppTheme from '../theme/AppTheme';
import { useCreatePlan } from './useSendPlan';

const CreatePlan: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const {
        isSending,
        message,
        messageType,
        setName,
        setDescription,
        setPrice,
        send,
    } = useCreatePlan();

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <MainContainer>
                <StyledCard variant="outlined">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create plan
                    </Typography>

                    {message && (
                        <Typography color={messageType} variant="body2">
                            {message}
                        </Typography>
                    )}
                    <Typography variant="h4" component="h1" gutterBottom>
                        Name
                    </Typography>
                    <TextField
                        placeholder="Name"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />

                    <Typography variant="h4" component="h1" gutterBottom>
                        Description
                    </Typography>
                    <StyledTextareaAutosize
                        minRows={4}
                        placeholder="Description..."
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <Typography variant="h4" component="h1" gutterBottom>
                        Price
                    </Typography>
                    <TextField
                        placeholder="Price"
                        onChange={(event) => {
                            setPrice(Number(event.target.value));
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={send}
                        disabled={isSending}
                    >
                        Create
                    </Button>
                </StyledCard>
            </MainContainer>
        </AppTheme>
    );
};
export { CreatePlan };
