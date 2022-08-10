import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
interface IProp {
  onHandleCancel?: () => void;
  onHandleUnlist?: () => void;
}

const UnlistModalContent: React.FC<IProp> = ({ onHandleCancel, onHandleUnlist }) => {
  return (
    <div className="p-8 pb-1">
      <div className="text-sm font-normal mt-[10px] mb-[20px]">
        <span className="text-base/9">
          <Trans>
            Please confirm your unlisting action. Your listed NFT
            <span className="text-[16px]  text-white mx-1">
              {' '}
              Ultra Rare Vector Prime Sigil{' '}
            </span>{' '}
            will not be for sale after unlisted.
          </Trans>
        </span>
      </div>
      <div className="mt-8">
        <button
          className="bg-primary/6 text-base/1 mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold"
          onClick={onHandleUnlist}>
          <Trans>UNLIST THIS ITEM</Trans>
        </button>
        <button
          className="my-[10px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold text-white"
          onClick={onHandleCancel}>
          <Trans>CANCEL</Trans>
        </button>
      </div>
    </div>
  );
};
export default UnlistModalContent;
