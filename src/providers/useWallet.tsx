import { useContext, useEffect, useState } from 'react';
import React, { useCallback } from 'react';
import WalletConnect from '@walletconnect/web3-provider';
import Web3Modal from '../components/Web3Modal';
// import Web3Modal from 'web3modal';

import { ethers } from 'ethers';

let web3Modal: Web3Modal;

interface IWalletContext {
  address?: string;
  chainId?: number | string;
  onConnect: () => void;
  ready: boolean;
  disconnect: () => void;
}

const WalletContext = React.createContext<IWalletContext>({} as IWalletContext);

export const WalletProvider: React.FC = ({ children }) => {
  const [address, setAddress] = React.useState<string | undefined>(undefined);
  const [ready, setReady] = React.useState(false);
  const [chainId, setChainId] = React.useState<number | string | undefined>(undefined);
  const [provider, setProvider] = useState<any>();

  const getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnect,
        options: {
          infuraId: '27e484dcd9e3efcfd25a83a78777cdf1' // TODO replace with real id
        }
      }
    };
    return providerOptions;
  };

  const subscribeProvider = useCallback(async (provider) => {
    if (!provider.on) {
      return;
    }

    provider.on('accountsChanged', async (accounts: string[]) => {
      setAddress(accounts[0]);
    });

    provider.on('chainChanged', async (chainId: string) => {
      setChainId(chainId);
    });
  }, []);

  const reset = () => {
    setAddress(undefined);
    setChainId(undefined);
  };

  const disconnect = useCallback(async () => {
    if (provider?.close) {
      await provider.close();
    }
    await web3Modal.clearCachedProvider();
    reset();
  }, [provider]);

  const onConnect = async () => {
    web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions: getProviderOptions()
    });

    const w3provider = await web3Modal.connect();

    await subscribeProvider(w3provider);

    const providerApi = new ethers.providers.Web3Provider(w3provider);
    const accounts = await providerApi.listAccounts();
    const address = accounts[0];
    const network = await providerApi.getNetwork();
    setProvider(w3provider);
    setChainId(network.chainId);
    setAddress(address);
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        chainId,
        onConnect,
        ready,
        disconnect
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
