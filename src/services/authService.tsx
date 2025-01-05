import axios from 'axios';
import {Cookie} from "@mui/icons-material";
import {getCookie, removeCookie, setCookie} from "typescript-cookie";

const setToken = (token: string) => {
    setCookie("buddy-token", token);

}
const setBuddyUser = (userId: string) => {
    setCookie("buddy-user", userId);
}

const setIds = (id: string) => {
    setCookie("buddy-id", id);
}

const getToken = () => {
    return getCookie("buddy-token") || null;
}

const getBuddyUser = () => {
    return getCookie("buddy-user") || null;
}

const getIdFromCookie = () => {
    return getCookie("buddy-id") || null;
}

const login = async (email: string, password: string) => {
    await axios.post(`${process.env.REACT_APP_API_ADDRESS}/authenticate`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((content) => {
        setToken(content.data.token);
        setBuddyUser(content.data.userId);
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
    removeCookie("buddy-id");
    removeCookie("buddy-user");
    document.location.href="/"
};

const authService = {
    login,
    register,
    logout,
    getToken,
    getIdFromCookie,
    setIds,
    getBuddyUser
};

export default authService;
