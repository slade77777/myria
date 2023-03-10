import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { minABI } from '../../common/abis/minABI';
import { initialWeb3 } from '../../services/myriaCoreSdk';
import { convertWeiToEth } from '../../utils/Converter';

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
    initialWeb3()
      .then(result => {
        window.web3 = result;
      })
      .catch();
    if (!window.web3 || !window.web3.eth || !account) return;

    const setBalanceFunc = async () => {
      if (token.name === 'Ethereum') {
        const tb = await window.web3.eth.getBalance(account);
        const balance =
          parseFloat(Web3.utils.fromWei(tb.toString(), 'ether')).toFixed(6) +
          '';
        setBalanceL1(balance);
      } else {
        const result = await getBalance(token.tokenAddress, account);
        const resultConvert = convertWeiToEth(result);
        setBalanceL1(`${parseFloat(resultConvert).toFixed(5)}`);
      }
    };

    if (token) {
      setBalanceFunc();
    }
  }, [token, account]);

  return { balanceL1 };
}

export default useBalanceL1;
