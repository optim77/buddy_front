import React, {useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../theme/AppTheme";
import {MainContainer} from "../../customStyles/MainContainer";
import {StyledCard, StyledTextareaAutosize} from "../../customStyles/Element";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const CreatePlan: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [price, setPrice] = useState<number>();

    const send = async () =>{
        setIsSending(true);
        validate();
    }

    const validate = () => {
        if (!name){
            setMessage("You need to fill name!");
            setIsSending(false);
        }
        if (description && description.length < 50){
            setMessage("Description is too short!");
            setIsSending(false);
        }
        console.log(price)
        if (price == undefined || price < 0 || Number.isNaN(price)){
            setMessage("Insert correct price");
            setIsSending(false);
        }
        setMessage("")
    }

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <MainContainer>
                <StyledCard variant="outlined">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create plan
                    </Typography>

                    {message && (
                        <Typography color="error" variant="body2">
                            {message}
                        </Typography>
                    )}
                    <Typography variant="h4" component="h1" gutterBottom>
                        Name
                    </Typography>
                    <TextField
                        placeholder="Name"
                        onChange={(event) => {setName(event.target.value)}}
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
                        onChange={(event) => {setPrice(Number(event.target.value))}}
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
    )
}
export default CreatePlan