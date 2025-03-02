import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import { LinkWhite } from '../../customStyles/Element';
import { truncateText } from '../../utils/FormatText';

import Plan from './Plan';

const PlanWidget = ({ plan }: { plan: Plan }) => {
    const theme = useTheme();
    return (
        <>
            <Grid item xs={12} sm={6} md={3} key={plan.id}>
                <Card
                    variant="outlined"
                    sx={{
                        marginBottom: '12px',
                        padding: '10px',
                        boxShadow: theme.shadows[3],
                        flexDirection: 'column',
                        display: 'flow',
                        minHeight: '50px',
                        height: 'auto',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                    }}
                >
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
                </Card>
            </Grid>
        </>
    );
};
export default PlanWidget;
