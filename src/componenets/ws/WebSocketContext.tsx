import { Client } from '@stomp/stompjs';
import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from 'react';
import authService from '../../services/authService';
import { handleNotification } from './WebSocketNotificationMessage';

type WebSocketContextType = {
    client: Client | null;
    isConnected: boolean;
    sendMessage: (destination: string, message: any) => void;
};

const WebSocketContext = createContext<WebSocketContextType>({
    client: null,
    isConnected: false,
    sendMessage: (destination: string, message: any) => {
        throw new Error('sendMessage called outside of WebSocketProvider');
    },
});

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const clientRef = useRef<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const initWebSocket = useCallback(() => {
        const token = authService.getToken();
        const userId = authService.getBuddyUser();

        if (!token || !userId) {
            return;
        }

        if (clientRef.current) {
            clientRef.current.deactivate();
            clientRef.current = null;
        }

        const client = new Client({
            webSocketFactory: () => new WebSocket(`ws://localhost:9090/ws`),
            reconnectDelay: 10000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectionTimeout: 60000,

            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },

            onConnect: () => {
                const topic = `/topic/notifications/${userId}`;

                client.subscribe(topic, (message) => {
                    try {
                        const payload = JSON.parse(message.body);
                        handleNotification(payload);
                    } catch (e) {
                        console.error('Failed to parse message', e);
                    }
                });

                setIsConnected(true);
            },

            onDisconnect: () => {
                console.log('Disconnected');
                setIsConnected(false);
            },

            onStompError: (frame) => {
                console.error('❌ STOMP error:', frame);
            },

            onWebSocketClose: () => {
                console.log('🔌 WS closed');
                setIsConnected(false);
            },

            onWebSocketError: (err) => {
                console.error('❌ WS Error:', err);
            },
        });

        client.activate();
        clientRef.current = client;
    }, []);

    useEffect(() => {
        initWebSocket();

        return () => {
            clientRef.current?.deactivate();
        };
    }, [initWebSocket]);

    const sendMessage = (destination: string, message: any) => {
        const client = clientRef.current;
        if (client && client.connected) {
            try {
                client.publish({
                    destination,
                    body: JSON.stringify(message),
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            } catch (e) {
                console.error('Error sending message:', e);
            }
        } else {
            console.warn('Cannot send — not connected');
        }
    };

    return (
        <WebSocketContext.Provider value={{ client: clientRef.current, isConnected, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
