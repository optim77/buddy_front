// src/App.tsx
import React from 'react';

import AppRouter from './AppRouter';
import { GlobalBanner } from './componenets/banner/GlobalBanner';

const App: React.FC = () => {
    return (
        <>
            <GlobalBanner />
            <AppRouter />
        </>
    );
};

export default App;
