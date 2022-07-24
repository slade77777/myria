import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
import { InfoCircleIcon, ProgressIcon } from 'src/packages/l2-wallet/src/components/Icons';
import { formatPrice } from 'src/utils';

type Props = {
  valueNFT: any;
};

export default function WithdrawNFTInProgress({ valueNFT }: Props) {
  return (
    <div className="mt-[29px]">
      <div className="px-[45px]">
        <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
          <ProgressIcon color="#9AC9E3" size={64} className="w-full text-[#9ECEAB]" />
        </div>

        <div className="mt-[24px] text-center text-[24px] text-white">Withdrawal in progress</div>
        <div className="text-[14px] text-[#777777] text-center mt-4">
          <Trans>You will receive a notification once your item is ready to be claimed.</Trans>
        </div>
      </div>
      <div className="mt-[32px] rounded-[8px] bg-[#050E15] p-4 text-[14px] text-white">
        <div className="flex justify-between">
          <span>
            <Trans>Amount</Trans>
          </span>
          <span className="flex gap-1">1</span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span className="flex items-center gap-1">
            <Trans>Estimated completion</Trans>
            <InfoCircleIcon size={14} />
          </span>
          <span>10-20 hours</span>
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
