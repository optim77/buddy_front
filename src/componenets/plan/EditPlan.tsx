import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useParams } from 'react-router-dom';
import { StyledTextareaAutosize } from '../../customStyles/Element';
import { useFetchPlan } from './hooks/useFetchPlan';
import { useCreatePlan } from './hooks/useSendPlan';
import { fetchMessage } from '../../utils/fetchMessage';
import GenericLayout from '../layout/GenericLayout';

const EditPlan: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const id = useParams<{ id: string }>();
    const { plan, fetchPlanMessage, fetchPlanMessageType } = useFetchPlan(id.id);

    const { isSendingPlan, setName, setDescription, setPrice, sendPlan } = useCreatePlan();

    return (
        <GenericLayout>
            <Typography variant="h4" component="h1" gutterBottom>
                Edit plan
            </Typography>

            {fetchPlanMessage && fetchMessage(fetchPlanMessage, fetchPlanMessageType)}

            <Typography variant="h4" component="h1" gutterBottom>
                Name
            </Typography>
            <TextField
                value={plan?.name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />

            <Typography variant="h4" component="h1" gutterBottom>
                Description
            </Typography>
            <StyledTextareaAutosize
                minRows={4}
                value={plan?.description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <Typography variant="h4" component="h1" gutterBottom>
                Price
            </Typography>
            <TextField
                value={plan?.price}
                onChange={(event) => {
                    setPrice(Number(event.target.value));
                }}
            />
            <Button type="submit" fullWidth variant="contained" onClick={sendPlan} disabled={isSendingPlan}>
                Update
            </Button>
        </GenericLayout>
    );
};
export { EditPlan };
