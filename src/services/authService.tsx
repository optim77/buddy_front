import axios from 'axios';
import {Cookie} from "@mui/icons-material";
import {getCookie, removeCookie, setCookie} from "typescript-cookie";

const setToken = (token: string) => {
    setCookie("buddy-token", token);

}

const getToken = () => {
    return getCookie("buddy-token") || null;
}

const login = async (email: string, password: string) => {
    await axios.post(`${process.env.REACT_APP_API_ADDRESS}/authenticate`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((content) => {
        setToken(content.data.token);
    });
};

const register = async (email: string, password: string) => {
    await axios.post(`${process.env.REACT_APP_API_ADDRESS}/register`, { email, password }, {
        headers: {
            "content-type": "application/json"
        }
    });
};

const logout = async (): Promise<void> => {
    removeCookie("buddy-token");
    window.location.reload();
};

const authService = {
    login,
    register,
    logout,
    getToken
};

export default authService;
