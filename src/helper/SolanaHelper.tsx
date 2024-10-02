/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISolanaContext } from "./ISolanaContext";
import AddressFactory from "../common/AddressFactory";
import { IUser } from "../entities/IUser";
import { IToast } from "../entities/IToast";
import { Adapter } from '@solana/wallet-adapter-base';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { AccountInfo, Connection, GetProgramAccountsFilter, GetProgramAccountsResponse, PublicKey } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Liquidity, Percent, Token, TokenAmount, TOKEN_PROGRAM_ID, SPL_ACCOUNT_LAYOUT, TokenAccount, LIQUIDITY_VERSION_TO_STATE_LAYOUT, LiquidityAssociatedPoolKeys, LIQUIDITY_STATE_LAYOUT_V4, LIQUIDITY_STATE_LAYOUT_V5, GetMultipleAccountsInfoConfig, MarketState, getMultipleAccountsInfo, MARKET_STATE_LAYOUT_V3, LiquidityStateV5, LiquidityStateV4, LiquidityPoolKeysV4, MarketStateLayoutV3, MarketStateLayout, jsonInfo2PoolKeys, Market, MARKET_VERSION_TO_STATE_LAYOUT } from "@raydium-io/raydium-sdk";
import DSHelper, { IPair } from "./DSHelper";

declare global {
    interface Window {
        Solanaeum?: any;
    }
}

interface DataNet {
    network: Connection;
    wallets: () => Adapter[];
}

interface LiquidityPoolKeys {
    id: string;
    baseMint: string;
    quoteMint: string;
    lpMint: string;
    baseDecimals: number;
    quoteDecimals: number;
    lpDecimals: number;
    version: 4;
    programId: string;
    authority: string;
    openOrders: string;
    targetOrders: string;
    baseVault: string;
    quoteVault: string;
    withdrawQueue: string;
    lpVault: string;
    marketVersion: 3;
    marketProgramId: string;
    marketId: string;
    marketAuthority: string;
    marketBaseVault: string;
    marketQuoteVault: string;
    marketBids: string;
    marketAsks: string;
    marketEventQueue: string;
    lookupTableAccount: string;
}

interface ILIQ {
    unOfficial: any,
    official: any
}

interface DataNet {
    network: Connection;
    wallets: () => Adapter[];
}

interface Window {
    Solanaeum?: any;
}

interface IAsset {
    name: string;
    symbol: string;
    address: string;
    logo: string;
    disabled: boolean;
}

const { Solanaeum } = window;

class LinkFactory {
    static getTransctionLink(txHash: string, chainId?: number, name?: string) {
        return this.getLink(name ?? 'Transaction HASH', `${chainId === 11155111 ? 'testnet: ' : ''}tx => ${txHash}`);
    }

    static getLink(name: string, url: string) {
        return { name: name, url: url };
    }
}

type Listener = (...args: Array<any>) => void;

export default class SolanaHelper {

    public static getChainId(): number { return process.env.REACT_APP_CHAINID ? Number(process.env.REACT_APP_CHAINID) : 137; }

    public static fwendy_SOL_LP_V4_POOL_KEY = '579KdT9okDg9BC3ptNH6sj359qzs581SQiGDbEqM4iVJ';
    public static RAYDIUM_LIQUIDITY_JSON = 'https://api.raydium.io/v4/sdk/liquidity/mainnet.json';
    static RAYDIUM_V4_PROGRAM_ID = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'

    public static initialAccount(): IUser {
        return {
            balanceSol: 0,
            balancefwendy: 0,
            connected: false
        } as IUser;
    }

    public static initialToast(): IToast {
        return {
            toastId: undefined,
            toastDescription: '',
            toastStatus: "success",
            toastTitle: '',
            toastLink: undefined
        } as IToast;
    }

    public static async initProvider(): Promise<Connection> {
        const network = new Connection("https://solana-mainnet.core.chainstack.com/b963a6e2efa9342dcb953d8087f458cd", { wsEndpoint: "wss://solana-mainnet.core.chainstack.com/b963a6e2efa9342dcb953d8087f458cd" });
        return network;
    }

    public static async connect(context: ISolanaContext, publicKey: PublicKey): Promise<ISolanaContext> {
        if (!publicKey) return context;
        const address = publicKey.toBase58();
        context = { ...context, address: address, publicKey: publicKey, isConnected: true };
        context = await this.querySignerInfo(context);
        console.log("Connection.SolanaHelper.context: ", context)
        return context;
    }

