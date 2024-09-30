import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Chip, Grid, IconButton, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import asset from "../../assets/asset.webp"
import hero_light from "../../assets/hero_dark.png"
import hero_dark from "../../assets/hero_light.png"
import { DiscountRounded, Telegram, Twitter } from '@mui/icons-material';
import { IPair } from '../../helper/DSHelper';
import { SolanaContextRepository } from '../../helper/SolanaContextRepository';
import { SolanaContext } from '../../helper/SolanaContext';
import { customColors } from '../../theme/Theme';

const BuySellProgress = React.memo(({ buysPerc, sellsPerc, timeline }: { buysPerc: number, sellsPerc: number, timeline: string }) => (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Typography variant="body1" color="white" sx={{ fontWeight: 'bold' }}>{timeline}</Typography>
        <Box sx={(theme) => ({ flex: buysPerc > 0 ? buysPerc : 5, backgroundColor: theme.palette.mode === 'light' ? customColors.primaryDark : theme.palette.primary.light, borderRadius: '5px 0 0 5px', height: 20, position: 'relative' })}>
            <Typography variant="caption" sx={(theme) => ({
                color: theme.palette.mode === 'light' ? '#000' : '#000',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontWeight: 'bold'
            })}>
                {buysPerc.toFixed(0)}%
            </Typography>
        </Box>
        <Box sx={{ flex: sellsPerc > 0 ? sellsPerc : 5, backgroundColor: 'red', borderRadius: '0 5px 5px 0', height: 20, position: 'relative' }}>
            <Typography variant="caption" sx={(theme) => ({
                color: theme.palette.mode === 'light' ? '#000' : '#000',
                position: 'absolute',
                right: '50%',
                transform: 'translateX(50%)',
                fontWeight: 'bold'
            })}>
                {sellsPerc.toFixed(0)}%
            </Typography>
        </Box>
    </Box>
));


