/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { customColors } from '../../theme/Theme';
import Game from './game/Game';
import GetReady from './game/assets/images/getready.png'
import bg from './game/assets/images/bg.png'

const WrapScene: React.FC = () => {
    return (
        <Game/>
    )
}

const Play: React.FC = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const startGame = () => {
        setIsGameStarted(true);
    };

    React.useEffect(() => {
        if (isGameStarted) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === ' ') {
                    setIsGameStarted(false);
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };

        }
    },[isGameStarted]);

    return (
        <Grid container sx={(theme) => ({
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0, 0.2)' : 'rgba(0,0,0, 0.2)',
            height: 'auto',
            minHeight: '80vh',
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
            overflowY: 'auto',
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
            <Grid item xs={12} sm={6} md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, zIndex: 1 }}>
                {!isGameStarted && (
                    <Box
                        onClick={startGame}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundImage: `url(${bg})`,
                            width: '288px',
                            height: '612px',
                        }}>
                        <img src={GetReady} alt="Get Ready" onClick={startGame} />
                    </Box>
                )}
                {isGameStarted && <WrapScene />}
            </Grid>
        </Grid >
    );
};

export default Play;