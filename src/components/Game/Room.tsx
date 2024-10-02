import React from 'react';
import { Box, Grid } from '@mui/material';
import { customColors } from '../../theme/Theme';
import Leaderboard from './Leaderboard';
import AuthButtons from './AuthButtons';

const Room = () => {

    const handleLogin = () => {
        console.log('Login cliccato');
        // Qui va la logica per il login //todo organize the log with wallet
    };

    const handleSignup = () => {
        console.log('Signup cliccato');
        // Qui va la logica per il signup  //todo organize the db for user leaderboard and score
    };

    const handleDemo = () => {
        console.log('Prova la Demo cliccato');
        // Qui va la logica per provare la demo del gioco - //todo organize the demo
    };

    return (
        <Grid container sx={(theme) => ({
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0, 0.2)' : 'rgba(0,0,0, 0.2)',
            height: 'auto',
            minHeight: '75vh',
            backgroundSize: "cover",
            border: theme.palette.mode === 'light' ? `2px solid ${customColors.primaryDark}` : `2px solid ${customColors.primary}`,
            borderRadius: theme.spacing(1),
            marginTop: theme.spacing(15),
            boxShadow: theme.palette.mode === 'light' ? '0 0 1px rgba(85, 166, 246, 0.1),1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)' : '0 0 1px rgba(85, 166, 246, 0.1),1px 1.5px 2px -1px rgba(85, 166, 246, 0.15),4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)',
            alignItems: 'center',
            gap: 10,
            position: 'relative',
            padding: 5,
            display: 'flex',
            flexDirection: 'row',
        })}>
            <div style={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(5px)',
                zIndex: 0,
                borderRadius: 10,
            }}></div>
            <Grid item xs={12} sm={6} md={6} sx={{ alignItems: 'center', textAlign: 'center', mt: 2, zIndex: 1 }}>
                <Box style={{ zIndex: 10 }}>
                    <Leaderboard />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={5} sx={{ alignItems: 'center', textAlign: 'center', mt: 2, zIndex: 1 }}>
                <Box style={{ zIndex: 10 }}>
                    <AuthButtons onLogin={handleLogin} onSignup={handleSignup} onDemo={handleDemo} />
                </Box>
            </Grid>
        </Grid>
    )
};

export default Room;