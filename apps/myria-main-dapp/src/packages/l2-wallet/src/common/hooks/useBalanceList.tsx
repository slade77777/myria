import { useState, useEffect } from 'react';
import { IMyriaClient, Modules } from 'myria-core-sdk';

declare let window: any;

function useBalanceList(pKey: string, screen: number) {
  const [balanceList, setBalanceList] = useState<Array<any>>([]);

  useEffect(() => {
    async function fetchBalanceList() {
      const initializeClient: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: 5,
        web3: window.web3,
      };
      const moduleFactory = new Modules.ModuleFactory(initializeClient);
      const assetModule = moduleFactory.getAssetModule();

      const assetList = await assetModule.getListAssetsByStarkKey('0x' + pKey);

      setBalanceList(assetList?.data);
    }
    fetchBalanceList();
  }, [pKey, screen]);

  return { balanceList };
}

export default useBalanceList;
