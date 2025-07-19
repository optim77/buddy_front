import { ListItemText, TextareaAutosize } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 100,
});

export const StyledCard = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '800px',
    },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
    font: 'inherit',
    letterSpacing: 'inherit',
    color: 'currentColor',
    padding: '16.5px 14px',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    boxSizing: 'border-box',
    background: 'none',
    width: '100%',
    margin: 0,
    resize: 'none',
    '-webkit-tap-highlight-color': 'transparent',
    '&:focus': {
        outline: 'none',
        borderColor: theme.palette.primary.main,
    },
    '&:disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
    },
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    padding: '16.5px 14px',
}));

export const SuggestionsContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    zIndex: 10,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    width: '100%',
    maxHeight: '150px',
    overflowY: 'auto',
}));

export const StyledAuthCard = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export const StyledTextareaAutosizeEditProfile = styled('textarea')(({ theme }) => ({
    width: '100%',
    minHeight: '100px',
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    fontSize: '1rem',
    fontFamily: theme.typography.fontFamily,
    resize: 'vertical',
    outline: 'none',
}));

export const LinkWhite = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
});

export const CustomCard = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 'bold',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme ? `rgba(${theme.palette.background.default} / 0.4)` : alpha(theme, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));
