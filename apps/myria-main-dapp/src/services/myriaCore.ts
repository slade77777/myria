import { IMyriaClient, Modules } from 'myria-core-sdk';

const getModuleFactory = () => {
  if (typeof window === 'object') {
    const initializeClient: IMyriaClient = {
      provider: window.web3.currentProvider,
      networkId: 5,
      web3: window.web3
    };

    const moduleFactory = new Modules.ModuleFactory(initializeClient);

    return moduleFactory;
  }
  return null;
};

export const assetModule = getModuleFactory()?.getAssetModule();
export const collectionModule = getModuleFactory()?.getCollectionModule();
export const commonModule = getModuleFactory()?.getCommonModule();
