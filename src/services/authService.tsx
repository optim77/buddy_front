import axios from 'axios';
import {Navigate} from "react-router-dom";

const API_URL = "http://localhost:8080";

const login = async (email: string, password: string) => {
    const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/authenticate`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    localStorage.setItem("buddy-token", response.data.token);
    return <Navigate to="/dashboard" />
};

const register = async (email: string, password: string) => {
    await axios.post(`${process.env.REACT_APP_API_ADDRESS}/register`, { email, password }, {
        headers: {
            "content-type": "application/json"
        }
    });
};

const authService = {
    login,
    register,
};

export default authService;
