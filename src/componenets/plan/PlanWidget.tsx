import React from "react";
import Plan from "./Plan";
import Card from "@mui/material/Card";
import {styled, useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {truncateText} from "../../utils/FormatText";
import {LinkWhite} from "../../customStyles/Element";



const PlanWidget = ({plan}: { plan: Plan }) => {
    const theme = useTheme();
    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    marginBottom: "12px",
                    padding: "20px",
                    boxShadow: theme.shadows[3],
                    borderRadius: theme.shape.borderRadius,
                    flexDirection: "column",
                    display: "flow",
                    minHeight: "120px",
                    height: "auto",
                    boxSizing: "border-box"
                }}
            >
                <LinkWhite to={"/plan/" + plan.id}>
                    <Typography variant="h5" component="div">{ plan.name }</Typography>
                    <Typography variant="h5" component="div">{ truncateText(plan.description, 50) }</Typography>
                    <Typography variant="h5" component="div">{ plan.price }</Typography>

                </LinkWhite>
                <Button>Buy</Button>

            </Card>
        </>
    )
}
export default PlanWidget