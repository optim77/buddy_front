// src/App.tsx
import React from 'react';

import AppRouter from './AppRouter';
import { GlobalBanner } from './componenets/banner/GlobalBanner';
import { WebSocketProvider } from './componenets/ws/WebSocketContext';

const App: React.FC = () => {
    return (
        <>
            <WebSocketProvider>
                <GlobalBanner />
                <AppRouter />
            </WebSocketProvider>
        </>
    );
};

export default App;
