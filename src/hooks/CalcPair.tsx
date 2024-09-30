import { useCallback } from 'react';
import { IPair } from '../helper/DSHelper';

const useTokenInfo = async () => {
    const tokenAddress = 'C6DjtE9srgmU2EYmVy5DSp6THRoQi5ij2j8b8k5ppump';

    const getTokenInfo = async (): Promise<IPair[] | undefined> => {
        try {
            const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const pairs: IPair[] = await response.json();
            console.log('Token Info:', pairs);
            return pairs;
        } catch (error) {
            console.error('Error fetching token info:', error);
            return undefined;
        }
    };

    return await getTokenInfo().then((res) => res as IPair[]);
};

export default useTokenInfo;
