import { EnvTypes, IMyriaClient, ModuleFactory } from 'myria-core-sdk';

const ENV_CORE_SDK = process.env.NEXT_PUBLIC_CORE_SDK_ENV;

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

const getModuleFactory = () => {
  if (typeof window === 'object') {
    const initializeClient: IMyriaClient = {
      provider: window.web3?.currentProvider,
      networkId: 5,
      web3: window.web3,
      env: getEnvTypes()
    };

    const moduleFactory = new ModuleFactory(initializeClient);

    return moduleFactory;
  }
  return null;
};

export const assetModule = getModuleFactory()?.getAssetOnchainManager();
export const collectionModule = getModuleFactory()?.getCollectionManager();
export const commonModule = getModuleFactory()?.getCommonModule();
export const orderModule = getModuleFactory()?.getOrderManager();
export const tradeModule = getModuleFactory()?.getTradeManager();
