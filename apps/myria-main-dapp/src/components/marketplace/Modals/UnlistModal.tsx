import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
interface IProp {
  assetName: string;
  onHandleCancel?: () => void;
  onHandleUnlist?: () => void;
}

const UnlistModalContent: React.FC<IProp> = ({
  onHandleCancel,
  onHandleUnlist,
  assetName = ''
}) => {
  return (
    <div className="p-8 pb-1">
      <div className="text-sm font-normal mt-[10px] mb-[20px]">
        <span className="text-base/9">
          <Trans>Please confirm your unlisting action. Your listed NFT</Trans>
          <span className="text-base/10 mx-1"> {assetName} </span>{' '}
          <Trans>will not be for sale after unlisted.</Trans>
        </span>
      </div>
      <div className="mt-8">
        <button
          className="bg-primary/6 text-base/1 mb-[10px] mt-10 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg text-base font-bold"
          onClick={onHandleUnlist}>
          <Trans>UNLIST THIS ITEM</Trans>
        </button>
        <button
          className="my-[10px] flex h-14 w-full cursor-pointer items-center justify-center rounded-lg text-base font-bold text-white"
          onClick={onHandleCancel}>
          <Trans>CANCEL</Trans>
        </button>
      </div>
    </div>
  );
};
export default UnlistModalContent;
