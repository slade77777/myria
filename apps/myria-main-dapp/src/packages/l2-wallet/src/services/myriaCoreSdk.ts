import { IMyriaClient, Modules, MyriaClient } from 'myria-core-sdk';
import Web3 from 'web3';

declare const window: any;

async function signMetamask() {
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log('MetaMask is installed!');
  }
}

async function initialWeb3() {
  return new Web3(Web3.givenProvider);
}

async function getNetworkType() {
  const web3 = await initialWeb3();
  return await web3.eth.net.getNetworkType();
}

async function getAccounts() {
  const web3 = await initialWeb3();
  return await web3.eth.getAccounts();
}

async function getModuleFactory() {
  let windowBrowser;
  if (window && window.ethereum) {
    windowBrowser = await initialWeb3();
    window.web3 = windowBrowser;
  } else {
    return;
  }
  await signMetamask();

  const networkId = await windowBrowser.eth.net.getId();

  const client: IMyriaClient = {
    provider: windowBrowser.eth.currentProvider as any,
    networkId,
    web3: windowBrowser as any,
  };

  const myriaClient = new MyriaClient(client);
  return new Modules.ModuleFactory(myriaClient);
}

export { getModuleFactory, getAccounts, getNetworkType, initialWeb3 };
