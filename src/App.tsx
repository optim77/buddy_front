// src/App.tsx
import React from 'react';

import AppRouter from './AppRouter';
import { GlobalBanner } from './componenets/banner/GlobalBanner';
import { WebSocketProvider } from './componenets/ws/WebSocketContext';
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
    return (
        <>
            <WebSocketProvider>
                <GlobalBanner />
                <AppRouter />
                <ToastContainer position="bottom-right" />
            </WebSocketProvider>
        </>
    );
};

export default App;
