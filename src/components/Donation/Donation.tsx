import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { PublicKey, clusterApiUrl, Transaction, SystemProgram } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { customColors } from '../../theme/Theme';

const Donation: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const walletAddress = 'ErBfYzyL8otbrYvnP2fN9ChH6vwsK7ojmbRuAko7yuUT';
    const { publicKey, signTransaction } = useWallet(); //need to get the balance of sol from user
    const { connection } = useConnection();

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

            alert('Donation successful!');
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
            marginTop: 50,
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
            <Box sx={{ zIndex: 1, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
            <Typography variant="body1" color="white" gutterBottom>
                dwonate few sol to the fwendy developer
            </Typography>
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
            </Box>
        </Box>
    );
};

export default Donation;