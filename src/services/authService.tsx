import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { deactivateWebSocket } from '../componenets/ws/Connect';
import { apiClient } from '../componenets/api/apiClient';

const setToken = (token: string) => {
    setCookie('buddy-token', token);
};
const setBuddyUser = (userId: string) => {
    setCookie('buddy-user', userId);
};

const setBuddySessionUUID = (sessionId: string) => {
    setCookie('buddy-session-id', sessionId);
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

const getBuddySessionId = () => {
    return getCookie('buddy-session-id') || null;
};

const logout = async (): Promise<void> => {
    try {
        const res = await apiClient.post('/session/logout/single', {
            params: { sessionId: getBuddySessionId(), session: getToken() },
        });
        if (res.status == 200) {
            destroyThisSession();
            deactivateWebSocket();
        }
    } catch {
        destroyThisSession();
        deactivateWebSocket();
    }
};

export const destroyThisSession = (): void => {
    removeCookie('buddy-token');
    removeCookie('buddy-id');
    removeCookie('buddy-user');
    removeCookie('buddy-session-id');
    document.location.href = '/dashboard';
};

const authService = {
    logout,
    getToken,
    getIdFromCookie,
    setIds,
    getBuddyUser,
    setToken,
    setBuddyUser,
    setBuddySessionUUID,
};

export default authService;
