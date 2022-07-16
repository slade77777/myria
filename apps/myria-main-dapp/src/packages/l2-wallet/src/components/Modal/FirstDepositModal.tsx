import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import { IMyriaClient, Modules, MyriaClient, Types } from 'myria-core-sdk';
import cn from 'classnames';

import { RootState } from '../../app/store';
import CurrencySelector, { TOption } from '../Dropdown/CurrencySelector';
import MaxInput from '../Input/MaxInput';
import { ThreeDotsVerticalIcon } from '../Icons';

// import TestToken from '../../assets/images/TT.png';
import useBalanceL1 from '../../common/hooks/useBalanceL1';

import {
  ProgressIcon,
  InfoCircleIcon,
  TickCircleIcon,
} from '../../components/Icons';

import { TokenType } from '../../common/type';
import { setDepositAmount } from '../../app/slices/uiSlice';

type Props = {
  modalShow: Boolean;
  closeModal: any;
  completeDepositModal: any;
};

const options: Array<TOption> = [
  {
    id: 1,
    name: 'Ethereum',
    short: 'ETH',
    ico: '/assets/images/eth.png',
    tokenAddress: '',
  },
  // {
  //   id: 1,
  //   name: 'Test Token1',
  //   short: 'T1',
  //   ico: TestToken,
  //   tokenAddress: '0x1efbAF9c41C8e9Ed5211B78c615Cc2Cd5D8fAdEA',
  // },
];

declare let window: any;

enum PROGRESS {
  START,
  PROCESSING,
  COMPLETED,
}