const Hero = () => {
    let primary = useTheme().palette.primary.light;
    let dark = useTheme().palette.primary.dark;
    const { context, saveContext } = React.useContext(SolanaContext) as SolanaContextRepository;
    const [pairData, setNewPair] = useState<IPair[]>([]);
    const { pair: data } = context;

    React.useEffect(() => {
        if (data && context.pair) {
            setNewPair(context.pair ?? [] as IPair[])
        }
    }, [context.pair, data]);

    const buys_5m = pairData?.[0]?.txns.h24.buys ?? 0;
    const sells_5m = pairData?.[0]?.txns.h24.sells ?? 0;
    const buys_1h = pairData?.[0]?.txns.h1.buys ?? 0;
    const sells_1h = pairData?.[0]?.txns.h1.sells ?? 0;
    const buys_6h = pairData?.[0]?.txns.h6.buys ?? 0;
    const sells_6h = pairData?.[0]?.txns.h6.sells ?? 0;
    const buys_24h = pairData?.[0]?.txns.h24.buys ?? 0;
    const sells_24h = pairData?.[0]?.txns.h24.sells ?? 0;

    function calculatePercentage(buys: number, sells: number) {
        const total = buys + sells;
        const buyPerc = total > 0 ? (buys / total) * 100 : 0;
        const sellPerc = total > 0 ? (sells / total) * 100 : 0;
        return { buyPerc, sellPerc };
    }

    const { buyPerc: buyPerc5m, sellPerc: sellPerc5m } = calculatePercentage(buys_5m, sells_5m);
    const { buyPerc: buyPerc1h, sellPerc: sellPerc1h } = calculatePercentage(buys_1h, sells_1h);
    const { buyPerc: buyPerc6h, sellPerc: sellPerc6h } = calculatePercentage(buys_6h, sells_6h);
    const { buyPerc: buyPerc24h, sellPerc: sellPerc24h } = calculatePercentage(buys_24h, sells_24h);

    return (
        <Grid container sx={(theme) => ({
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0, 0.2)' : 'rgba(0,0,0, 0.2)',
            height: 'auto',
            backgroundSize: "cover",
            border: theme.palette.mode === 'light' ? `2px solid ${primary}` : `2px solid ${dark}`,
            borderRadius: theme.spacing(1),
            marginTop: 0,
            boxShadow: theme.palette.mode === 'light' ? '0 0 1px rgba(85, 166, 246, 0.1),1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)' : '0 0 1px rgba(85, 166, 246, 0.1),1px 1.5px 2px -1px rgba(85, 166, 246, 0.15),4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)',
            alignItems: 'center',
            gap: 10,
            position: 'relative',
            padding: 2,
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

            <Grid item xs={12} sm={6} md={6} sx={{ alignItems: 'center', textAlign: 'center', mt: 10, zIndex: 1 }}>
                <Box style={{ zIndex: 10 }}>
                    <img
                        alt=""
                        style={{
                            border: `2px solid ${dark}`,
                            borderRadius: '50%',
                            animation: "bounce 2s ease-in-out infinite"
                        }}
                        src={asset}
                        width={200}
                        height="auto"
                    />
                    <Typography
                        variant="h3"
                        sx={(theme) => ({
                            mt: 5,
                            color: theme.palette.mode === 'light' ? primary : dark,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                            WebkitTextStroke: '2px white',
                            fontFamily: 'Permanent Marker, cursive'
                            //transform: 'rotate(-5deg)',
                            //animation: 'wiggle 1s ease-in-out infinite'
                        })}
                    >
                        FWENDY
                    </Typography>
                    {/*<style>
                        {`
                    @keyframes wiggle {
                        0%, 100% {
                            transform: rotate(-5deg);
                        }
                        50% {
                            transform: rotate(5deg);
                        }
                    }
                    `}
                    </style>*/}
                    <Typography variant="h4" sx={(theme) => ({
                        mt: 2, color: theme.palette.mode === 'dark' ? primary : 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
                    })}>
                        FWENDY, the gwurl FWOG so like, he got FWEND ZONED.
                    </Typography>
                </Box>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    marginTop: 20
                }}>
                    <Button variant="contained" component={RouterLink} to='/swap' color="primary">
                        Swap
                    </Button>
                    <Button variant="contained" component={RouterLink} to='/' color="primary">
                        Home
                    </Button>
                    <Button variant="contained" component={RouterLink} to='/game' color="primary">
                        Game
                    </Button>
                    <Button variant="contained" component={RouterLink} to='/donation' color="primary">
                        Donation
                    </Button>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                    marginTop: 20
                }}>
                    <IconButton
                        color="secondary"
                        component="a"
                        href="https://t.me/+bCW6NVl-Q3NkMWU1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Twitter />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        component="a"
                        href="https://x.com/solfwendy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Telegram />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        component="a"
                        href="https://solscan.io/token/C6DjtE9srgmU2EYmVy5DSp6THRoQi5ij2j8b8k5ppump"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <DiscountRounded />
                    </IconButton>
                </div>

            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ alignItems: 'center', textAlign: 'center', mt: 10, zIndex: 1 }}>
                <Box sx={(theme) => ({ backgroundColor: 'rgba(0,0,0, 0.5)', width: '100%', padding: 2, border: theme.palette.mode === 'light' ? `2px solid ${theme.palette.primary.dark}` : `2px solid ${theme.palette.primary.light}`, borderRadius: '5%', gap: 2 })}>
                    <Box sx={{ alignItems: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' })}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                LP
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
                                ${pairData ? pairData[0]?.liquidity?.usd : 'N/A'}
                            </Typography>
                        </Box>
                        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' })}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                MC
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>${pairData ? pairData[0]?.fdv : 0}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ alignItems: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' })}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                PRICE USD
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
                                ${pairData ? pairData[0]?.priceUsd : 'N/A'}
                            </Typography>
                        </Box>
                        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' })}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                PRICE
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>${pairData ? pairData[0]?.priceNative : 0}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="h6" color="white" sx={(theme) => ({ fontWeight: 'bold', color: "whitesmoke" })}>PRICE</Typography>
                    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' }}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                5M
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', color: Number(pairData?.[0]?.priceChange.h24 ?? 0) >= 0 && pairData && !pairData[0]?.priceChange.m5.toString().includes('-') ? '#26E600' : 'red' }}>{pairData?.[0]?.priceChange.m5 ?? 'N/A'}%</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' }}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                1H
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', color: Number(pairData?.[0]?.priceChange.h24 ?? 0) >= 0 && pairData && !pairData[0]?.priceChange.h1.toString().includes('-') ? '#26E600' : 'red' }}>{pairData?.[0]?.priceChange.h1 ?? 'N/A'}%</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' }}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                6H
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', color: Number(pairData?.[0]?.priceChange.h24 ?? 0) >= 0 && pairData && !pairData[0]?.priceChange.h6.toString().includes('-') ? '#26E600' : 'red' }}>{pairData?.[0]?.priceChange.h6 ?? 'N/A'}%</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' }}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                24H
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', color: Number(pairData?.[0]?.priceChange.h24 ?? 0) >= 0 && pairData && !pairData[0]?.priceChange.h24.toString().includes('-') ? '#26E600' : 'red' }}>{pairData?.[0]?.priceChange.h24 ?? 'N/A'}%</Typography>
                        </Box>
                    </Box>
                    <Typography variant="h6" color="white" sx={(theme) => ({ fontWeight: 'bold', color: "whitesmoke" })}>VOLUME</Typography>
                    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' }}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                5M
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', color: Number(pairData?.[0]?.priceChange.h24 ?? 0) >= 0 && pairData && !pairData[0]?.priceChange.m5.toString().includes('-') ? '#26E600' : '#26E600' }}>${pairData?.[0]?.volume.m5 ?? 'N/A'}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' }}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                1H
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', color: Number(pairData?.[0]?.priceChange.h24 ?? 0) >= 0 && pairData && !pairData[0]?.priceChange.h1.toString().includes('-') ? '#26E600' : '#26E600' }}>${pairData?.[0]?.volume.h1 ?? 'N/A'}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' }}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                6H
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', color: Number(pairData?.[0]?.priceChange.h24 ?? 0) >= 0 && pairData && !pairData[0]?.priceChange.h6.toString().includes('-') ? '#26E600' : '#26E600' }}>${pairData?.[0]?.volume.h6 ?? 'N/A'}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, gap: 1, width: '100%', borderRadius: '10%' }}>
                            <Chip label={<Typography variant="body1" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'light' ? '#fff' : '#000' })}>
                                24H
                            </Typography>} color="primary" variant="filled" />
                            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', color: Number(pairData?.[0]?.priceChange.h24 ?? 0) >= 0 && pairData && !pairData[0]?.priceChange.h24.toString().includes('-') ? '#26E600' : '#26E600' }}>${pairData?.[0]?.volume.h24 ?? 'N/A'}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>TXS</Typography>
                        <BuySellProgress buysPerc={buyPerc5m} sellsPerc={sellPerc5m} timeline={'5m'} />
                        <BuySellProgress buysPerc={buyPerc1h} sellsPerc={sellPerc1h} timeline={'1h'} />
                        <BuySellProgress buysPerc={buyPerc6h} sellsPerc={sellPerc6h} timeline={'6h'} />
                        <BuySellProgress buysPerc={buyPerc24h} sellsPerc={sellPerc24h} timeline={'24h'} />
                    </Box>
                </Box>
            </Grid>
        </Grid >
    );
};

export default Hero;