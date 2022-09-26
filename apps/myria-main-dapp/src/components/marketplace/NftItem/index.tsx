import Link from 'next/link';
import React, { useCallback } from 'react';
import { formatPrice, getRarityColor, validatedImageAssets } from 'src/utils';
import { NFTItemType } from './type';
import { useGA4 } from '../../../lib/ga';
import { useAuthenticationContext } from '../../../context/authentication';
import { useWalletContext } from '../../../context/wallet';
import { assetModule } from 'src/services/myriaCore';
import { useRouter } from 'next/router';

interface Props {
  item: NFTItemType;
}

const DAOIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g clipPath="url(#clip0_2574_9572)">
      <path
        d="M7.99895 0.5L7.8916 0.864618V11.4441L7.99895 11.5512L12.9097 8.64836L7.99895 0.5Z"
        fill="white"
      />
      <path
        d="M7.99878 0.5L3.08789 8.64836L7.99878 11.5512V6.41618V0.5Z"
        fill="white"
        fillOpacity="0.5"
      />
      <path
        d="M7.99898 12.4809L7.93848 12.5546V16.3232L7.99898 16.4998L12.9127 9.57959L7.99898 12.4809Z"
        fill="white"
      />
      <path
        d="M7.99878 16.4998V12.4809L3.08789 9.57959L7.99878 16.4998Z"
        fill="white"
        fillOpacity="0.5"
      />
      <path d="M7.99854 11.5512L12.9093 8.64843L7.99854 6.41626V11.5512Z" fill="#A1AFBA" />
      <path d="M3.08789 8.64843L7.99878 11.5512V6.41626L3.08789 8.64843Z" fill="#E7EBEE" />
    </g>
    <defs>
      <clipPath id="clip0_2574_9572">
        <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
);

const NftItem = ({ item }: Props) => {
  const { event } = useGA4();
  const { user } = useAuthenticationContext();
  const { address } = useWalletContext();
  const router = useRouter();

  const rarityColor = getRarityColor(item.rarity);
  const price = parseFloat(item.priceETH + '');

  const onClickItemTracking = useCallback(() => {
    assetModule?.getAssetById(item.id).then((asset: any) => {
      event('MKP Item Selected', {
        myria_id: user?.user_id,
        wallet_address: `_${address}`,
        item_name: item.name,
        item_id: item.id,
        collection_name: asset?.data?.collectionName,
        collection_author: asset?.data?.creator?.name
      });
    });
  }, [item, user, address]);
  const hastPath = router.pathname.split('/');
  const beforeHash = hastPath[hastPath.length - 1];

  return (
    <Link
      href={{
        pathname: `/marketplace/asset-detail`,
        query: { id: item.id },
        hash: `${beforeHash}`
      }}
      key={item.id}>
      <a onClick={onClickItemTracking}>
        <div className="cursor-pointer snap-start">
          <div className="bg-brand-deep-blue block w-full max-w-[298px] overflow-hidden rounded-[5px]">
            <div className="relative flex h-[298px] w-full items-center justify-center lg:h-[248px]">
              <div className="absolute h-full w-full bg-[#081824]" />
              <div
                className="z-1 absolute h-full w-full opacity-[0.3]"
                style={{ backgroundColor: rarityColor }}
              />
              <div
                className="z-2 absolute h-full w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${validatedImageAssets(item.image_url, item)})`
                }}
              />
            </div>
            <div className="p-4">
              <span className="block text-[12px] font-normal text-[#9CA3AF]">
                {item?.collection?.name || 'Sigil Myriaverse'}
              </span>
              <span className="mb-4 block truncate text-[14px] font-medium text-white">
                {item.name}
              </span>
              <div>
                <div className="flex items-center justify-between">
                  <span className="mb-1 block text-[12px] font-normal text-[#9CA3AF]">Creator</span>
                  <span className="mb-1 block text-[12px] font-normal text-[#9CA3AF]">
                    Current price
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex w-3/5">
                    <img src={item.creatorImg} alt="creator" className="mr-1 h-5 w-5" />
                    <p className="truncate break-words text-[14px] font-medium text-white">
                      {item.creator}
                    </p>
                  </div>
                  {price > 0 ? (
                    <div className="flex w-2/5 items-center justify-end">
                      <DAOIcon className="mr-1" />
                      <span className="truncate text-[16px] font-medium text-white">
                        {formatPrice(price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[16px] font-medium text-white">Not for Sale</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default NftItem;
