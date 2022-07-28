// Import packages
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import cn from 'classnames';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { Types } from 'myria-core-sdk';

// Import components
import {
  ConnectIcon,
  ProgressIcon,
  TickCircleIcon,
  InfoCircleIcon,
} from '../Icons';

// Import Redux
import { RootState } from '../../app/store';
import { disconnectAccount } from '../../app/slices/accountSlice';
import { setWithdrawClaimPopover } from '../../app/slices/uiSlice';

// import { useWalletContext } from '../../../src/context/wallet';
import { useWalletContext } from '../../../../../../src/context/wallet';
import { useAuthenticationContext } from '../../../../../../src/context/authentication';
import { getModuleFactory } from '../../services/myriaCoreSdk';

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

const QUANTUM_CONSTANT = 10000000000;

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

  const { disconnect } = useWalletContext();
  const { user, logout } = useAuthenticationContext();

  const dispatch = useDispatch();

  const claimWithdraw = async () => {
    try {
      setWithdrawProgress(true);
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const withdrawModule = moduleFactory.getWithdrawModule();
      if (selectedToken.name === 'Ethereum') {
        const assetType = asset.getAssetType({
          type: 'ETH',
          data: {
            quantum: QUANTUM_CONSTANT.toString(),
          },
        });
        await withdrawModule.withdrawalOnchain(
          {
            starkKey: connectedAccount,
            assetType,
          },
          {
            from: connectedAccount,
            nonce: new Date().getTime(),
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
            starkKey: connectedAccount,
            assetType,
          },
          {
            from: connectedAccount,
            nonce: new Date().getTime(),
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

  const disconnectWallet = () => {
    localStorage.clear();
    dispatch(disconnectAccount());
    disconnect();
    logout();
  };

  return (
    <div className="mx-auto w-[358px] py-[24px]">
      {/* Header Part */}
      <div className="flex items-center justify-between border-b border-[#202230] px-[24px] pb-[21px] text-[14px] text-[#666666]">
        <div className="flex items-center">
          <ConnectIcon />
          <span className="ml-[10px] text-[rgba(255,255,255,0.6)]">
            {abbreviationAddress}
          </span>
        </div>
        <div className="text-[#F5B941]" onClick={disconnectWallet}>
          Disconnect
        </div>
      </div>

      {/* Body Part */}
      <div className="">
        <div className="mt-[29px] flex justify-center">
          <TickCircleIcon className="text-[#9ECEAB]" />
        </div>
        {withdrawalCompleted ? (
          <div className="mt-[24px] text-center text-[24px] text-white">
            Withdrawal complete
          </div>
        ) : (
          <div className="mt-[24px] text-center text-[24px] text-white">
            Withdrawal ready to claim
          </div>
        )}

        <div className="mt-[32px] rounded-[8px] bg-[#050E15] p-4 text-[16px]">
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
        <div className="mt-4 flex rounded-[8px] border border-[#D9D9D9] bg-[rgba(154,201,227,0.1)] py-4 px-[14px]">
          <div className="mr-[9px] flex-none">
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
              onClick={() => {
                dispatch(setWithdrawClaimPopover(false));
                onClosePopover();
              }}
              className={cn(
                'flex w-full items-center justify-center rounded-[8px] py-[13px] pt-[15px] text-[16px] font-bold text-black',
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
                'flex w-full items-center justify-center rounded-[8px] py-[13px] pt-[15px] text-[16px] font-bold text-black',
                withdrawProgress
                  ? 'cursor-progress bg-[#4B5563]'
                  : 'bg-[#F5B941]',
              )}
            >
              {withdrawProgress ? (
                <span className="flex items-center text-[#9CA3AF]">
                  PROCESSING{' '}
                  <ProgressIcon
                    size={16}
                    className="ml-2 w-full text-[#9CA3AF]"
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
