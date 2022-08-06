import { IMyriaClient, Modules, MyriaClient } from 'myria-core-sdk';
import Web3 from 'web3';
import { number } from 'yup';

declare const window: any;
const MAINNET = 1;
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

async function getNetworkId(): Promise<number> {
  let windowBrowser;
  if (window && window.ethereum) {
    windowBrowser = await initialWeb3();
    window.web3 = windowBrowser;
  } else {
    return 0;
  }
  await signMetamask();

  const networkId = await windowBrowser.eth.net.getId();
  return networkId;
}

async function getModuleFactory() {
  let windowBrowser;
  let networkId;
  if (window && window.ethereum) {
    windowBrowser = await initialWeb3();
    window.web3 = windowBrowser;
  } else {
    windowBrowser = window.web3;
  }
  await signMetamask();
  try {
    networkId = await windowBrowser.eth.net.getId();
  } catch (error) {
    console.log(error);
  }
  const client: IMyriaClient = {
    provider: windowBrowser.eth.currentProvider as any,
    networkId: networkId ? networkId : MAINNET,
    web3: windowBrowser as any
  };
  const myriaClient = new MyriaClient(client);
  return new Modules.ModuleFactory(myriaClient);
}

export { getModuleFactory, getAccounts, getNetworkType, initialWeb3, getNetworkId };
