import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Alert, AlertTitle } from '@mui/material';
import { PublicKey, clusterApiUrl, Transaction, SystemProgram } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { customColors } from '../../theme/Theme';
import ParticlesComponent from '../../theme/Particles';
import asset from '../../assets/asset.webp';
import { TOKEN_PROGRAM_ID, createTransferInstruction } from '@solana/spl-token';

const Donation: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const walletAddress = 'ErBfYzyL8otbrYvnP2fN9ChH6vwsK7ojmbRuAko7yuUT';
    const { publicKey, signTransaction } = useWallet(); //need to get the balance of sol from user
    const { connection } = useConnection();
    const [selectedToken, setSelectedToken] = useState<string>('');
    const [tokenBalance, setTokenBalance] = useState<number>(0);
    const [tokenAmount, setTokenAmount] = useState<string>('');

    const HanldeButtonDonate = async (donation: string) => {
        setAmount(donation)
        await handleDonate
    }

    const HanldeButtonDonateFwendy = async (donation: string) => {
        setTokenAmount(donation)
        await handleDonateFwendy
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


    const handleDonateFwendy = async () => {
        try {
            const fromWallet = publicKey;
            if (!fromWallet) {
                alert('Please connect your wallet');
                return;
            }
            const tokenAmountInLamports = parseFloat(tokenAmount) * 1e9; // Convert token amount to lamports

            // Indirizzo dell'account SLP per il token Fwendy
            const tokenMintAddress = new PublicKey('C6DjtE9srgmU2EYmVy5DSp6THRoQi5ij2j8b8k5ppump');
            const fwendyTokenAccountAddress = new PublicKey('DDgTffaJh2i8pJ2cYLFSGRzt9hLoyTucvQeMHiyfiGqA');

            const fromTokenAccount = await connection.getTokenAccountsByOwner(fromWallet, { mint: tokenMintAddress });
            if (fromTokenAccount.value.length === 0) {
                alert('Token account not found for the sender');
                return;
            }

            const transaction = new Transaction().add(
                createTransferInstruction(
                    fromTokenAccount.value[0].pubkey,
                    fwendyTokenAccountAddress,
                    fromWallet,
                    tokenAmountInLamports,
                    [],
                    TOKEN_PROGRAM_ID
                )
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

            alert('Token donation successful! Thank you');
        } catch (error) {
            console.error('Token donation failed', error);
            alert('Token donation failed');
        }
    };

    const tokens = [
        { mint: 'C6DjtE9srgmU2EYmVy5DSp6THRoQi5ij2j8b8k5ppump', name: 'Fwendy' },
        // Add more tokens as needed
    ];

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
            overflowY: 'auto',
        })}>
            <ParticlesComponent />

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
            <Box sx={{ zIndex: 1, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ zIndex: 1 }}>
                    <img src={asset} width="100" height="100" alt="Fwendy" style={{ border: '2px solid transparent', borderRadius: '50%' }} />
                </Box>
                <Typography sx={{ zIndex: 1 }} variant="body1" color="white" gutterBottom>
                    dwonate few sol to the fwendy developer
                </Typography>
                <Box width="100%" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
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
                <Typography sx={{ zIndex: 1, mt: 2 }} variant="body1" color="white" gutterBottom>
                    ...or dwonate few $fwendy tokens to the developer
                </Typography>
                <Box width="100%" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
                    <Button variant="contained" onClick={() => HanldeButtonDonateFwendy('100000')}>100k</Button>
                    <Button variant="contained" onClick={() => HanldeButtonDonateFwendy('500000')}>500k</Button>
                    <Button variant="contained" onClick={() => HanldeButtonDonateFwendy('1000000')}>1M 💙</Button>
                    <Button variant="contained" onClick={() => HanldeButtonDonateFwendy('5000000')}>5M 🔥</Button>
                </Box>
                <TextField
                    label="Token Amount"
                    variant="outlined"
                    type="number"
                    value={tokenAmount}
                    onChange={(e: any) => setTokenAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        style: { color: customColors.primaryDark },
                    }}
                    InputProps={{
                        style: { color: customColors.primaryDark, border: `2px solid ${customColors.primaryDark}` },
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleDonateFwendy}>
                    Donate
                </Button>
                <Alert severity="info" sx={(theme) => ({ zIndex: 1, marginTop: 5, border: `2px solid ${theme.palette.primary.light}`, width: '100%' })}>
                    <AlertTitle>Every donation will be used to improve the game, develop new features and maintain the Dapp! Any help will be appreciated 💙
                    </AlertTitle>
                </Alert>
            </Box>
        </Box>
    );
};

export default Donation;