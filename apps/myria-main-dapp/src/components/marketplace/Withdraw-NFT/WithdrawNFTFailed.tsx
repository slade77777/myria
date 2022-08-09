import { Trans } from '@lingui/macro';
import React from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { CircleCloseIcon } from 'src/packages/l2-wallet/src/components/Icons';

type Props = {};

export default function WithdrawNFTFailed({}: Props) {
  const { valueNFT, status, setStatus } = useWithDrawNFTContext();
  return (
    <>
      <div className="grow">
        <div className="px-6">
          <div className="mx-auto mt-14 flex h-16 w-16 justify-center">
            <CircleCloseIcon className="text-error/6" />
          </div>

          <div className="mt-6 text-center text-2xl text-white">Withdraw failed</div>
          <div className="text-base/9 text-sm text-center mt-4">
            <span>
              <Trans>Your withdrawal could not be completed due to an error.</Trans>
            </span>
          </div>
        </div>
        <div className="mt-8 text-sm font-normal rounded-lg bg-base/2/50 p-4 text-white">
          <div className="flex justify-between">
            <span className="text-base/9">
              <Trans>Item</Trans>
            </span>
            <span className="flex font-medium">{valueNFT.name}</span>
          </div>
          <div className="mt-3 flex justify-between">
            <span className="flex items-center text-base/9">
              <Trans>Transaction ID</Trans>
            </span>
            <span className="flex items-center text-primary/6 font-medium cursor-pointer">
              <Trans>View</Trans>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            const triggerWithdraw = document.getElementById('trigger-popover-withdraw');
            triggerWithdraw?.click();
          }}
          className="flex w-full items-center justify-center rounded-lg bg-primary/6 px-5 py-3 text-base font-bold text-base/1">
          <span>
            <Trans>OK</Trans>
          </span>
        </button>
      </div>
    </>
  );
}