    public static async getPairStats(context: ISolanaContext): Promise<ISolanaContext> {
        const dsHelper = new DSHelper();
        const tokenInfoPair = await dsHelper.getTokenInfo(AddressFactory.getTokenAddress(102))
            .then((res) => res as IPair[]);
        context.pair = tokenInfoPair;
        return context;
    }

    public static async getBalances(publicKey: PublicKey, connection: Connection, context: ISolanaContext): Promise<number[]> {
        const tokenProgram = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

        async function getTokenAccounts(wallet: string): Promise<number[]> {
            const filters: GetProgramAccountsFilter[] = [
                { dataSize: 165 },
                { memcmp: { offset: 32, bytes: wallet } }
            ];

            const accounts = await connection.getParsedProgramAccounts(tokenProgram, { filters });
            const userBalancefwendy = accounts.map((account) => {
                const parsedAccountInfo: any = account.account.data;
                const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
                return tokenBalance;
            });

            return userBalancefwendy;
        }

        async function getBalances(): Promise<number[]> {
            const balance_ = await connection.getBalance(publicKey);
            const fwendyBalance: number[] = await getTokenAccounts(publicKey.toString());
            return [balance_, fwendyBalance[0]];
        }

        const balances = getBalances() ?? [0, 0];
        console.log("ISolanaHelper.Balances: ", balances)
        return balances;
    }

    public static getNetwork(): DataNet {
        const network = new Connection("https://solana-mainnet.core.chainstack.com/b963a6e2efa9342dcb953d8087f458cd", { wsEndpoint: "wss://solana-mainnet.core.chainstack.com/b963a6e2efa9342dcb953d8087f458cd" });
        const wallets = () => [new SolflareWalletAdapter()] as Adapter[];
        const data: DataNet = { network, wallets };
        return data;
    }

    public static async fetchAllPoolKeys(
        connection: Connection,
        programId: PublicKey,
        config?: GetMultipleAccountsInfoConfig,
    ): Promise<LiquidityPoolKeysV4[]> {
        const layout = LIQUIDITY_VERSION_TO_STATE_LAYOUT[4];

        try {
            const accounts = await connection.getProgramAccounts(programId, {
                filters: [{ dataSize: layout.span }],
            });

            const allPools = accounts.map((info) => ({
                id: info.pubkey,
                version: 4,
                programId: programId,
                ...layout.decode(info.account.data),
            }));

            const allMarketIds = allPools.map((i) => i.marketId);
            const marketsInfo: { [marketId: string]: MarketState } = {};

            try {
                const _marketsInfo = await getMultipleAccountsInfo(connection, allMarketIds, config);
                for (const item of _marketsInfo) {
                    if (item === null) continue;
                    const _i = { programId: item.owner, ...MARKET_STATE_LAYOUT_V3.decode(item.data) };
                    marketsInfo[_i.ownAddress.toString()] = _i;
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Failed to fetch markets', { message: error.message });
                }
            }

            const authority = Liquidity.getAssociatedAuthority({ programId }).publicKey;

            const formatPoolInfos: LiquidityPoolKeysV4[] = allPools
                .map((pool) => {
                    if (pool === undefined || pool.baseMint.equals(PublicKey.default)) return undefined;

                    const market = marketsInfo[pool.marketId.toString()];
                    if (!market) return undefined;

                    return {
                        id: pool.id,
                        baseMint: pool.baseMint,
                        quoteMint: pool.quoteMint,
                        lpMint: pool.lpMint,
                        baseDecimals: pool.baseDecimal.toNumber(),
                        quoteDecimals: pool.quoteDecimal.toNumber(),
                        lpDecimals: pool.baseDecimal.toNumber(),
                        version: pool.version,
                        programId: pool.programId,
                        authority: authority,
                        openOrders: pool.openOrders,
                        targetOrders: pool.targetOrders,
                        baseVault: pool.baseVault,
                        quoteVault: pool.quoteVault,
                        marketVersion: 3,
                        marketProgramId: new PublicKey("579KdT9okDg9BC3ptNH6sj359qzs581SQiGDbEqM4iVJ"),
                        marketId: market.ownAddress,
                        marketAuthority: Liquidity.getAssociatedAuthority({ programId: new PublicKey("579KdT9okDg9BC3ptNH6sj359qzs581SQiGDbEqM4iVJ") }).publicKey,
                        marketBaseVault: market.baseVault,
                        marketQuoteVault: market.quoteVault,
                        marketBids: market.bids,
                        marketAsks: market.asks,
                        marketEventQueue: market.eventQueue,
                        withdrawQueue: (pool as LiquidityStateV4).withdrawQueue,
                        lpVault: (pool as LiquidityStateV4).lpVault,
                        lookupTableAccount: PublicKey.default,
                    } as LiquidityPoolKeysV4;
                })
                .filter((pool): pool is LiquidityPoolKeysV4 => pool !== undefined);

            return formatPoolInfos;
        } catch (error) {
            console.error("Errore durante il recupero degli account del programma:", error);
            return [];
        }
    }

