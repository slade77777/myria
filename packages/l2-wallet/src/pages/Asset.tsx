import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import {
  ArrowIcon,
  HeartIcon,
  EyeIcon,
  ViewListIcon,
} from '../components/Icons';
import EthereumIcon from '../components/Icons/EthereumIcon';

export default function Asset() {
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState<any>(null);
  const nfts = useSelector((state: RootState) => state.nfts.nfts);

  const starkPublicKeyFromPrivateKey = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );

  const asset = nfts.filter((item: any) => item.id.toString() === id)[0];

  useEffect(() => {
    const getDetailInfo = async (asset: any) => {
      try {
        const result = await axios.get(asset.detail);
        setDetailInfo(result?.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (nfts.length > 0) {
      const asset = nfts.filter((item: any) => item.id.toString() === id)[0];
      if (asset) {
        getDetailInfo(asset);
      }
    }
  }, [nfts, id]);

  if (!starkPublicKeyFromPrivateKey) {
    return (
      <div className="text-[#353840] my-[20px]">
        You need to connect your wallet account or need to generate the Myria
        Key.
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="text-[#353840] my-[20px]">
        You haven`&apos;t owned this nft. Please check once again!
      </div>
    );
  }

  return (
    <div className="py-[20px]">
      <Link to="/assets" className="flex items-center">
        <ArrowIcon direction="left" className="cursor-pointer text-[#353840]" />
        <span className="text-[#353840] text-[20px] font-semibold ml-2">
          Back
        </span>
      </Link>
      <div className="grid grid-cols-3 gap-x-[20px] text-[#808080] mt-[20px]">
        <div className="rounded-[10px] border-[rgb(229, 232, 235)] border">
          <div className="flex justify-between items-center p-3">
            <EthereumIcon className="" size={12} />
            <div className="flex items-center">
              <HeartIcon className="text-[#CCCCCC]" size={20} />
              <span className="ml-2">9</span>
            </div>
          </div>
          <div className="rounded-b-[10px]">
            <img
              alt="nftImage"
              className="rounded-b-[10px] w-full"
              src={asset?.url}
            />
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-[#353840] text-[30px] font-semibold">
            {detailInfo?.name}
          </div>
          <div className="flex text-[#808080] text-[15px] py-5">
            <div>Owned by 6uYE18</div>
            <div className="ml-4">
              <div className="flex items-center">
                <EyeIcon className="text-[#808080]" size={22} />
                <span className="ml-2">1 view</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="flex items-center">
                <HeartIcon className="text-[#808080]" size={22} />
                <span className="ml-2">1 favorite</span>
              </div>
            </div>
          </div>
          <div className="rounded-[10px] border border-[rgb(229, 232, 235)] p-[20px]">
            <div className="text-[15px] text-[#707A83]">Current Price</div>
            <div className="flex mt-1 items-center">
              <div>
                <EthereumIcon className="" size={20} />
              </div>
              <span className="text-[#353840] text-[30px] ml-2">
                {asset?.price ?? 10}
              </span>
            </div>
            <div className="mt-2">
              <button className="border-[#2081E2] border rounded-[10px] text-[#2081E2] px-5 py-3 text-[16px]">
                Withdraw
              </button>
            </div>
          </div>
          <div className="rounded-[10px] border border-[rgb(229, 232, 235)] mt-[20px] text-[#808080]">
            <div className="flex items-center text-[#808080] border-b border-[rgb(229, 232, 235)] p-[20px]">
              <ViewListIcon className="" size={20} />
              <div className="font-semibold ml-2">Description</div>
            </div>
            <div className="p-[20px]">
              {detailInfo?.description ?? 'No Description'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
