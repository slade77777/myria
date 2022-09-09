import {
  EnvTypes,
  IMyriaClient,
  ModuleFactory,
  MyriaClient,
} from 'myria-core-sdk';
import Web3 from 'web3';

declare const window: any;

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

async function getAccounts() {
  const web3 = await initialWeb3();
  return await web3.eth.getAccounts();
}

function getEnvTypes() {
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
    env: getEnvTypes(),
  };

  const myriaClient = new MyriaClient(client);
  return ModuleFactory.getInstance(myriaClient);
}

export {
  getModuleFactory,
  getAccounts,
  getNetworkType,
  initialWeb3,
  getNetworkId,
};
