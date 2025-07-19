import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { Fade } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { getCookie } from 'typescript-cookie';

import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown';
import { SettingIcon, SitemarkIcon } from '../CustomIcons';
import { StyledButton, StyledLink, StyledToolbar } from '../../customStyles/Element';
import { useNavbar } from './useNavbar';

export default function AppAppBar() {
    const { handleLogout, handleClick, handleClose, toggleDrawer, anchorEl, isOpen, open } = useNavbar();
    const isAuthenticated = !!getCookie('buddy-token');

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            px: 0,
                        }}
                    >
                        {isAuthenticated ? (
                            <StyledLink to="/">
                                <SitemarkIcon />
                            </StyledLink>
                        ) : (
                            <StyledLink to="/dashboard">
                                <SitemarkIcon />
                            </StyledLink>
                        )}

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                                <StyledLink className="link-styles" to="/loops">
                                    Loops
                                </StyledLink>
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                                <StyledLink className="link-styles" to="/explore">
                                    Explore
                                </StyledLink>
                            </Button>
                            {isAuthenticated ? (
                                <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                                    <StyledLink className="link-styles" to="/profile">
                                        Profile
                                    </StyledLink>
                                </Button>
                            ) : null}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        {!isAuthenticated ? (
                            <StyledButton color="primary" variant="text">
                                <StyledLink className="link-styles" to="/sign-in">
                                    Sign in
                                </StyledLink>
                            </StyledButton>
                        ) : null}

                        {!isAuthenticated ? (
                            <Button color="primary" variant="text">
                                <StyledLink className="link-styles" to="/sign-up">
                                    Sign up
                                </StyledLink>
                            </Button>
                        ) : null}

                        {isAuthenticated ? (
                            <StyledButton color="primary" variant="text">
                                <StyledLink className="link-styles" to="/create">
                                    Create
                                </StyledLink>
                            </StyledButton>
                        ) : null}

                        {isAuthenticated ? (
                            <div>
                                <Button
                                    id="fade-button"
                                    aria-controls={isOpen ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={isOpen ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <SettingIcon />
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={isOpen}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <StyledLink className="link-styles" to="/account">
                                            Account
                                        </StyledLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        ) : null}
                        <ColorModeIconDropdown />
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <ColorModeIconDropdown size="medium" />
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    top: 'var(--template-frame-height, 0px)',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: 'background.default',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem>Features</MenuItem>
                                <MenuItem>Testimonials</MenuItem>

                                <Divider sx={{ my: 4 }} />
                                <MenuItem>
                                    <Button color="primary" variant="contained" fullWidth>
                                        Sign up
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button color="primary" variant="outlined" fullWidth>
                                        Sign in
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
