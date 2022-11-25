import React, { useEffect } from 'react';
import { LoadingStandBy } from 'src/components/Loading';
import { localStorageKeys } from 'src/configs';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import useInstalledWallet from 'src/hooks/useInstalledWallet';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { getAccounts } from 'src/services/myriaCoreSdk';

const FirstLoadingCampaign: React.FC = () => {
  const { installedWallet } = useInstalledWallet();
  const { address, setAddress, subscribeProvider } = useWalletContext();
  const { account } = useAuthenticationContext();
  const [walletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [localStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');

  useEffect(() => {
    if (installedWallet === true) {
      subscribeProvider();
    }
    getAccounts()
      .then((accounts) => {
        if (
          localStarkKey &&
          walletAddress &&
          account &&
          accounts[0]?.toLowerCase() === walletAddress.toLowerCase() &&
          accounts[0]?.toLowerCase() === account?.wallet_id.toLowerCase()
        ) {
          setAddress(accounts[0]?.toLowerCase());
        }
      })
      .catch((e) => {
        console.log('error', e);
      });
  }, [account, installedWallet]);

  return (
    <div className="bg-dark/10 absolute inset-0 z-10 flex w-full items-center justify-center text-white">
      <LoadingStandBy />
    </div>
  );
};
export default FirstLoadingCampaign;
