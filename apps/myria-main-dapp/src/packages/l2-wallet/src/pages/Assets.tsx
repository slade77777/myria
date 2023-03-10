import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../app/store';
import { setNFTs } from '../app/slices/nftSlice';
import { isValidHttpUrl } from '../common/util';
import { getModuleFactory } from '../services/myriaCoreSdk';

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
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;
      const assetModule = moduleFactory.getAssetOnchainManager();
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
    <div className="grid cursor-pointer grid-cols-4 gap-x-[30px] py-[20px]">
      {assetList.map((asset: any, index: number) => (
        <Link to={`/assets/${asset.id}`} key={index}>
          <div className="rounded-[10px] border border-[#4C505D] bg-[#191e2b]">
            <img
              className="w-full"
              alt="nft_image"
              src={
                isValidHttpUrl(asset.url)
                  ? asset.url
                  : 'https://bearhood.mypinata.cloud/ipfs/QmPY16R2cc5PktLQpL9sUZQS5WhWrjxXCEVq15XCHocSXY/9194.png'
              }
            />
            <div className="py-4 text-center text-[16px] font-bold text-white">
              {asset.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
