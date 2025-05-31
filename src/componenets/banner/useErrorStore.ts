import { create } from 'zustand/react';

export type ErrorType = 'error' | 'warning' | 'info';

interface ErrorState {
    message: string | null;
    type: ErrorType;
    setBanner: (message: string, type?: ErrorType) => void;
    clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
    message: null,
    type: 'error',
    setBanner: (message, type = 'error') => set({ message, type }),
    clearError: () => set({ message: null }),
}));
