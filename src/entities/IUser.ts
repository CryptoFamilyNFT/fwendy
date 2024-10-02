import { PublicKey } from "@solana/web3.js";

export interface IUser {
    user?: string,
    address?: string,
    balanceSol?: number,
    balancefwendy?: number,
    isConnected?: boolean,
    publicKey?: PublicKey,
}