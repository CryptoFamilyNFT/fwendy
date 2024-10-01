import * as React from 'react';
import { IconButton, PaletteMode, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import ToggleColorMode from './ToggleColorMode';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ISolanaContext } from '../helper/ISolanaContext';
import { Link as RouterLink } from 'react-router-dom';
import { Telegram } from '@mui/icons-material';
import TwitterIcon from '@mui/icons-material/Twitter'
import { SolanaContext } from '../helper/SolanaContext';
import { SolanaContextRepository } from '../helper/SolanaContextRepository';
import { IPair } from '../helper/DSHelper';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import SolanaHelper from '../helper/SolanaHelper';
import CloseIcon from '@mui/icons-material/Close';
import { customColors } from '../theme/Theme';
const logoStyle = {
    width: '40px',
    height: 'auto',
    cursor: 'pointer',
    marginLeft: 25,
    border: '2px solid white',
    borderRadius: '50%'
};

interface AppAppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
    const [open, setOpen] = React.useState(false);
    const { context, saveContext } = React.useContext(SolanaContext) as SolanaContextRepository;
    const [ds, setNewPair] = React.useState<IPair[]>([]);
    const { publicKey } = useWallet(); //need to get the balance of sol from user

    function connect() {
        if (publicKey) {

            console.log("Starting connection...");
            SolanaHelper.connect(context, publicKey).then((ctx: any) => {
                console.log("Connector.EtherHelper.connect: ", ctx);
                saveContext(ctx);
                console.log("connection established");
            });
        }
    }

    React.useEffect(() => {
        if (context.isConnected === false && publicKey) {
            connect();
            console.log("Connected");
        }
    }, [context.isConnected, publicKey]);

    React.useEffect(() => {
        const executePairStats = async () => {
            try {
                await SolanaHelper.getPairStats(context);
            } catch (err) {
                console.log("ERROR: ", err);
            }
        };

        if (context) {
            const idPair = setInterval(() => {
                executePairStats();
            }, 5000);
            return () => {
                clearInterval(idPair);
            }
        }
    }, []);

    React.useEffect(() => {
        if (context.pair) {
            setNewPair(context.pair ?? [] as IPair[])
        }
    }, [context.pair])

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    let primary = useTheme().palette.primary.light;
    let dark = useTheme().palette.primary.dark;

    return (
        <div>
            <AppBar
                position="fixed"
                sx={(theme) => ({
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                })}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? theme.palette.primary.dark
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: theme.palette.mode === 'light' ? `2px solid ${primary}` : `2px solid ${dark}`,
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <img
                                src={
                                    'https://dd.dexscreener.com/ds-data/tokens/solana/C6DjtE9srgmU2EYmVy5DSp6THRoQi5ij2j8b8k5ppump.png'
                                }
                                style={logoStyle}
                                alt="logo of fwendy"
                            />
                            <Box sx={{ display: { xs: 'none', md: 'flex', ml: 5 } }}>
                                <MenuItem
                                    component={RouterLink}
                                    to='/'
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color={'white'} sx={{ fontWeight: 'bold' }}>
                                        HOME
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    component={RouterLink}
                                    to='/game'
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color={'white'} sx={{ fontWeight: 'bold' }}>
                                        GAME
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    component={RouterLink}
                                    to='/swap'
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color={'white'} sx={{ fontWeight: 'bold' }}>
                                        SWAP
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    component={RouterLink}
                                    to='/donation'
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color={'white'} sx={{ fontWeight: 'bold' }}>
                                        DONATE
                                    </Typography>
                                </MenuItem>
                                {/*MenuItem
                                    onClick={() => scrollToSection('highlights')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Memes
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('pricing')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        FAQ
                                    </Typography>
                                </MenuItem>*/}
                                <Divider />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <IconButton
                                sx={(theme) => ({ color: theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark })}
                                component="a"
                                href="https://x.com/solfwendy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                sx={(theme) => ({ color: theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark, mr: 2 })}
                                component="a"
                                href="https://t.me/https://t.me/+bCW6NVl-Q3NkMWU1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Telegram />
                            </IconButton>
                            {/* */}
                            {ds !== undefined && ds !== null && (
                                <Typography variant='body1' color={"secondary"}>{ds[0]?.priceUsd}</Typography>
                            )}
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                            {/** user section **/}
                        </Box>
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px', mr: 1 }}
                            >
                                <MenuTwoToneIcon sx={(theme) => ({ color: theme.palette.mode === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.dark })} />
                            </Button>

                            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                                <Box
                                    sx={(theme) => ({
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: theme.palette.mode === 'light' ? customColors.primaryDark : customColors.primary,
                                        flexGrow: 1,

                                    })}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                            gap: 0
                                        }}
                                    >
                                        <IconButton>
                                            <CloseIcon fontSize='large' onClick={() => setOpen(false)} />
                                        </IconButton>


                                    </Box>
                                    <MenuItem
                                        component={RouterLink}
                                        to='/'
                                        sx={{ py: '6px', px: '12px', width: '100', display: 'flex', justifyContent: 'center' }} >
                                        <Button variant="contained" sx={(theme) => ({ width: '300px', color: theme.palette.mode === 'light' ? customColors.primaryDark : customColors.primary })} onClick={() => setOpen(false)}>HOME</Button>
                                    </MenuItem>
                                    <MenuItem
                                        component={RouterLink}
                                        to='/game'
                                        sx={{ py: '6px', px: '12px', width: '100', display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="contained" sx={(theme) => ({ width: '300px', color: theme.palette.mode === 'light' ? customColors.primaryDark : customColors.primary })} onClick={() => setOpen(false)}>GAME</Button>
                                    </MenuItem>
                                    <MenuItem
                                        component={RouterLink}
                                        to='/swap'
                                        sx={{ py: '6px', px: '12px', width: '100', display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="contained" sx={(theme) => ({ width: '300px', color: theme.palette.mode === 'light' ? customColors.primaryDark : customColors.primary })} onClick={() => setOpen(false)}>SWAP</Button>
                                    </MenuItem>
                                    {/*<MenuItem onClick={() => scrollToSection('pricing')}>
                                        Memes
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('pricing')}>
                                        FAQ
                                    </MenuItem>*/}
                                    <Divider />
                                    <MenuItem>
                                        <WalletModalProvider>
                                            <WalletMultiButton />
                                            <WalletDisconnectButton />
                                        </WalletModalProvider>
                                    </MenuItem>
                                    <MenuItem>
                                        <IconButton
                                            sx={(theme) => ({ color: theme.palette.mode === 'dark' ? customColors.primaryDark : customColors.primary })}
                                            component="a"
                                            href="https://t.me/+bCW6NVl-Q3NkMWU1"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Telegram />

                                        </IconButton>
                                        <IconButton sx={{ mt: 0 }}>
                                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                                        </IconButton>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button variant="contained" component={RouterLink} to='/donation' color="primary">
                                            Donation
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        {/* */}
                                        {context && (
                                            <Typography variant='body1' sx={(theme) => ({ color: theme.palette.mode === 'dark' ? customColors.primaryDark : customColors.primary })}>Your Balance: {((context.balanceSol ?? 1) / 1000000000).toFixed(5)} SOL</Typography>
                                        )}
                                    </MenuItem>
                                    <MenuItem>
                                        {/* */}
                                        {context && ds && (
                                            <Typography variant='body1' sx={(theme) => ({ color: theme.palette.mode === 'dark' ? customColors.primaryDark : customColors.primary })}>$FWENDY {ds[0]?.priceUsd}</Typography>
                                        )}
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>{((context.balanceSol ?? 1) / 1000000000).toFixed(5)} SOL</Box>
                        <MenuItem>
                            <WalletModalProvider>
                                {context && (
                                    <WalletMultiButton style={{ backgroundColor: '#F9F9E0', color: '#2B65EC' }} />
                                )}

                            </WalletModalProvider>
                        </MenuItem>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default AppAppBar;