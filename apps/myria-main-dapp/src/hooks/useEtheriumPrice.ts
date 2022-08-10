import axios from 'axios';
import { useQuery } from 'react-query';

export const useEtheriumPrice = () => {
  return useQuery('etherium-price', async () => {
    const res = await axios.get<{
      ethereum: {
        usd: number;
      };
    }>('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    return res.data.ethereum.usd;
  });
};
