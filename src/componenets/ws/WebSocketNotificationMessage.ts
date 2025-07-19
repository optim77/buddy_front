import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export enum WebSocketMessageType {
    Follow,
    Like,
    Subscribe,
}

export interface WebSocketNotificationMessage {
    consumerUsername: string;
    consumerId: string;
    broadcasterUsername: string;
    broadcasterId: string;
    type: string;
    message?: string;
    createdAt: Date;
}

export const handleNotification = (payload: WebSocketNotificationMessage) => {
    console.log(payload);
    let actionMessage = '';

    switch (payload.type) {
        case 'Like':
            actionMessage = `${payload.broadcasterUsername} like your post!`;
            break;
        case 'Subscribe':
            actionMessage = `${payload.broadcasterUsername} follows you!`;
            break;
        default:
            actionMessage = payload.message || 'New notification!';
    }

    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New notification!', {
            body: actionMessage,
            icon: '/favicon.ico',
        });
    }

    toast(actionMessage, {
        type: 'info',
        theme: 'dark',
        onClick: () => {
            window.location.href = `/user/${payload.broadcasterId}`;
        },
    });

    window.dispatchEvent(
        new CustomEvent('notification', {
            detail: payload,
        }),
    );
};
