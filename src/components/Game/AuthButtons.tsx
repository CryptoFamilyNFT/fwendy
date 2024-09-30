import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { customColors } from '../../theme/Theme';
import fwing from '../../assets/fwingjpg.jpg';
import { SolanaContext } from '../../helper/SolanaContext';
import { SolanaContextRepository } from '../../helper/SolanaContextRepository';
import { NavLink } from 'react-router-dom';

interface AuthButtonsProps {
    onLogin: () => void;
    onSignup: () => void;
    onDemo: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onLogin, onSignup, onDemo }) => {

    const { context, saveContext } = React.useContext(SolanaContext) as SolanaContextRepository;
    console.log("CONTEXT ON AUTHBUTTONS", context);

    return (
        <Box
            height="400px"
            mt={7}
            borderRadius={4}
            boxShadow={3}
            position="relative" // Ensure the Box is the relative parent for absolute positioning inside it
            sx={(theme) => ({
                backgroundImage: `url(${fwing})`,
                backgroundSize: 'cover', // Ensures the image covers the Box completely
                border: theme.palette.mode === 'light'
                    ? `4px solid ${customColors.primary}`
                    : `4px solid ${customColors.primaryDark}`,
            })}
        >
            {/* Overlay div with absolute positioning */}
            <div style={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(7px)',
                zIndex: 0,
                borderRadius: 10,
            }}></div>

            {/* Content box with higher zIndex */}
            <Box
                zIndex={10} // Ensures this content appears above the overlay
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%" // Makes sure the content is centered within the full height of the Box
                p={4}
            >
                <Box sx={{ zIndex: 11 }}>
                    <Typography variant="h4" gutterBottom color="white">
                        Welcome {context.address?.slice(0, 4)}...{context.address?.slice(-4)} to Flappy Fwendy!
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" gap={2}>
                    <Button variant="outlined" color="primary" onClick={() => null}>
                        Settings
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => null}>
                        Play
                    </Button>
                </Box>
                <Box display="flex" flexDirection="row" mt={2}>
                    <Button variant="contained" color="success">
                        <NavLink to='/game/demo'>Play Demo</NavLink>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AuthButtons;
