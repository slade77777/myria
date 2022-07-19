import Link from 'next/link';
import React from 'react';
import { formatNumber2digits, getRarityColor, validatedImage } from 'src/utils';
import { NFTItemType } from './type';

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
  const rarityColor = getRarityColor(item.rarity);

  return (
    <Link href={`/marketplace/asset-detail?id=${item.id}`} key={item.id}>
      <a href={`/marketplace/asset-detail?id=${item.id}`}>
        <div className="snap-start cursor-pointer">
          <div className="block w-full max-w-[298px] overflow-hidden rounded-[5px] bg-brand-deep-blue">
            <div className="relative flex h-[298px] w-full items-center justify-center lg:h-[248px]">
              <div className="absolute h-full w-full bg-[#081824]" />
              <div
                className="z-1 absolute h-full w-full opacity-[0.3]"
                style={{ backgroundColor: rarityColor }}
              />
              <div
                className="z-2 absolute h-full w-full bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${validatedImage(item.image_url)})`
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
                <div className="flex justify-between items-center">
                  <span className="mb-1 block text-[12px] font-normal text-[#9CA3AF]">Owner</span>
                  <span className="mb-1 block text-[12px] font-normal text-[#9CA3AF]">
                    Current price
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <img src={item.creatorImg} alt="creator" className="mr-1" />
                    <p className="text-[14px] font-medium text-white break-words">{item.creator}</p>
                  </div>
                  {item.priceETH ? (
                    <div className="flex items-center">
                      <DAOIcon className="mr-1" />
                      <span className="text-[16px] font-medium text-white">
                        {formatNumber2digits(item.priceETH)}
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
