import { useContext, useEffect, useState } from 'react';
import React from 'react';

import { BigNumber, ethers } from 'ethers';
import { getAccounts, getModuleFactory, initialWeb3 } from 'src/services/myriaCoreSdk';
import { useDispatch } from 'react-redux';
import { setAccount, setStarkPublicKey } from 'src/packages/l2-wallet/src/app/slices/accountSlice';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import { UserData } from 'myria-core-sdk/dist/types/src/types/UserTypes';
import { SimpleFunction } from 'web3modal';
import { WalletTabs } from 'src/types';

export type ReaderProvider = ethers.providers.InfuraProvider;
interface IL2WalletContext {
  address?: string;
  balance?: BigNumber;
  isFirstTimeUser: boolean;
  connectL2Wallet: () => Promise<void>;
  connectL2WalletFirstTime: (callback: SimpleFunction) => Promise<void>;
  disconnectL2Wallet: () => Promise<void>;
  isWithdrawComplete: {
    isShow: boolean;
    transactionHash: string;
    claimAmount: number;
  };
  showWithdrawCompleteScreen: any;
  isFirstPurchase: boolean;
  handleSetFirstPurchase: (value: boolean) => void;
  activeWalletTabs: WalletTabs;
  handleActiveWalletTabs: (value: WalletTabs) => void;
  isDisplayPopover: boolean;
  handleDisplayPopover: (value: boolean) => void;
  isDisplayPopoverWithdrawNFT: boolean;
  handleDisplayPopoverWithdrawNFT: (value: boolean) => void;
}

const L2WalletContext = React.createContext<IL2WalletContext>({} as IL2WalletContext);
// const signMessage = 'Message request signature: ';

export const L2WalletProvider: React.FC = ({ children }) => {
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const [walletAddress, setWalletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [isFirstTimeWallet, setIsFirstTimeWallet] = React.useState(false);
  const [activeWalletTabs, setActiveWalletTabs] = useState<WalletTabs>(WalletTabs.TOKENS);
  const [isFirstPurchase, setIsFirstPurchase] = React.useState(false);
  const [isWithdrawComplete, setIsWithdrawComplete] = React.useState({
    isShow: false,
    transactionHash: '',
    claimAmount: 0
  });
  const [isDisplayPopover, setIsDisplayPopover] = React.useState(false);
  const [isDisplayPopoverWithdrawNFT, setIsDisplayPopoverWithdrawNFT] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAccount(walletAddress));
    dispatch(setStarkPublicKey(localStarkKey));
  }, [localStarkKey, walletAddress]);

  const checkFirstTimeWallet = async (metamaskAccount: string): Promise<boolean | undefined> => {
    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;

    const userModule = moduleFactory.getUserModule();

    try {
      const user = await userModule.getUserByWalletAddress(metamaskAccount);
      if (user && user?.ethAddress?.toLowerCase() === metamaskAccount?.toLowerCase()) {
        return false;
      }
    } catch {
      return true;
    }
  };

  const onRequestSignature = async (metamaskAccount: string) => {
    if (!metamaskAccount) {
      console.error('Please connect wallet first.');
      return;
    }

    await initialWeb3();
    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;

    const commonModule = moduleFactory.getCommonModule();
    const starkKey = await commonModule.generateStarkKey(metamaskAccount);
    dispatch(setStarkPublicKey(starkKey));
    dispatch(setAccount(metamaskAccount));
    setLocalStarkKey(starkKey);
    setWalletAddress(metamaskAccount?.toLowerCase());
  };

  const onConnectL2WalletFirstTime = async (callback?: SimpleFunction) => {
    console.log('[L2-wallet-context] onConnectL2WalletFirstTime');
    const accounts = await getAccounts();
    if (!accounts || accounts.length === 0) return;

    const currentAccount = accounts[0];

    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;

    const commonModule = moduleFactory.getCommonModule();
    const userModule = moduleFactory.getUserModule();
    const starkKey = await commonModule.generateStarkKey(currentAccount);

    // Create user
    const registerPayload: UserData = {
      starkKey: `0x${starkKey}`,
      ethAddress: currentAccount
    };
    const registerResult = await userModule.registerUser(registerPayload);
    if (
      registerResult &&
      registerResult.ethAddress?.toLowerCase() === currentAccount.toLowerCase()
    ) {
      setIsFirstTimeWallet(false);
      dispatch(setStarkPublicKey(starkKey));
      dispatch(setAccount(currentAccount));
      setLocalStarkKey(starkKey);
      setWalletAddress(currentAccount?.toLowerCase());
      callback && callback();
    }
  };

  const onConnectL2Wallet = async () => {
    console.log('[l2-wallet-context] onConnectL2Wallet');
    setIsFirstTimeWallet(false);
    const accounts = await getAccounts();
    if (!accounts || accounts.length === 0) return;

    const currentAccount = accounts[0];
    const isFirstTimeWalletUser = await checkFirstTimeWallet(currentAccount);
    if (isFirstTimeWalletUser === undefined) return;

    if (!isFirstTimeWalletUser) {
      await onRequestSignature(currentAccount);
    }

    setIsFirstTimeWallet(isFirstTimeWalletUser);
  };

  const onDisconnectL2Wallet = async () => {
    dispatch(setStarkPublicKey(''));
    dispatch(setAccount(''));
    setLocalStarkKey('');
    setWalletAddress('');
  };

  const showWithdrawCompleteScreen = (data: {
    isShow: boolean;
    transactionHash: string;
    claimAmount: number;
  }) => {
    setIsWithdrawComplete({ ...isWithdrawComplete, ...data });
  };

  const handleSetFirstPurchase = (value: boolean) => {
    setIsFirstPurchase(value);
  };
  const handleActiveWalletTabs = (value: WalletTabs) => {
    setActiveWalletTabs(value);
  };
  const handleDisplayPopover = (value: boolean) => {
    setIsDisplayPopover(value);
  };

  const handleDisplayPopoverWithdrawNFT = (value: boolean) => {
    setIsDisplayPopoverWithdrawNFT(value);
  };
  return (
    <L2WalletContext.Provider
      value={{
        isFirstTimeUser: isFirstTimeWallet,
        connectL2Wallet: onConnectL2Wallet,
        connectL2WalletFirstTime: onConnectL2WalletFirstTime,
        disconnectL2Wallet: onDisconnectL2Wallet,
        isWithdrawComplete: isWithdrawComplete,
        showWithdrawCompleteScreen: showWithdrawCompleteScreen,
        isFirstPurchase: isFirstPurchase,
        handleSetFirstPurchase: handleSetFirstPurchase,
        handleActiveWalletTabs,
        activeWalletTabs,
        isDisplayPopover,
        handleDisplayPopover,
        isDisplayPopoverWithdrawNFT,
        handleDisplayPopoverWithdrawNFT
      }}>
      {children}
    </L2WalletContext.Provider>
  );
};

export const useL2WalletContext = () => useContext(L2WalletContext);
