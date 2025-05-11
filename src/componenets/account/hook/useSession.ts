import { useState } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';

export const useSession = () => {

    const [deleting, setDeleting] = useState(false)
    const [deleted, setDeleted] = useState(false);
    const [message, setMessage] = useState("");

    const deleteSession = async (sessionId: string) => {
        if (deleting) {
            return
        }
        if (sessionId) {
            setDeleting(true);
            await axios.post(
                `${process.env.REACT_APP_API_ADDRESS}/session/logout/single`,
                {sessionId},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authService.getToken()}`,
                    },
                }
            ).then(res => {
                if (res.status === 200) {
                    setDeleted(true);
                }else {
                    setMessage("Something went wrong");
                }
            })
        } else {
            setDeleting(false);
            setMessage("Something went wrong, try again later");
        }
    }

    return {
        deleting,
        deleted,
        message,
        deleteSession,
    }
}