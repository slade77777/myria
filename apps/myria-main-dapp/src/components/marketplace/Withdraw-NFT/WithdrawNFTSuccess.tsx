import { Trans } from '@lingui/macro';
import { FC } from 'react';
import CircleCheckSuccess from 'src/components/icons/CircleCheckSuccess';
import CircleCheckSuccessOutline from 'src/components/icons/CircleCheckSuccessOutline';
import DAOIcon from 'src/components/icons/DAOIcon';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { validatedImage } from 'src/utils';
interface IProp {}

const WithdrawNFTSuccess: FC<IProp> = ({}) => {
  const { valueNFT } = useWithDrawNFTContext();
  return (
    <div className="mt-[29px]">
      <div className="px-[25px]">
        <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
          <CircleCheckSuccessOutline />
        </div>

        <div className="mt-[24px] text-center text-[24px] text-white">Withdrawal complete</div>
        <div className="text-base/9 text-[14px] text-center mt-4">
          <span>
            <Trans>
              Your withdrawal was successful, you should now see your item in your L1 wallet.
            </Trans>
          </span>
        </div>
      </div>
      <div className="mt-[32px] text-[14px] font-normal rounded-[8px] bg-base/2/50 p-4 text-white">
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
};
export default WithdrawNFTSuccess;
