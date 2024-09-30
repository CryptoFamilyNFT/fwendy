import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material';
import ThemeProvider from '@mui/material';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import SolanaHelper from './helper/SolanaHelper';
import SolanaProvider from './helper/SolanaProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const wallets = SolanaHelper.getNetwork().wallets;

root.render(
  <ConnectionProvider endpoint={"https://crimson-powerful-rain.solana-mainnet.quiknode.pro/090a977fa8eab2fc820e9ba79b469ac0da44e227"}>
    <SolanaProvider>
      <WalletProvider wallets={wallets()} autoConnect>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </WalletProvider>
    </SolanaProvider>
  </ConnectionProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
