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
import { assets } from '../common/nfts';

export default function Asset() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [detailInfo, setDetailInfo] = useState<any>(null);
  const nfts = useSelector((state: RootState) => state.nfts.nfts);

  const starkPublicKeyFromPrivateKey = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );

  const asset = nfts.filter((item: any) => item.id.toString() === id)[0];

  const getDetailInfo = async (asset: any) => {
    try {
      const result = await axios.get(asset.detail);
      setDetailInfo(result?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (nfts.length > 0) {
      const asset = nfts.filter((item: any) => item.id.toString() === id)[0];
      if (asset) {
        getDetailInfo(asset);
      }
    }
  }, [nfts, id]);

  if (!starkPublicKeyFromPrivateKey) {
    return (
      <div className="my-[20px] text-[#353840]">
        You need to connect your wallet account or need to generate the Myria
        Key.
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="my-[20px] text-[#353840]">
        You haven`&apos;t owned this nft. Please check once again!
      </div>
    );
  }

  return (
    <div className="py-[20px]">
      <Link to="/assets" className="flex items-center">
        <ArrowIcon direction="left" className="cursor-pointer text-[#353840]" />
        <span className="ml-2 text-[20px] font-semibold text-[#353840]">
          Back
        </span>
      </Link>
      <div className="mt-[20px] grid grid-cols-3 gap-x-[20px] text-[#808080]">
        <div className="border-[rgb(229, 232, 235)] rounded-[10px] border">
          <div className="flex items-center justify-between p-3">
            <EthereumIcon className="" size={12} />
            <div className="flex items-center">
              <HeartIcon className="text-[#CCCCCC]" size={20} />
              <span className="ml-2">9</span>
            </div>
          </div>
          <div className="rounded-b-[10px]">
            <img
              alt="nftImage"
              className="w-full rounded-b-[10px]"
              src={asset?.url}
            />
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-[30px] font-semibold text-[#353840]">
            {detailInfo?.name}
          </div>
          <div className="flex py-5 text-[15px] text-[#808080]">
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
          <div className="border-[rgb(229, 232, 235)] rounded-[10px] border p-[20px]">
            <div className="text-[15px] text-[#707A83]">Current Price</div>
            <div className="mt-1 flex items-center">
              <div>
                <EthereumIcon className="" size={20} />
              </div>
              <span className="ml-2 text-[30px] text-[#353840]">
                {asset?.price ?? 10}
              </span>
            </div>
            <div className="mt-2">
              <button className="rounded-[10px] border border-[#2081E2] px-5 py-3 text-[16px] text-[#2081E2]">
                Withdraw
              </button>
            </div>
          </div>
          <div className="border-[rgb(229, 232, 235)] mt-[20px] rounded-[10px] border text-[#808080]">
            <div className="border-[rgb(229, 232, 235)] flex items-center border-b p-[20px] text-[#808080]">
              <ViewListIcon className="" size={20} />
              <div className="ml-2 font-semibold">Description</div>
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
