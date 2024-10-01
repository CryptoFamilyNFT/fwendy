import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Alert, AlertTitle } from '@mui/material';
import { PublicKey, clusterApiUrl, Transaction, SystemProgram } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { customColors } from '../../theme/Theme';
import ParticlesComponent from '../../theme/Particles';
import asset from '../../assets/asset.webp';
const Donation: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const walletAddress = 'ErBfYzyL8otbrYvnP2fN9ChH6vwsK7ojmbRuAko7yuUT';
    const { publicKey, signTransaction } = useWallet(); //need to get the balance of sol from user
    const { connection } = useConnection();

    const HanldeButtonDonate = async (donation: string) => {
        setAmount(donation)
        await handleDonate
    }

    const handleDonate = async () => {
        try {
            const fromWallet = publicKey; // Assuming Phantom wallet is used
            if (!fromWallet) {
                alert('Please connect your wallet');
                return;
            }
            const toWallet = new PublicKey(walletAddress);
            const lamports = parseFloat(amount) * 1e9; // Convert SOL to lamports

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: fromWallet,
                    toPubkey: toWallet,
                    lamports,
                })
            );

            const { blockhash } = await connection.getRecentBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = fromWallet;

            if (!signTransaction) {
                alert('Please connect your wallet');
                return;
            }
            const signedTransaction = await signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            await connection.confirmTransaction(signature, 'processed');

            alert('Donation successful! Twhank ywou');
        } catch (error) {
            console.error('Donation failed', error);
            alert('Donation failed');
        }
    };

    return (
        <Box sx={(theme) => ({
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0, 0.2)' : 'rgba(0,0,0, 0.2)',
            height: 'auto',
            backgroundSize: "cover",
            border: theme.palette.mode === 'light' ? `2px solid ${customColors.primaryDark}` : `2px solid ${customColors.primary}`,
            borderRadius: theme.spacing(1),
            marginTop: 15,
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
            <ParticlesComponent />
            <Box sx={{ zIndex: 1, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                <Box>
                    <img src={asset} width="300" height="300" alt="Fwendy" style={{border: '2px solid transparent', borderRadius: '50%'}} />
                </Box>
                <Typography variant="body1" color="white" gutterBottom>
                    dwonate few sol to the fwendy developer
                </Typography>
                <Box width="100%" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2}}>
                    <Button variant="contained" onClick={() => HanldeButtonDonate('0.1')}>0.1 SOL</Button>
                    <Button variant="contained" onClick={() => HanldeButtonDonate('0.5')}>0.5 SOL</Button>
                    <Button variant="contained" onClick={() => HanldeButtonDonate('1')}>1 SOL 💙</Button>
                    <Button variant="contained" onClick={() => HanldeButtonDonate('5')}>5 SOL 🔥</Button>
                </Box>
                <TextField
                    label="Amount (SOL)"
                    variant="outlined"
                    type="number"
                    value={amount}
                    onChange={(e: any) => setAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        style: { color: customColors.primaryDark },
                    }}
                    InputProps={{
                        style: { color: customColors.primaryDark, border: `2px solid ${customColors.primaryDark}` },
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleDonate}>
                    Donate
                </Button>
                <Alert severity="info" sx={(theme) => ({ marginTop: 10, border: `2px solid ${theme.palette.primary.light}`, width: '100%' })}>
                    <AlertTitle>Every donation will be used to improve the game, develop new features and maintain the Dapp! Any help will be appreciated 💙
                    </AlertTitle>
                </Alert>
            </Box>
        </Box>
    );
};

export default Donation;