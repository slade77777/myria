import { EnvTypes, IMyriaClient, ModuleFactory } from 'myria-core-sdk';

const getModuleFactory = () => {
  if (typeof window === 'object') {
    const initializeClient: IMyriaClient = {
      provider: window.web3?.currentProvider,
      networkId: 5,
      web3: window.web3,
      env: EnvTypes.STAGING
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