    private static async _getProgramAccounts(connection: Connection, baseMint: PublicKey, quoteMint: PublicKey): Promise<GetProgramAccountsResponse> {
        const layout = LIQUIDITY_STATE_LAYOUT_V4;

        return connection.getProgramAccounts(new PublicKey(SolanaHelper.RAYDIUM_V4_PROGRAM_ID), {
            filters: [
                { dataSize: layout.span },
                {
                    memcmp: {
                        offset: layout.offsetOf('baseMint'),
                        bytes: baseMint.toBase58(),
                    },
                },
                {
                    memcmp: {
                        offset: layout.offsetOf('quoteMint'),
                        bytes: quoteMint.toBase58(),
                    },
                },
            ],
        });
    }

    public static async getProgramAccounts(connection: Connection, baseMint: PublicKey, quoteMint: PublicKey): Promise<GetProgramAccountsResponse> {
        const response = await Promise.all([
            this._getProgramAccounts(connection, baseMint, quoteMint),
            this._getProgramAccounts(connection, quoteMint, baseMint),
        ]);

        return response.filter((r) => r.length > 0)[0] || [];
    }

    public static async getPoolInfo(connection: Connection): Promise<LiquidityPoolKeysV4 | undefined> {
        try {
            const layout = LIQUIDITY_STATE_LAYOUT_V4;

            const info = await connection.getAccountInfo(new PublicKey(this.fwendy_SOL_LP_V4_POOL_KEY));
            if (!info) return;
            const poolState = LIQUIDITY_STATE_LAYOUT_V4.decode(info.data) as LiquidityStateV4;

            const programData = await this.getProgramAccounts(connection, poolState.baseMint, poolState.quoteMint);

            const collectedPoolResults = programData
                .map((info) => ({
                    id: new PublicKey(info.pubkey),
                    version: 4,
                    programId: new PublicKey(SolanaHelper.RAYDIUM_V4_PROGRAM_ID),
                    ...layout.decode(info.account.data),
                }))
                .flat();

            const pool = collectedPoolResults[0];

            const marketState = await connection.getAccountInfo(poolState.marketId).then((item: AccountInfo<Buffer> | null) => ({
                programId: item?.owner,
                ...MARKET_STATE_LAYOUT_V3.decode(item?.data ?? {} as Buffer),
            }));

            if (!marketState) return undefined;

            const authority = Liquidity.getAssociatedAuthority({
                programId: new PublicKey(SolanaHelper.RAYDIUM_V4_PROGRAM_ID),
            }).publicKey;

            const marketProgramId: PublicKey = marketState.programId ?? PublicKey.default;

            const jsonPool = {
                id: pool.id,
                baseMint: pool.baseMint,
                quoteMint: pool.quoteMint,
                lpMint: pool.lpMint,
                baseDecimals: Number.parseInt(pool.baseDecimal.toString()),
                quoteDecimals: Number.parseInt(pool.quoteDecimal.toString()),
                lpDecimals: Number.parseInt(pool.baseDecimal.toString()),
                version: pool.version,
                programId: pool.programId,
                openOrders: pool.openOrders,
                targetOrders: pool.targetOrders,
                baseVault: pool.baseVault,
                quoteVault: pool.quoteVault,
                marketVersion: 3,
                authority: authority,
                marketProgramId,
                marketId: marketState.ownAddress,
                marketAuthority: Market.getAssociatedAuthority({
                    programId: marketProgramId,
                    marketId: marketState.ownAddress,
                }).publicKey,
                marketBaseVault: marketState.baseVault,
                marketQuoteVault: marketState.quoteVault,
                marketBids: marketState.bids,
                marketAsks: marketState.asks,
                marketEventQueue: marketState.eventQueue,
                withdrawQueue: pool.withdrawQueue,
                lpVault: pool.lpVault,
                lookupTableAccount: PublicKey.default,
            } as LiquidityPoolKeysV4;

            return jsonPool;
        } catch (error) {
            console.error("Error fetching pool info:", error);
            return undefined;
        }
    }

