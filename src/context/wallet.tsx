import { useContext, useEffect, useState } from 'react';
import React, { useCallback } from 'react';
import Web3Modal from '../components/Web3Modal';

import { ethers } from 'ethers';
import { useGA4 } from 'src/lib/ga';

let web3Modal: Web3Modal;

interface IWalletContext {
  address?: string;
  providerApi?: ethers.providers.Web3Provider;
  chainId?: number | string;
  onConnect: () => void;
  ready: boolean;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string> | undefined;
}

const WalletContext = React.createContext<IWalletContext>({} as IWalletContext);

export const WalletProvider: React.FC = ({ children }) => {
  const [address, setAddress] = React.useState<string | undefined>(undefined);
  const [ready, setReady] = React.useState(false);
  const [chainId, setChainId] = React.useState<number | string | undefined>(undefined);
  const [w3Provider, setW3Provider] = useState<any>();
  const [providerApi, setProviderApi] = useState<ethers.providers.Web3Provider>();
  const { event } = useGA4();

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
    if (!web3Modal) {
      return;
    }
    if (w3Provider?.close) {
      await w3Provider.close();
    }
    await web3Modal.clearCachedProvider();
    reset();

    address && event('Wallet Disconnected', { campaign: 'Sigil', wallet_address: address });
  }, [w3Provider, event, address]);

  const onConnect = async () => {
    web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    });
    const w3provider = await web3Modal.connect();
    await subscribeProvider(w3provider);

    const providerApi = new ethers.providers.Web3Provider(w3provider);
    const accounts = await providerApi.listAccounts();
    const address = accounts[0];
    const network = await providerApi.getNetwork();
    setW3Provider(w3provider);
    setProviderApi(providerApi);
    setChainId(network.chainId);
    setAddress(address);
    event('Wallet Connected', { wallet_address: address, campaign: 'Sigil' });
  };

  const signMessage = (message: string) => {
    return providerApi?.getSigner().signMessage(message);
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        providerApi,
        chainId,
        onConnect,
        ready,
        disconnect,
        signMessage
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
