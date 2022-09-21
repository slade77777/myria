import clsx from 'clsx';
import React from 'react';
import NftItem from '../NftItem';
import { NFTItemType } from '../NftItem/type';

interface Props {
  title?: string;
  items: NFTItemType[] | undefined;
  isFilter?: boolean;
  refreshList?: () => void;
}

const AssetList: React.FC<Props> = ({ title, items, isFilter = false }) => {
  return (
    <div className="w-full">
      {title && (
        <div className="flex justify-between">
          <span className="text-[24px] font-bold text-white">{title}</span>
        </div>
      )}
      <div
        className={clsx(
          'grid grid-cols-1 justify-start justify-items-center sm:grid-cols-2 gap-6',
          isFilter ? 'mt-4 md:grid-cols-2 lg:grid-cols-3' : 'mt-8 md:grid-cols-3 lg:grid-cols-4'
        )}>
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