    public static async getTokenAccountsByOwner(
        connection: Connection,
        owner: PublicKey,
    ): Promise<TokenAccount[]> {
        const tokenResp = await connection.getTokenAccountsByOwner(
            owner,
            { programId: TOKEN_PROGRAM_ID },
        );

        const accounts: TokenAccount[] = [];

        for (const { pubkey, account } of tokenResp.value) {
            accounts.push({
                pubkey,
                accountInfo: SPL_ACCOUNT_LAYOUT.decode(account.data),
                programId: TOKEN_PROGRAM_ID
            });
        }

        return accounts;
    }

    public static async calcAmountOut(connection: Connection, poolKeys: LiquidityPoolKeysV4, rawAmountIn: number, swapInDirection: boolean, slippage_: number | number[]): Promise<any> {
        const poolInfo = await Liquidity.fetchInfo({ connection, poolKeys });
        let currencyInMint = poolKeys.baseMint;
        let currencyInDecimals = poolInfo.baseDecimals;
        let currencyOutMint = poolKeys.quoteMint;
        let currencyOutDecimals = poolInfo.quoteDecimals;

        if (swapInDirection === false) {
            currencyInMint = poolKeys.quoteMint;
            currencyInDecimals = poolInfo.quoteDecimals;
            currencyOutMint = poolKeys.baseMint;
            currencyOutDecimals = poolInfo.baseDecimals;
        }

        const currencyIn = new Token(poolKeys.programId, currencyInMint, currencyInDecimals);
        const amountIn = new TokenAmount(currencyIn, rawAmountIn, false);
        const currencyOut = new Token(poolKeys.programId, currencyOutMint, currencyOutDecimals);
        const slippage = new Percent(slippage_, 100);

        const {
            amountOut,
            minAmountOut,
            currentPrice,
            executionPrice,
            priceImpact,
            fee,
        } = Liquidity.computeAmountOut({ poolKeys, poolInfo, amountIn, currencyOut, slippage });

        return {
            amountIn,
            amountOut,
            minAmountOut,
            currentPrice,
            executionPrice,
            priceImpact,
            fee,
        };
    }

    public static async querySignerInfo(context: ISolanaContext, _ipublicKey?: PublicKey, connection?: Connection): Promise<ISolanaContext> {
        if (!context.publicKey) return context;
        const provider = await this.initProvider();
        let signer: PublicKey | undefined = context.publicKey;

        if (_ipublicKey) {
            signer = _ipublicKey;
        }

        console.log("init querySignerInfo... ")

        if (signer) {
            const balances = await this.getBalances(signer, provider, context)
                .then((res) => {
                    context.balancefwendy = res[1];
                    context.balanceSol = res[0];
                })
                .catch((error: any) => {
                    console.error("Solanahelper.querySignerInfo.Error_fetching_balances:", error);
                });

            await Promise.all([balances]);

            console.log("estabilished querySignerInfo... ")

            return context;
        }

        return context;
    }

    public static async queryProviderInfo(context: ISolanaContext): Promise<ISolanaContext> {
        if (context.loaded && !context.reload) return context;

        const provider = await SolanaHelper.initProvider();
        //const signer = await provider.getAccountInfo(new PublicKey(context.address ?? ''))

        //await Promise.all([]);

        return context;
    }

    public static connectChainListener(chainChanged: Listener) {
        Solanaeum?.on('chainChanged', chainChanged);
    }

    public static connectAccountListener(accountsChanged: Listener) {
        Solanaeum?.on('accountsChanged', accountsChanged);
    }

    public static connectErrorListener(error: Listener) {
        Solanaeum?.on("error", error);
    }

    public static disconnectListeners() {
        Solanaeum?.removeAllListeners();
    }
}