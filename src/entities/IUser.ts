import { PublicKey } from "@solana/web3.js";

export interface IUser {
    user?: string,
    address?: string,
    balanceSol?: number,
    balancePapery?: number,
    isConnected?: boolean,
    publicKey?: PublicKey,
}