import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getModuleFactory } from '../../services/myriaCoreSdk';

function useBalanceList() {
  const pKey = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );
  const { data, isLoading, error, isFetched } = useQuery(
    ['useBalanceList'],
      async () => {
        const moduleFactory = await getModuleFactory();
        if (!moduleFactory || _.isEmpty(pKey)) return;

        const assetModule = moduleFactory.getAssetOnchainManager();
        return assetModule.getListAssetsByStarkKey('0x' + pKey);
      },
    {
      enabled: !!pKey
    }
  );
  
  return { data: data?.data || [], isLoading, error, isFetched };
}

export default useBalanceList;
