import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { LinkWhite } from '../../customStyles/Element';
import { truncateText } from '../../utils/FormatText';
import Plan from './Plan';
import { PlanWidgetCard } from './elements/PlanElements';

const PlanWidget = ({ plan }: { plan: Plan }) => {
    return (
        <>
            <Grid item xs={12} sm={6} md={3} key={plan.id}>
                <PlanWidgetCard variant="outlined">
                    <LinkWhite to={'/plan/' + plan.id}>
                        <Typography variant="h5" component="div">
                            {plan.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {truncateText(plan.description, 10)}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {plan.price}
                        </Typography>
                    </LinkWhite>
                    <Button>Buy</Button>
                </PlanWidgetCard>
            </Grid>
        </>
    );
};
export default PlanWidget;
