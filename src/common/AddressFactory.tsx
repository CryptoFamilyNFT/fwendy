

export default class AddressFactory {
    

    static getTokenAddress(chainId: Number): string {
        switch (chainId) {
            case 102:
                return "C6DjtE9srgmU2EYmVy5DSp6THRoQi5ij2j8b8k5ppump";
            case 5:
            case 11155111: //
                return "C6DjtE9srgmU2EYmVy5DSp6THRoQi5ij2j8b8k5ppump";
            default:
                return "";
        }
    }

    static getSolEp(isDev: boolean): string {
        switch (isDev) {
            case true:
                return "http://localhost:5000";
            case false: //
                return "0x8Ffe184421FB9855C20c6be9CaF63508FaedF631";
            default:
                return "";
        }
    }

    static getPair(chainId: Number): string {
        switch (chainId) {
            case 102:
                return "0xC3Fcb7A38ec33e743c0F2c75E648BA28f8AD8Bfe";
            case 5:
            case 11155111:
                return "0xC3Fcb7A38ec33e743c0F2c75E648BA28f8AD8Bfe";
            default:
                return "";
        }
    }

    static formatAddress(address: string): string {
        return address && address.length > 20 ? `${address.substring(0, 7)}...${address.substring(address.length - 5)}` : '';
    }
}