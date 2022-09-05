import { IMyriaClient, MyriaClient, ModuleFactory, EnvTypes } from 'myria-core-sdk';
import Web3 from 'web3';

declare const window: any;
const MAINNET = 1;

const ENV_CORE_SDK = process.env.NEXT_PUBLIC_CORE_SDK_ENV;
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

function getEnvTypes() {
  console.log('ENV SDK -> ', ENV_CORE_SDK);
  if (ENV_CORE_SDK === 'DEV') {
    return EnvTypes.DEV;
  } else if (ENV_CORE_SDK === 'STAGING') {
    return EnvTypes.STAGING;
  } else if (ENV_CORE_SDK === 'PROD') {
    return EnvTypes.PRODUCTION;
  }
  return EnvTypes.STAGING;
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
    web3: windowBrowser as any,
    env: getEnvTypes()
  };

  const myriaClient = new MyriaClient(client);
  const moduleFactory = ModuleFactory.getInstance(myriaClient);
  return moduleFactory;
}

export { getModuleFactory, getAccounts, getNetworkType, initialWeb3, getNetworkId };
