// Import packages
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import cn from 'classnames';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { ConfirmationType } from 'myria-core-sdk';

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
import { useL2WalletContext } from '../../../../../../src/context/l2-wallet';
import { useAuthenticationContext } from '../../../../../../src/context/authentication';
import { getModuleFactory } from '../../services/myriaCoreSdk';
import {
  convertQuantizedAmountToEth,
  convertWeiToEth,
} from '../../utils/Converter';

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
  const { disconnectL2Wallet } = useL2WalletContext();
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
            confirmationType: ConfirmationType.Sender,
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
            confirmationType: ConfirmationType.Confirmed,
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
    disconnectL2Wallet();
    logout();
  };

  return (
    <div className="mx-auto w-[358px] py-6">
      {/* Header Part */}
      <div className="flex items-center justify-between border-b border-[#202230] px-6 pb-[21px] text-sm text-[#666666]">
        <div className="flex items-center">
          <ConnectIcon />
          <span className="ml-3 text-white/60">{abbreviationAddress}</span>
        </div>
        <div className="text-primary/6" onClick={disconnectWallet}>
          Disconnect
        </div>
      </div>

      {/* Body Part */}
      <div className="">
        <div className="mt-[29px] flex justify-center">
          <TickCircleIcon className="text-light-green" />
        </div>
        {withdrawalCompleted ? (
          <div className="mt-6 text-center text-2xl text-white">
            Withdrawal complete
          </div>
        ) : (
          <div className="mt-6 text-center text-2xl text-white">
            Withdrawal ready to claim
          </div>
        )}

        <div className="bg-base/2 mt-8 rounded-lg p-4 text-base">
          <div className="flex justify-between text-white">
            <span>Amount</span>
            <span>
              {/* {amount} {selectedToken.short} */}
              {selectedToken.name === 'Ethereum'
                ? convertWeiToEth(claimAmount.toString())
                : claimAmount}{' '}
              {selectedToken.short}
            </span>
          </div>
        </div>
        <div className="mt-4 flex rounded-lg border border-[#D9D9D9] bg-[rgba(154,201,227,0.1)] py-4 px-[14px]">
          <div className="mr-2 flex-none">
            <InfoCircleIcon />
          </div>
          <div className="text-blue/6 text-xs">
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
                'flex w-full items-center justify-center rounded-lg py-2 pt-4 text-base font-bold text-black',
                'bg-primary/6',
              )}
            >
              OK
            </button>
          ) : (
            <button
              disabled={withdrawProgress}
              onClick={claimWithdraw}
              className={cn(
                'flex w-full items-center justify-center rounded-lg py-2 pt-4 text-base font-bold text-black',
                withdrawProgress ? 'bg-gray/4 cursor-progress' : 'bg-primary/6',
              )}
            >
              {withdrawProgress ? (
                <span className="text-gray/6 flex items-center">
                  PROCESSING{' '}
                  <ProgressIcon size={16} className="text-gray/6 ml-2 w-full" />
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
