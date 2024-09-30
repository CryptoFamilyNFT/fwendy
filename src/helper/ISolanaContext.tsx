import { ILink } from "../entities/ILink";
import { Pair } from "../entities/IPair";
import { IPool } from "../entities/IPool";
import { IPoolKey } from "../entities/IPoolKey";
import { IPrice } from "../entities/IPrice";
import { IToast } from "../entities/IToast";
import { IUser } from "../entities/IUser";

export interface ISolanaContext extends IUser, ILink, IToast, IPrice, IPool, IPoolKey, Pair {
    loaded: boolean;
    reload: boolean;
}
