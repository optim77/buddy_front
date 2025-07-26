import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useParams } from 'react-router-dom';

import { LinkWhite } from '../../customStyles/Element';
import authService from '../../services/authService';

import { useFetchPlan } from './hooks/useFetchPlan';
import { fetchMessage } from '../../utils/fetchMessage';
import PlanViewLayout from '../layout/PlanViewLayout';

const PlanView: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const id = useParams<{ id: string }>();
    const { plan, fetchPlanMessage, fetchPlanMessageType } = useFetchPlan(id.id);

    return (
        <PlanViewLayout>
            <Typography variant="h4" component="h1" gutterBottom>
                Plan of <LinkWhite to={'/user/' + plan?.planOwnerId}>{plan?.planOwnerName}</LinkWhite>
            </Typography>

            {fetchPlanMessage && fetchMessage(fetchPlanMessage, fetchPlanMessageType)}
            <Typography variant="h4" component="h1" gutterBottom>
                Name
            </Typography>
            <Typography>{plan?.name}</Typography>

            <Typography variant="h4" component="h1" gutterBottom>
                Description
            </Typography>
            <Typography>{plan?.description}</Typography>
            <Typography variant="h4" component="h1" gutterBottom>
                Price
            </Typography>
            <Typography>{plan?.price} $</Typography>

            <Button variant="outlined">Buy</Button>
            {plan?.planOwnerId == authService.getBuddyUser() ? (
                <>
                    <LinkWhite to={'/plan/edit/' + plan?.id}>
                        <Button variant="contained" color="primary">
                            Edit
                        </Button>
                    </LinkWhite>
                </>
            ) : null}
        </PlanViewLayout>
    );
};
export default PlanView;
