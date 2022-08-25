import React, { useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ClockIcon from 'src/components/icons/ClockIcon';
import { formatPrice } from 'src/utils';
import NftItem from '../NftItem';
import { NFTItemType } from '../NftItem/type';
import avatar from '../../../../public/images/marketplace/avatar.png';

interface Props {
  title?: string;
  items: NFTItemType[] | undefined;
  refreshList?: () => void;
}

const AssetList: React.FC<Props> = ({ title, items }) => {
  return (
    <div>
      {title && (
        <div className="flex justify-between">
          <span className="text-[24px] font-bold text-white">{title}</span>
        </div>
      )}
      <div className="mt-8 grid grid-cols-1 justify-start justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items?.map((item) => (
          <div key={item.id} className="w-full max-w-[298px]">
            <NftItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetList;
