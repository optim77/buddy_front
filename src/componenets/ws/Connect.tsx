import { Client } from '@stomp/stompjs';

let client: Client;

export const initWebSocket = (token: string, userId: string) => {
    console.log('init WebSocket');
    client = new Client({
        brokerURL: `${process.env.REACT_APP_WS_ADDRESS}`,
        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('Connected with WebSocketem');
            client.subscribe(`/topic/notifications/${userId}`, (message) => {
                const payload = JSON.parse(message.body);
                console.log('🔔 Notification:', payload);
            });
        },
        onStompError: (frame) => {
            console.error('STOMP error:', frame.headers['message']);
        },
    });

    client.activate();
};

export const deactivateWebSocket = () => {
    client?.deactivate();
};
