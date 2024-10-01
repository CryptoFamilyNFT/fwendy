import React from 'react';
import './App.css';
import AppAppBar from './components/AppAppBar';
import { Box, CssBaseline, AlertTitle, Alert, ThemeProvider, PaletteMode } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeHelper } from './helper/ThemeHelper';
import Hero from './components/Hero/Hero';
import { darkTheme, lightTheme } from './theme/Theme';
import bg_dark from './assets/bg_dark.png';
import bg_light from './assets/bg_light.png';
import ParticlesComponent from './theme/Particles';
import Swap from './components/Swap/Swap';
import Room from './components/Game/Room';
import SolanaHelper from './helper/SolanaHelper';
import { SolanaContext } from './helper/SolanaContext';
import { SolanaContextRepository } from './helper/SolanaContextRepository';
import Play from './components/Game/Play';
import Donation from './components/Donation/Donation';
import Analytics from './components/Analythics/Analythics';

function WrapperApp() {
  return (
    <Box sx={{ flexGrow: 1, p: 1, zIndex: 1 }}>
      <ParticlesComponent />
      <Alert severity="warning" sx={(theme) => ({ marginTop: 10, border: `2px solid ${theme.palette.primary.light}`})}>
        <AlertTitle>Community Takeover (CTO) - Be sure that you are using the right link! https://dapp.fwendy.fun/
        </AlertTitle>
      </Alert>
      <Hero />
    </Box>
  );
}

function Content() {
  const bg = bg_light;
  const bg_black = bg_dark;
  return (
    <Box
      component="main"
      sx={(theme) => ({
        backgroundImage: theme.palette.mode === 'light' ? `url(${bg})` : `url(${bg_black})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexGrow: 1,
        height: '100vh',
        overflowY: 'auto',
      })}
    >
      <Routes>
        <Route path="/" element={<WrapperApp />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/game" element={<Room />} />
        <Route path="/game/demo" element={<Play />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Box>
  );
}

function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const {context} = React.useContext(SolanaContext) as SolanaContextRepository;

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    ThemeHelper.setTheme(mode);
  };

  type CustomThemeProviderProps = {
    children: React.ReactNode;
    mode: PaletteMode;
  };

  const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children, mode }: { children: React.ReactNode, mode: PaletteMode }) => {
    return <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>{children}</ThemeProvider>;
  };

  return (
    <CustomThemeProvider mode={mode}>
      <CssBaseline />
      <Router>
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Content />
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
