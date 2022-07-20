import { useContext, useEffect, useState } from 'react';
import React, { useCallback } from 'react';
import Web3Modal from '../components/Web3Modal';

import { BigNumber, ethers } from 'ethers';
import { useGA4 } from 'src/lib/ga';
import { bal } from 'make-plural';

let web3Modal: Web3Modal;
export type ReaderProvider = ethers.providers.InfuraProvider;
interface IWalletContext {
  address?: string;
  balance?: BigNumber;
  signerProviderApi?: ethers.providers.Web3Provider;
  readerProviderApi?: ReaderProvider;
  chainId?: number | string;
  onConnect: () => void;
  ready: boolean;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string> | undefined;
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

export const WalletProvider: React.FC = ({ children }) => {
  const [address, setAddress] = React.useState<string | undefined>(undefined);
  const [balance, setBalance] = React.useState<BigNumber>();
  const [ready, setReady] = React.useState(false);
  const [chainId, setChainId] = React.useState<number | undefined>(undefined);
  const [w3Provider, setW3Provider] = useState<any>();
  const [signerProviderApi, setSignerProviderApi] = useState<ethers.providers.Web3Provider>();
  const [readerProviderApi, setReaderProvider] = useState<ReaderProvider | null>(
    createReaderProvider()
  );
  const { event } = useGA4();

  useEffect(() => {
    onConnect();
  }, []);

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
    await web3Modal.clearCachedProvider();
    reset();

    address && event('Wallet Disconnected', { campaign: 'Sigil', wallet_address: address });
  }, [w3Provider, event, address]);

  const getBalanceETH = React.useCallback(() => {
    if (!address) return;
    return readerProviderApi?.getBalance(address);
  }, [readerProviderApi, address]);

  const onConnect = async () => {
    web3Modal = new Web3Modal({
      network: process.env.NEXT_PUBLIC_ETH_ENV,
      cacheProvider: true
    });

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
    event('Wallet Connected', { wallet_address: address, campaign: 'Sigil' });
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
        ready,
        disconnect,
        signMessage,
        balance
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
