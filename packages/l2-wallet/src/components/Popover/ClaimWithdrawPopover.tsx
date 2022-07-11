// Import packages
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import cn from 'classnames';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { IMyriaClient, Modules, MyriaClient, Types } from 'myria-core-sdk';

// Import components
import {
  ConnectIcon,
  ProgressIcon,
  TickCircleIcon,
  InfoCircleIcon,
} from '../Icons';

// Import Redux
import { RootState } from '../../app/store';

// Import type
// import { TokenType } from '../../common/type';

type Props = {
  abbreviationAddress: string;
  onClosePopover?: () => void;
};

// enum STATUS {
//   READY,
//   PROCESSING,
//   COMPLETED,
// }

declare let window: any;

export default function ClaimWithdrawPopover({
  abbreviationAddress,
  onClosePopover = () => {},
}: Props) {
  const [withdrawalCompleted, setWithdrawalCompleted] =
    useState<boolean>(false);
  const [withdrawProgress, setWithdrawProgress] = useState<boolean>(false);
  const pKey = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );
  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken,
  );
  const claimAmount = useSelector((state: RootState) => state.ui.claimAmount);
  const connectedAccount = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );

  const claimWithdraw = async () => {
    try {
      setWithdrawProgress(true);
      const initializeClient: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: 5,
        web3: window.web3,
      };

      const myriaClient = new MyriaClient(initializeClient);

      const moduleFactory = new Modules.ModuleFactory(myriaClient);
      const withdrawModule = moduleFactory.getWithdrawModule();
      if (selectedToken.name === 'Ethereum') {
        const assetType = asset.getAssetType({
          type: 'ETH',
          data: {
            quantum: '1',
          },
        });
        await withdrawModule.withdrawalOnchain(
          {
            starkKey: '0x' + pKey,
            assetType,
          },
          {
            from: connectedAccount,
            nonce: '1',
            confirmationType: Types.ConfirmationType.Confirmed,
          },
        );
      } else {
        const assetType = asset.getAssetType({
          type: 'ERC20',
          data: {
            quantum: '1',
            tokenAddress: selectedToken.tokenAddress,
          },
        });
        await withdrawModule.withdrawalOnchain(
          {
            starkKey: '0x' + pKey,
            assetType,
          },
          {
            from: connectedAccount,
            nonce: '1',
            confirmationType: Types.ConfirmationType.Confirmed,
          },
        );
      }
      setWithdrawProgress(false);
      setWithdrawalCompleted(true);
    } catch (err) {
      setWithdrawProgress(false);
      console.log(err);
    }
  };

  return (
    <div className="py-[24px]">
      {/* Header Part */}
      <div className="flex items-center justify-between text-[14px] text-[#666666] border-b border-[#202230] pb-[21px] px-[24px]">
        <div className="flex items-center">
          <ConnectIcon />
          <span className="ml-[10px] text-[rgba(255,255,255,0.6)]">
            {abbreviationAddress}
          </span>
        </div>
        <div className="text-[#F5B941]">Disconnect</div>
      </div>

      {/* Body Part */}
      <div className="px-[24px]">
        <div className="flex justify-center mt-[29px]">
          <TickCircleIcon className="text-[#9ECEAB]" />
        </div>
        {withdrawalCompleted ? (
          <div className="text-center text-white text-[24px] mt-[24px]">
            Withdrawal complete
          </div>
        ) : (
          <div className="text-center text-white text-[24px] mt-[24px]">
            Withdrawal ready to claim
          </div>
        )}

        <div className="bg-[#050E15] p-4 rounded-[8px] text-[16px] mt-[32px]">
          <div className="flex justify-between text-white">
            <span>Amount</span>
            <span>
              {/* {amount} {selectedToken.short} */}
              {selectedToken.name === 'Ethereum'
                ? Web3.utils.fromWei(claimAmount.toString())
                : claimAmount}{' '}
              {selectedToken.short}
            </span>
          </div>
        </div>
        <div className="flex py-4 px-[14px] bg-[rgba(154,201,227,0.1)] border-[#D9D9D9] border rounded-[8px] mt-4">
          <div className="flex-none mr-[9px]">
            <InfoCircleIcon />
          </div>
          <div className="text-[##9AC9E3] text-[12px]">
            Your withdrawal is now complete. Click below to claim this
            withdrawal to your L1 wallet. Gas fees will apply to this
            transaction.
          </div>
        </div>
        <div className="mt-[78px]">
          {withdrawalCompleted ? (
            <button
              onClick={onClosePopover}
              className={cn(
                'text-[16px] text-black w-full pt-[15px] py-[13px] font-bold rounded-[8px] flex justify-center items-center',
                'bg-[#F5B941]',
              )}
            >
              OK
            </button>
          ) : (
            <button
              disabled={withdrawProgress}
              onClick={claimWithdraw}
              className={cn(
                'text-[16px] text-black w-full pt-[15px] py-[13px] font-bold rounded-[8px] flex justify-center items-center',
                withdrawProgress
                  ? 'bg-[#4B5563] cursor-progress'
                  : 'bg-[#F5B941]',
              )}
            >
              {withdrawProgress ? (
                <span className="text-[#9CA3AF] flex items-center">
                  PROCESSING{' '}
                  <ProgressIcon
                    size={16}
                    className="text-[#9CA3AF] w-full ml-2"
                  />
                </span>
              ) : (
                <span>CLAIM WITHDRAWAL</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ClaimWithdrawPopover.defaultProps = {
  onClosePopover: () => {},
};
