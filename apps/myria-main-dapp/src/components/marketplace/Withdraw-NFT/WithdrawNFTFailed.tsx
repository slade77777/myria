import { Trans } from '@lingui/macro';
import React from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { CircleCloseIcon } from 'src/packages/l2-wallet/src/components/Icons';

type Props = {};

export default function WithdrawNFTFailed({}: Props) {
  const { valueNFT, status, setStatus } = useWithDrawNFTContext();
  return (
    <div className="mt-[29px]">
      <div className="px-[25px]">
        <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
          <CircleCloseIcon className="text-[#F37272]" />
        </div>

        <div className="mt-[24px] text-center text-[24px] text-white">Withdraw failed</div>
        <div className="text-base/9 text-[14px] text-center mt-4">
          <span>
            <Trans>Your withdrawal could not be completed due to an error.</Trans>
          </span>
        </div>
      </div>
      <div className="mt-[32px] text-[14px] font-normal rounded-[8px] bg-base/2/[.5] p-4 text-white">
        <div className="flex justify-between">
          <span className="text-base/9">
            <Trans>Item</Trans>
          </span>
          <span className="flex font-medium">{valueNFT.name}</span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span className="flex items-center text-base/9">
            <Trans>Transaction ID</Trans>
          </span>
          <span className="flex items-center text-[#F5B941] font-medium cursor-pointer cursor-pointer">
            <Trans>View</Trans>
          </span>
        </div>
      </div>
      <div className="mt-[138px] flex justify-end">
        <button
          onClick={() => {
            const triggerWithdraw = document.getElementById('trigger-popover-withdraw');
            triggerWithdraw?.click();
          }}
          className="flex w-full items-center justify-center rounded-[8px] bg-[#F5B941] px-[20px] py-[12px] text-[16px] font-bold text-[#040B10]">
          <span>
            <Trans>OK</Trans>
          </span>
        </button>
      </div>
    </div>
  );
}
