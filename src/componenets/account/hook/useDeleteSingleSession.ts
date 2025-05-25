import { useState } from 'react';
import axios from 'axios';
import authService, { destroyThisSession } from '../../../services/authService';

export const useDeleteSingleSession = () => {
    const [deletingSingle, setDeletingSingle] = useState(false);

    const deleteSession = async (sessionId: string): Promise<undefined | boolean>  => {
        if (deletingSingle) return;
        const isCurrent = sessionId === authService.getToken();
        let commit: boolean | undefined;
        if (isCurrent) {
            commit = confirm(
                'You are deleting your actual session, after that you will be log out!',
            );
        }

        if (sessionId) {
            setDeletingSingle(true);
            if ((isCurrent && commit) || !isCurrent) {
                await axios
                    .post(
                        `${process.env.REACT_APP_API_ADDRESS}/session/logout/single`,
                        JSON.stringify({ sessionId: sessionId }),
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authService.getToken()}`,
                            },
                        },
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            if (isCurrent) {
                                destroyThisSession();
                            }
                            return true;
                        }
                    });
            }
            setDeletingSingle(false);
        } else {
            setDeletingSingle(false);
            return false;
        }
    };

    return {
        deletingSingle,
        deleteSession,
    };
};
