import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

export const LoopContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    gap: 4,
    overflow: 'hidden',
});

export const MainVideoControlMotionDiv = styled(motion.div)({
    position: 'absolute',
    bottom: '20px',
    left: '1.5%',
    right: '20px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
});

export const LoopVideoControlBox = styled(Box)({
    position: 'absolute',
    bottom: '140px',
    left: '17%',
    right: '20px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
});

export const LoopVideoInnerControlBox = styled(Box)({
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px',
    borderRadius: '8px',
    width: '60px',
    textAlign: 'center',
});

export const MainUserItemMotionDiv = styled(motion.div)({
    position: 'absolute',
    bottom: '20px',
    left: '2%',
    right: '20px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
});

export const LoopUserItemBox = styled(Box)({
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    height: '120px',
    width: '67%',
    justifyContent: 'left',
    alignItems: 'left',
    margin: 'auto',
    position: 'absolute',
    bottom: '1%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
});

export const LoopUserItemInnerBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
});

export const LoadingBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
});
