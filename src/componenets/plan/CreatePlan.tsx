import React, {useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../theme/AppTheme";
import {MainContainer} from "../../customStyles/MainContainer";
import {StyledCard, StyledTextareaAutosize} from "../../customStyles/Element";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import authService from "../../services/authService";
import {useNavigate} from "react-router-dom";
import {CODE} from "../../utils/CODE";

const CreatePlan: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [price, setPrice] = useState<number>();
    const navigate = useNavigate();

    const send = async () => {
        setIsSending(true);
        try {
            if (validate()) {
                const formData = new FormData();
                formData.append("name", name as string);
                formData.append("description", description as string);
                formData.append("price", String(price));
                await axios.post(`${process.env.REACT_APP_API_ADDRESS}/plan/create`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authService.getToken()}`,
                    }
                }).then((res) => {
                    if (res.status === CODE.CREATED) {
                        setTimeout(() => {
                            setMessage("Created! You will be redirect to profile page");
                            navigate("/profile");
                        }, 2000)


                    } else {
                        setMessage("Something went wrong");
                        setIsSending(false);
                    }
                })

            }
        } catch {
            setMessage("Something went wrong! Try again");
            setIsSending(false)
        }

    }

    const validate = (): boolean => {
        if (!name) {
            setMessage("You need to fill name!");
            setIsSending(false);
            return false;
        }
        if (description && description.length < 50) {
            setMessage("Description is too short!");
            setIsSending(false);
            return false;
        }
        if (price === undefined || price < 0 || Number.isNaN(price)) {
            setMessage("Insert correct price");
            setIsSending(false);
            return false;
        }
        setMessage("")
        return true;
    }

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme/>
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
                        onChange={(event) => {
                            setName(event.target.value)
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
                            setPrice(Number(event.target.value))
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
    )
}
export default CreatePlan