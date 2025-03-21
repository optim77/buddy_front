import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { useAuthValidation } from "./useAuthValidation";

export const useAuth = () => {
    const { validateInputs } = useAuthValidation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        if (!validateInputs(email, password)) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ADDRESS}/authenticate`,
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            authService.setToken(response.data.token);
            authService.setBuddyUser(response.data.userId);
            navigate(0);
        } catch (error: any) {
            alert("Wrong email or password.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return { login, isSubmitting };
};
