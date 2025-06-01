import { ErrorType, useErrorStore } from './useErrorStore';

export const showBanner = (message: string, type?: ErrorType) => {
    useErrorStore.getState().setBanner(message, type);
};
