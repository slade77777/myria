import React from 'react';
import ClockIcon from 'src/components/icons/ClockIcon';
import NftItem from '../NftItem';
import { NFTItemType } from '../NftItem/type';

interface Props {
  title: string;
  items: NFTItemType[] | undefined;
  refreshList?: () => void;
}

const AssetList: React.FC<Props> = ({ title, items, refreshList }) => {
  return (
    <div className="max-w-content mx-auto">
      <div className="flex justify-between">
        <span className="text-[24px] font-bold text-white">{title}</span>
        {refreshList && (
          <div className="cursor-pointer" onClick={refreshList}>
            <ClockIcon size={48} />
          </div>
        )}
      </div>
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
