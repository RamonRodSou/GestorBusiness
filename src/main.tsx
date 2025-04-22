import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './index.css';
import AppRouter from './AppRouter';
import { AuthProvider } from './context/AuthContext';
import { ManagerProvider } from '@context/ManagerContext';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <ManagerProvider>
                <StrictMode>
                    <AppRouter/>
                </StrictMode>
            </ManagerProvider>
        </AuthProvider>
    </React.StrictMode>
)
