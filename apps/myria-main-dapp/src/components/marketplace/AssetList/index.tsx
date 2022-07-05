import React from 'react';
import NftItem from '../NftItem';
import { NFTItemType } from '../NftItem/type';

interface Props {
  title: string;
  showIcon?: boolean;
  items: NFTItemType[];
}

const AssetList: React.FC<Props> = ({ title, items, showIcon = false }) => {

  return (
    <div className='mx-auto max-w-content'>
      <div className="mb-[48px] flex justify-between">
        <span className="text-[24px] font-bold text-white">{title}</span>
        {
          showIcon && <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#0B2231" />
            <path
              d="M24 20V24L26 26"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.055 22.8987C13.999 23.4482 14.399 23.939 14.9485 23.9949C15.4979 24.0509 15.9887 23.6509 16.0447 23.1014L14.055 22.8987ZM16.4891 26.657C16.2996 26.1382 15.7255 25.8713 15.2067 26.0608C14.6879 26.2503 14.421 26.8244 14.6105 27.3432L16.4891 26.657ZM14.0498 32.0001C14.0498 32.5524 14.4975 33.0001 15.0498 33.0001C15.6021 33.0001 16.0498 32.5524 16.0498 32.0001H14.0498ZM15.0498 27.0001V26.0001C14.4975 26.0001 14.0498 26.4478 14.0498 27.0001H15.0498ZM20.0498 28.0001C20.6021 28.0001 21.0498 27.5524 21.0498 27.0001C21.0498 26.4478 20.6021 26.0001 20.0498 26.0001V28.0001ZM16.0447 23.1014C16.457 19.0529 19.8429 15.9591 23.9121 15.9126L23.8893 13.9128C18.8028 13.9709 14.5704 17.8381 14.055 22.8987L16.0447 23.1014ZM23.9121 15.9126C27.9813 15.8662 31.4369 18.8818 31.9417 22.9198L33.9263 22.6718C33.2953 17.6243 28.9757 13.8547 23.8893 13.9128L23.9121 15.9126ZM31.9417 22.9198C32.4464 26.9579 29.8394 30.7314 25.884 31.688L26.3542 33.6319C31.2984 32.4362 34.5572 27.7193 33.9263 22.6718L31.9417 22.9198ZM25.884 31.688C21.9286 32.6445 17.8854 30.4794 16.4891 26.657L14.6105 27.3432C16.3558 32.1212 21.4099 34.8277 26.3542 33.6319L25.884 31.688ZM16.0498 32.0001V27.0001H14.0498V32.0001H16.0498ZM15.0498 28.0001H20.0498V26.0001H15.0498V28.0001Z"
              fill="white"
            />
          </svg>
        }
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="w-full mb-8">
            <NftItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssetList;
