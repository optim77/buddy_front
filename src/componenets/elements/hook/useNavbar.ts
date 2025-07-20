import authService from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';

export const useNavbar = () => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleLogout = async () => {
        await authService.logout();
        navigate('/');
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return { handleLogout, handleClick, handleClose, toggleDrawer, anchorEl, isOpen, open };
};
