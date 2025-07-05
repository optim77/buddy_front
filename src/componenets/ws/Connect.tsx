import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import authService from '../../services/authService';

let client: Client | null = null;

export const initWebSocket = () => {
    const token = authService.getToken();
    const userId = authService.getBuddyUser();

    console.log('🔗 Initializing WebSocket connection...');
    console.log('📍 WS Address:', process.env.REACT_APP_WS_ADDRESS);
    console.log('👤 User ID:', userId);
    console.log('🔑 Token present:', !!token);

    if (!token || !userId) {
        console.warn('❗ WebSocket not initialized — missing token or userId');
        return;
    }

    // Jeśli już istnieje połączenie, zamknij je
    if (client) {
        console.log('🔄 Closing existing connection...');
        client.deactivate();
    }

    client = new Client({
        webSocketFactory: () => {
            const wsUrl = `${process.env.REACT_APP_WS_ADDRESS}/ws`;
            console.log('🌐 Creating SockJS connection to:', wsUrl);
            return new SockJS(wsUrl);
        },

        // Dodaj więcej opcji debugowania
        debug: (str) => {
            console.log('🐛 STOMP Debug:', str);
        },

        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },

        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,

        onConnect: (frame) => {
            console.log('✅ Connected to WebSocket');
            console.log('📋 Connection frame:', frame);

            const subscriptionTopic = `/topic/notifications/${userId}`;
            console.log('📡 Subscribing to:', subscriptionTopic);

            const subscription = client?.subscribe(subscriptionTopic, (message) => {
                console.log('📨 Raw message received:', message);
                try {
                    const payload = JSON.parse(message.body);
                    console.log('🔔 Notification payload:', payload);

                    // Tutaj możesz dodać logikę obsługi notyfikacji
                    handleNotification(payload);
                } catch (error) {
                    console.error('❌ Error parsing message:', error);
                }
            });

            console.log('✅ Subscription created:', subscription?.id);
        },

        onStompError: (frame) => {
            console.error('❌ STOMP error:', frame.headers['message']);
            console.error('❌ Full error frame:', frame);
        },

        onWebSocketError: (error) => {
            console.error('❌ WebSocket error:', error);
        },

        onWebSocketClose: (event) => {
            console.log('🔌 WebSocket closed:', event);
        },

        onDisconnect: (frame) => {
            console.log('🔌 Disconnected:', frame);
        }
    });

    client.activate();
    console.log('🚀 WebSocket activation initiated');
};

export const deactivateWebSocket = () => {
    if (client) {
        console.log('🔌 Deactivating WebSocket...');
        client.deactivate();
        client = null;
        console.log('✅ WebSocket disconnected');
    }
};

// Funkcja do obsługi otrzymanych notyfikacji
const handleNotification = (payload: any) => {
    console.log('🔔 Processing notification:', payload);

    // Tutaj możesz dodać logikę:
    // - Wyświetlanie toast notifications
    // - Aktualizacja stanu aplikacji
    // - Odtwarzanie dźwięku
    // - Inne akcje
};

// Funkcja pomocnicza do wysyłania wiadomości (jeśli potrzebujesz)
export const sendMessage = (destination: string, message: any) => {
    if (client && client.connected) {
        client.publish({
            destination,
            body: JSON.stringify(message)
        });
        console.log('📤 Message sent to:', destination);
    } else {
        console.warn('❗ Cannot send message - client not connected');
    }
};

// Funkcja sprawdzająca status połączenia
export const isConnected = (): boolean => {
    return client?.connected || false;
};

// Eksport klienta dla zaawansowanego użycia
export const getClient = (): Client | null => {
    return client;
};