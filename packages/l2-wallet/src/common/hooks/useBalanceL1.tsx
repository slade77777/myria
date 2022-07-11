import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { minABI } from '../../common/abis/minABI';

declare let window: any;

function useBalanceL1(token: any, account: string) {
  const [balanceL1, setBalanceL1] = useState<string>('0');

  async function getBalance(tokenAddress: string, accountAddress: string) {
    const result = await new window.web3.eth.Contract(
      minABI,
      tokenAddress,
    ).methods
      .balanceOf(accountAddress)
      .call();
    return result;
  }

  useEffect(() => {
    const setBalanceFunc = async () => {
      if (token.name === 'Ethereum') {
        const tb = await window.web3.eth.getBalance(account);
        setBalanceL1(
          parseFloat(Web3.utils.fromWei(tb.toString(), 'ether')).toFixed(2),
        );
      } else {
        const result = await getBalance(token.tokenAddress, account);
        setBalanceL1(result);
      }
    };

    if (token) {
      setBalanceFunc();
    }
  }, [token, account]);

  return { balanceL1 };
}

export default useBalanceL1;
