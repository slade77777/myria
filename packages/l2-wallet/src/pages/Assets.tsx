import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMyriaClient, Modules } from 'myria-core-sdk';

import { RootState } from '../app/store';
import { setNFTs } from '../app/slices/nftSlice';
import { isValidHttpUrl } from '../common/util';

declare let window: any;

export default function Assets() {
  const starkPublicKeyFromPrivateKey = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );
  const account = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );
  const dispatch = useDispatch();

  const [assetList, setAssetList] = useState<any>([]);

  useEffect(() => {
    const fetchNFTList = async () => {
      const initializeClient: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: 5,
        web3: window.web3,
      };
      const moduleFactory = new Modules.ModuleFactory(initializeClient);
      const assetModule = moduleFactory.getAssetModule();
      const tAssetList: any = await assetModule.getNftAssets(
        '0x' + starkPublicKeyFromPrivateKey,
      );
      const processedData = tAssetList.data?.map((item: any) => ({
        id: item.assetId,
        name: item.blueprint.split(',')[0],
        url: item.blueprint.split(',')[1],
        detail: item.blueprint.split(',')[2],
      }));
      dispatch(setNFTs(processedData));
      setAssetList(processedData);
    };

    if (starkPublicKeyFromPrivateKey && account) {
      fetchNFTList();
    }
  }, [starkPublicKeyFromPrivateKey, account, dispatch]);
  return (
    <div className="grid grid-cols-4 gap-x-[30px] py-[20px] cursor-pointer">
      {assetList.map((asset: any, index: number) => (
        <Link to={`/assets/${asset.id}`}>
          <div className="border border-[#4C505D] bg-[#191e2b] rounded-[10px]">
            <img
              className="w-full"
              alt="nft_image"
              src={
                isValidHttpUrl(asset.url)
                  ? asset.url
                  : 'https://bearhood.mypinata.cloud/ipfs/QmPY16R2cc5PktLQpL9sUZQS5WhWrjxXCEVq15XCHocSXY/9194.png'
              }
            />
            <div className="text-[16px] text-center font-bold text-white py-4">
              {asset.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
