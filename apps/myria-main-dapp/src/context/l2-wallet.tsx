import { useCallback } from 'react';
import { BigNumber } from 'ethers';
import { IMyriaClient, MyriaClient, Modules } from 'myria-core-sdk';
import React, { useContext, useEffect, useState } from 'react';
import { useWalletContext } from './wallet';

interface IL2WalletContext {
  address?: string;
  balance?: BigNumber;
  onConnectL2Wallet: (walletAddress: string) => void;
  onDisconnectL2Wallet: () => void;
  checkFirstTimeUser: (walletAddress: string) => Promise<boolean>;
  isFirstTimeUser: boolean;
}

const L2WalletContext = React.createContext<IL2WalletContext>({} as IL2WalletContext);

export const L2WalletProvider: React.FC = ({ children }) => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  // const { address: walletAddress } = useWalletContext();

  // const onConnectL2Wallet = useCallback(async (walletAddress: string) => {
  //   console.log('walletAddress ==> ', walletAddress);
  //   if (!walletAddress) return;
  //   const isFirstTimeUser = await checkFirstTimeUser(walletAddress);
  //   setIsFirstTimeUser(isFirstTimeUser);
  // }, []);

  // useEffect(() => {
  //   if (!walletAddress) return;
  //   onConnectL2Wallet(walletAddress);
  // }, [walletAddress, onConnectL2Wallet]);

  const onConnectL2Wallet = () => {};

  const onDisconnectL2Wallet = () => {};

  const checkFirstTimeUser = async (walletAddress: string) => {
    const client: IMyriaClient = {
      provider: window.web3.currentProvider,
      networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
      web3: window.web3
    };
    const myriaClient = new MyriaClient(client);

    const moduleFactory = new Modules.ModuleFactory(myriaClient);
    const userModule = moduleFactory.getUserModule();

    let isFirstTime;
    try {
      const user = await userModule.getUserByWalletAddress(walletAddress);
      isFirstTime = Object.keys(user.data).length === 0;
    } catch {
      isFirstTime = true;
    }

    return isFirstTime;
  };
  const address = '0x0';
  const balance = BigNumber.from(0);

  return (
    <L2WalletContext.Provider
      value={{
        address,
        balance,
        onConnectL2Wallet,
        checkFirstTimeUser,
        onDisconnectL2Wallet,
        isFirstTimeUser
      }}>
      {children}
    </L2WalletContext.Provider>
  );
};

export const useL2WalletContext = () => useContext(L2WalletContext);
