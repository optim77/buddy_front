import axios from 'axios';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

const setToken = (token: string) => {
    setCookie('buddy-token', token);
};
const setBuddyUser = (userId: string) => {
    setCookie('buddy-user', userId);
};

const setIds = (id: string) => {
    setCookie('buddy-id', id);
};

const getToken = () => {
    return getCookie('buddy-token') || null;
};

const getBuddyUser = () => {
    return getCookie('buddy-user') || null;
};

const getIdFromCookie = () => {
    return getCookie('buddy-id') || null;
};


const register = async (email: string, password: string) => {
    await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}/register`,
        { email, password },
        {
            headers: {
                'content-type': 'application/json',
            },
        },
    );
};

const logout = async (): Promise<void> => {
    try {
        await axios
            .post(
                `${process.env.REACT_APP_API_ADDRESS}/session/logout/single`,
                { sessionId: getToken() },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                },
            )
            .then(() => {
                destroyThisSession();
            });
    } catch {
        destroyThisSession();
    }
};

export const destroyThisSession = (): void => {
    removeCookie('buddy-token');
    removeCookie('buddy-id');
    removeCookie('buddy-user');
    document.location.href = '/dashboard';
};

const authService = {
    register,
    logout,
    getToken,
    getIdFromCookie,
    setIds,
    getBuddyUser,
    setToken,
    setBuddyUser,
};

export default authService;
