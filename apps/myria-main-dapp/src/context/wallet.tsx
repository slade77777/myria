import { useContext, useEffect, useState } from 'react';
import React, { useCallback } from 'react';
import Web3Modal from '../components/Web3Modal';

import { BigNumber, ethers } from 'ethers';
import { useGA4 } from 'src/lib/ga';
import { Campaign } from '../lib/ga/use-ga/event';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import reporter from 'src/error-reporter';

let web3Modal: Web3Modal;
export type ReaderProvider = ethers.providers.InfuraProvider;
interface IWalletContext {
  address?: string;
  balance?: BigNumber;
  signerProviderApi?: ethers.providers.Web3Provider;
  readerProviderApi?: ReaderProvider;
  chainId?: number | string;
  onConnect: () => void;
  onConnectCompaign: (campaign: Campaign) => Promise<void>;
  ready: boolean;
  disconnect: () => void;
  setAddress: (walletAddress: string) => void;
  signMessage: (message: string) => Promise<string> | undefined;
  subscribeProvider: () => void;
}

const WalletContext = React.createContext<IWalletContext>({} as IWalletContext);
const defaultEnvChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? '0x1');

function createReaderProvider(chainid: number = defaultEnvChainId): ReaderProvider | null {
  try {
    return new ethers.providers.InfuraProvider(chainid, {
      projectId: process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET
    });
  } catch (error) {
    return null;
  }
}
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: process.env.NEXT_PUBLIC_ETH_ENV,
    cacheProvider: true
  });
}
export const WalletProvider: React.FC = ({ children }) => {
  const [address, setAddress] = React.useState<string | undefined>(undefined);
  const [balance, setBalance] = React.useState<BigNumber>();
  const [ready, setReady] = React.useState(false);
  const [chainId, setChainId] = React.useState<number | undefined>(undefined);
  const [w3Provider, setW3Provider] = useState<any>();
  const [signerProviderApi, setSignerProviderApi] = useState<ethers.providers.Web3Provider>();
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const [walletAddress, setWalletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [readerProviderApi, setReaderProvider] = useState<ReaderProvider | null>(
    createReaderProvider()
  );
  const { event } = useGA4();

  const subscribeProvider = useCallback(async (provider) => {
    if (!provider.on) {
      return;
    }

    provider.on('accountsChanged', async (accounts: string[]) => {
      setAddress(accounts[0]);
    });

    provider.on('chainChanged', async (chainId: string) => {
      setChainId(parseInt(chainId));
    });
  }, []);

  useEffect(() => {
    if (chainId) {
      setReaderProvider(createReaderProvider(chainId));
    }
  }, [chainId]);

  const reset = () => {
    setAddress(undefined);
    setChainId(undefined);
  };

  const disconnect = useCallback(async () => {
    if (!web3Modal) {
      return;
    }
    if (w3Provider?.close) {
      await w3Provider.close();
    }
    web3Modal.clearCachedProvider();
    address && (await event('Wallet Disconnected', { campaign: 'Sigil', wallet_address: address }));
    reset();
  }, [address, event, w3Provider]);

  const getBalanceETH = React.useCallback(() => {
    if (!address) return;
    return readerProviderApi?.getBalance(address);
  }, [readerProviderApi, address]);

  const initializeSubcribeProvider = async () => {
    const w3provider = await web3Modal.connect();
    await subscribeProvider(w3provider);
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      // onConnect();
    }
  }, []);

  const onConnect = async () => {
    reset();
    const w3provider = await web3Modal.connect();
    await subscribeProvider(w3provider);
    const providerApi = new ethers.providers.Web3Provider(w3provider);
    const accounts = await providerApi.listAccounts();
    const address = accounts[0];
    const network = await providerApi.getNetwork();
    setW3Provider(w3provider);
    setSignerProviderApi(providerApi);
    setChainId(network.chainId);
    setAddress(address);
    reporter.setUserContext({
      address
    });
  };

  const onSetWalletAddress = (walletAddress: string) => {
    setAddress(walletAddress);
  };

  const onConnectCompaign = async (campaign: Campaign) => {
    reset();
    const w3provider = await web3Modal.connect();
    await subscribeProvider(w3provider);
    const providerApi = new ethers.providers.Web3Provider(w3provider);
    const accounts = await providerApi.listAccounts();
    const address = accounts[0];
    const network = await providerApi.getNetwork();
    setW3Provider(w3provider);
    setSignerProviderApi(providerApi);
    setChainId(network.chainId);
    setAddress(address);
    event('Wallet Connected', { wallet_address: address, campaign });
  };

  const signMessage = (message: string) => {
    return signerProviderApi?.getSigner().signMessage(message);
  };

  React.useEffect(() => {
    getBalanceETH()
      ?.then(setBalance)
      .catch(() => null);
  }, [getBalanceETH]);

  return (
    <WalletContext.Provider
      value={{
        address,
        signerProviderApi: signerProviderApi,
        readerProviderApi: readerProviderApi as any,
        chainId,
        onConnect,
        onConnectCompaign,
        ready,
        disconnect,
        signMessage,
        balance,
        setAddress: onSetWalletAddress,
        subscribeProvider: initializeSubcribeProvider
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
