import { useState, useEffect } from 'react';
import { getModuleFactory } from '../../services/myriaCoreSdk';

function useBalanceList(pKey: string, screen: number) {
  const [balanceList, setBalanceList] = useState<Array<any>>([]);

  useEffect(() => {
    async function fetchBalanceList() {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const assetModule = moduleFactory.getAssetOnchainManager();

      const assetList = await assetModule.getListAssetsByStarkKey('0x' + pKey);

      setBalanceList(assetList?.data);
    }
    fetchBalanceList();
  }, [pKey, screen]);

  return { balanceList };
}

export default useBalanceList;