export default function FirstDepositModal({
  modalShow,
  closeModal,
  completeDepositModal,
}: Props) {
  const pKey = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );
  const connectedAccount = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );
  const dispatch = useDispatch();
  const [selectedToken, setSelectedToken] = useState<TOption>(options[0]);
  const [amount, setAmount] = useState<number>(0);
  const [isValidDeposit, setIsValidDeposit] = useState<Boolean>(false);
  const [depositProgress, setDepositProgress] = useState<number>(
    PROGRESS.START,
  );

  const { balanceL1 } = useBalanceL1(selectedToken, connectedAccount);

  const selectCurrency = (param: any) => {
    setSelectedToken(param);
  };

  const setAmountHandle = (param: string) => {
    if (param !== '') {
      setAmount(parseFloat(param.toString()));
    } else setAmount(0);
  };

  useEffect(() => {
    if (
      selectedToken &&
      !(amount > parseFloat(balanceL1)) &&
      amount !== parseFloat('0')
    ) {
      setIsValidDeposit(true);
    } else setIsValidDeposit(false);
  }, [selectedToken, amount, balanceL1]);

  const deposit = async () => {
    try {
      setDepositProgress(PROGRESS.PROCESSING);
      const initializeClient: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: 5,
        web3: window.web3,
      };
      const myriaClient = new MyriaClient(initializeClient);
      const moduleFactory = new Modules.ModuleFactory(myriaClient);
      const depositModule = moduleFactory.getDepositModule();
      if (selectedToken.name === 'Ethereum') {
        await depositModule.depositEth(
          {
            starkKey: '0x' + pKey,
            tokenType: TokenType.ETH,
            amount: Web3.utils.toWei(amount.toString()),
          },
          {
            confirmationType: Types.ConfirmationType.Confirmed,
            from: connectedAccount,
            value: Web3.utils.toWei(amount.toString()),
          },
        );
      } else {
        await depositModule.depositERC20Token(
          {
            starkKey: '0x' + pKey,
            tokenAddress: selectedToken.tokenAddress,
            tokenType: TokenType.ERC20,
            quantizedAmount: amount.toString(),
          },
          {
            from: connectedAccount,
            confirmationType: Types.ConfirmationType.Confirmed,
          },
        );
      }
      setDepositProgress(PROGRESS.COMPLETED);
    } catch (err) {
      console.log(err);
      setDepositProgress(PROGRESS.START);
      // toast('Error occured when deposit. Please try again!');
    }
  };

  return (
    <div>
      <div
        className={cn(
          'absolute top-[100px] right-[21px] w-[406px] rounded-[20px] border border-[#202230] bg-[#081824] py-6',
          modalShow ? 'block' : 'hidden',
        )}
      >
        <div>
          <div className="">
            <div className="flex items-center justify-between px-6">
              <div className="text-[20px] font-bold text-[#E7EBEE]">
                Make your first deposit
              </div>
              <ThreeDotsVerticalIcon className="text-[#A1AFBA]" size={32} />
            </div>

            <div className="relative h-[20px] w-[20px]">
              <div className="absolute top-[-66px] left-[250px] h-[20px] w-[20px] rotate-45 border-t border-l border-[#202230] bg-[#081824]" />
            </div>
            <div className="px-6">
              {depositProgress === PROGRESS.START && (
                <div>
                  <div className="mt-[15px]">
                    <div className="mb-2 text-[14px] text-white">Asset</div>
                    <CurrencySelector
                      options={options}
                      selectHandle={selectCurrency}
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between">
                      <div className="mb-2 text-[14px] text-white">Amount</div>
                      <div className="flex items-center text-[14px] text-[#777777]">
                        <span className="text-[#9DA3A7]">Available</span>{' '}
                        <span className="ml-2 text-white">{balanceL1}</span>
                        <InfoCircleIcon className="ml-1 text-[#A1AFBA]" />
                      </div>
                    </div>
                    <MaxInput
                      max={parseFloat(balanceL1)}
                      onChangeHandle={setAmountHandle}
                    />
                    {/* <div className="flex justify-between mt-2">
                      <div className="text-[rgba(255,255,255,0.6)] text-[14px]">
                        Estimated gas fee
                      </div>
                      <div className="text-[#777777] text-[14px]">
                        <span className="text-[#9DA3A7]">0.0431917 ETH</span>
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="mt-4 text-[12px] text-[#A1AFBA] p-4 bg-[#050E15] mt-6 rounded-[8px]">
                    If you deposit more than{' '}
                    <span className="text-white text-[14px]">$500 USD</span> for
                    your first transaction, we will cover the gas fees.{' '}
                    <Link className="text-[#f5b941]" to="/">
                      Learn more
                    </Link>
                  </div> */}
                  <div className="mt-[32px] mt-[239px] flex w-full justify-between px-1">
                    <button
                      className="text-[14px] text-white"
                      onClick={closeModal}
                    >
                      I&apos;ll do this later
                    </button>
                    <button
                      disabled={!isValidDeposit}
                      onClick={deposit}
                      className={cn(
                        'rounded-[8px] py-[9px] px-[33px] text-[14px]',
                        isValidDeposit
                          ? 'bg-[#F5B941] text-[#040B10]'
                          : 'bg-[#4B5563] text-[#9CA3AF]',
                      )}
                    >
                      DEPOSIT
                    </button>
                  </div>
                </div>
              )}

              {depositProgress === PROGRESS.PROCESSING && (
                <div>
                  <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
                    <ProgressIcon
                      size={64}
                      className="w-full text-[#9ECEAB] "
                    />
                  </div>
                  <div className="mt-[24px] text-center text-[24px] text-white">
                    Deposit in progress
                  </div>
                  <div className="mt-[32px] rounded-[8px] bg-[rgba(5,14,21,0.5)] py-2 px-4 text-[16px] text-black">
                    <div className="flex justify-between">
                      <span className="text-[#9BA1A5]">Amount</span>
                      <span className="text-white">
                        {amount} {selectedToken.short}
                      </span>
                    </div>
                    <div className="mt-[13px] flex justify-between">
                      <span className="text-[#9BA1A5]">
                        Estimated completion
                      </span>
                      <span className="text-white">1-2 minutes</span>
                    </div>
                    <div className="mt-[13px] flex justify-between">
                      <span className="text-[#9BA1A5]">Transaction ID</span>
                      <Link to="/">
                        <span className="text-[#F5B941]">View</span>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4 flex rounded-[8px] border border-[rgba(154,201,227,0.2)] bg-[rgba(154,201,227,0.1)] py-4 px-[14px]">
                    <div className="mr-[9px] flex-none">
                      <InfoCircleIcon className="text-[#9AC9E3]" />
                    </div>
                    <div className="text-[12px] text-[#9AC9E3]">
                      Your deposit has been confirmed and is now in progress.
                      You will receive a notification once the deposit is
                      complete.
                    </div>
                  </div>
                  <div className="mt-[32px] flex w-full justify-end">
                    <button
                      disabled
                      className="flex rounded-[8px] bg-[#4B5563] py-[9px] px-4 text-[14px] font-bold uppercase text-[#9CA3AF]"
                    >
                      Processing{' '}
                      <ProgressIcon className="ml-2 text-[#9CA3AF]" size={16} />
                    </button>
                  </div>
                </div>
              )}

              {depositProgress === PROGRESS.COMPLETED && (
                <div>
                  <div className="mt-[57px] flex justify-center">
                    <TickCircleIcon className="text-[#9ECEAB]" />
                  </div>

                  <div className="mt-[24px] text-center text-[24px] text-white">
                    Deposit complete
                  </div>
                  <div className="mt-[32px] rounded-[8px] bg-[rgba(5,14,21,0.5)] py-2 px-4 text-[16px] text-black">
                    <div className="flex justify-between">
                      <span className="text-[16px] text-[#9BA1A5]">Amount</span>
                      <span className="text-[16px] text-white">
                        {amount} {selectedToken.short}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-[16px] text-[#9BA1A5]">
                        Transaction ID
                      </span>
                      <span className="text-[16px] text-[#F5B941]">View</span>
                    </div>
                  </div>
                  <div className="mt-4 flex rounded-[8px] border border-[#D9D9D9] py-4 px-[14px]">
                    <div className="mr-[9px] flex-none">
                      <InfoCircleIcon />
                    </div>
                    <div className="text-[12px] text-[#777777]">
                      Your deposit is now complete and your funds have been
                      added to your Myria wallet
                    </div>
                  </div>
                  <div className="mt-[32px] flex w-full justify-end">
                    <button
                      className="flex w-full w-[126px] items-center justify-center rounded-[8px] bg-[#F5B941] py-[13px] pt-[15px] text-[16px] font-bold text-[#040B10]"
                      onClick={() => {
                        dispatch(setDepositAmount(amount));
                        closeModal();
                        completeDepositModal();
                      }}
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
