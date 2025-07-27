import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { StyledTextareaAutosize } from '../../customStyles/Element';
import { useCreatePlan } from './hooks/useSendPlan';
import GenericLayout from '../layout/GenericLayout';

const CreatePlan: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const { isSendingPlan, setName, setDescription, setPrice, sendPlan } = useCreatePlan();

    return (
        <GenericLayout>
            <Typography variant="h4" component="h1" gutterBottom>
                Create plan
            </Typography>
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
            <Button type="submit" fullWidth variant="contained" onClick={sendPlan} disabled={isSendingPlan}>
                Create
            </Button>
        </GenericLayout>
    );
};
export { CreatePlan };
