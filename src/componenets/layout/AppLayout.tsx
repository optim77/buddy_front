import AppTheme from '../theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { MainContainer } from '../../customStyles/MainContainer';
import ColorModeSelect from '../theme/ColorModeSelect';

interface AppLayoutProps {
    children: React.ReactNode;
    disableCustomTheme?: boolean;
    showColorModeToggle?: boolean;
    direction?: 'row' | 'column';
    justifyContent?: 'center' | 'flex-start' | 'space-between' | 'space-around' | 'space-evenly';
}

const AppLayout: React.FC<AppLayoutProps> = ({
    children,
    disableCustomTheme,
    showColorModeToggle = true,
    direction = 'column',
    justifyContent = 'space-between',
}) => {
    return (
        <AppTheme disableCustomTheme={disableCustomTheme}>
            <CssBaseline enableColorScheme />
            <MainContainer direction={direction} justifyContent={justifyContent}>
                {showColorModeToggle && <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />}
                {children}
            </MainContainer>
        </AppTheme>
    );
};

export default AppLayout;
