import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import { IMyriaClient, Modules, MyriaClient, Types } from 'myria-core-sdk';
import cn from 'classnames';

import Modal from '.';
import { RootState } from '../../app/store';
import CurrencySelector, { TOption } from '../Dropdown/CurrencySelector';
import MaxInput from '../Input/MaxInput';

import Ethereum from '../../assets/images/ethereum.png';
import TestToken from '../../assets/images/TT.png';
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
    ico: Ethereum,
    tokenAddress: '',
  },
  {
    id: 1,
    name: 'Test Token1',
    short: 'T1',
    ico: TestToken,
    tokenAddress: '0x1efbAF9c41C8e9Ed5211B78c615Cc2Cd5D8fAdEA',
  },
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
      {modalShow && (
        <Modal
          closeModal={() => closeModal()}
          className="max-w-[576px] p-[32px] bg-[#081824]"
          width="438px"
          cannotCloseFromOutside
          title="Make your first deposit"
        >
          <div>
            <div className="">
              {depositProgress === PROGRESS.START && (
                <div>
                  <div className="mt-[44px]">
                    <div className="text-white text-[14px] mb-2">Asset</div>
                    <CurrencySelector
                      options={options}
                      selectHandle={selectCurrency}
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between">
                      <div className="text-white text-[14px] mb-2">Amount</div>
                      <div className="text-[#777777] text-[14px]">
                        <span className="text-[#9DA3A7]">Available</span>{' '}
                        <span className="text-white">{balanceL1}</span>
                      </div>
                    </div>
                    <MaxInput
                      max={parseFloat(balanceL1)}
                      onChangeHandle={setAmountHandle}
                    />
                    <div className="flex justify-between mt-2">
                      <div className="text-[rgba(255,255,255,0.6)] text-[14px]">
                        Estimated gas fee
                      </div>
                      <div className="text-[#777777] text-[14px]">
                        <span className="text-[#9DA3A7]">0.0431917 ETH</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-[12px] text-[#A1AFBA] p-4 bg-[#050E15] mt-6 rounded-[8px]">
                    If you deposit more than{' '}
                    <span className="text-white text-[14px]">$500 USD</span> for
                    your first transaction, we will cover the gas fees.{' '}
                    <Link className="text-[#f5b941]" to="/">
                      Learn more
                    </Link>
                  </div>
                  <div className="w-full mt-[32px] flex justify-between">
                    <button className="text-white" onClick={closeModal}>
                      I’LL DEPOSIT LATER
                    </button>
                    <button
                      disabled={!isValidDeposit}
                      onClick={deposit}
                      className={cn(
                        'text-[14px] py-[9px] px-[33px] rounded-[8px]',
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
                  <div className="flex w-[64px] h-[64px] justify-center mt-[57px] mx-auto">
                    <ProgressIcon
                      size={64}
                      className="text-[#9ECEAB] w-full "
                    />
                  </div>
                  <div className="text-center text-white text-[24px] mt-[24px]">
                    Deposit in progress
                  </div>
                  <div className="bg-[rgba(5,14,21,0.5)] py-2 px-4 rounded-[8px] text-black text-[16px] mt-[32px]">
                    <div className="flex justify-between">
                      <span className="text-[#9BA1A5]">Amount</span>
                      <span className="text-white">
                        {amount} {selectedToken.short}
                      </span>
                    </div>
                    <div className="flex justify-between mt-[13px]">
                      <span className="text-[#9BA1A5]">
                        Estimated completion
                      </span>
                      <span className="text-white">1-2 minutes</span>
                    </div>
                    <div className="flex justify-between mt-[13px]">
                      <span className="text-[#9BA1A5]">Transaction ID</span>
                      <Link to="/">
                        <span className="text-[#F5B941]">View</span>
                      </Link>
                    </div>
                  </div>
                  <div className="flex py-4 px-[14px] border-[rgba(154,201,227,0.2)] bg-[rgba(154,201,227,0.1)] border rounded-[8px] mt-4">
                    <div className="flex-none mr-[9px]">
                      <InfoCircleIcon className="text-[#9AC9E3]" />
                    </div>
                    <div className="text-[#9AC9E3] text-[12px]">
                      Your deposit has been confirmed and is now in progress.
                      You will receive a notification once the deposit is
                      complete.
                    </div>
                  </div>
                  <div className="mt-[32px] flex w-full justify-end">
                    <button
                      disabled
                      className="bg-[#4B5563] text-[14px] py-[9px] px-4 rounded-[8px] flex uppercase font-bold text-[#9CA3AF]"
                    >
                      Processing{' '}
                      <ProgressIcon className="ml-2 text-[#9CA3AF]" size={16} />
                    </button>
                  </div>
                </div>
              )}

              {depositProgress === PROGRESS.COMPLETED && (
                <div>
                  <div className="flex justify-center mt-[57px]">
                    <TickCircleIcon className="text-[#9ECEAB]" />
                  </div>

                  <div className="text-center text-white text-[24px] mt-[24px]">
                    Deposit complete
                  </div>
                  <div className="bg-[rgba(5,14,21,0.5)] py-2 px-4 rounded-[8px] text-black text-[16px] mt-[32px]">
                    <div className="flex justify-between">
                      <span className="text-[#9BA1A5] text-[16px]">Amount</span>
                      <span className="text-white text-[16px]">
                        {amount} {selectedToken.short}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[#9BA1A5] text-[16px]">
                        Transaction ID
                      </span>
                      <span className="text-[#F5B941] text-[16px]">View</span>
                    </div>
                  </div>
                  <div className="flex py-4 px-[14px] border-[#D9D9D9] border rounded-[8px] mt-4">
                    <div className="flex-none mr-[9px]">
                      <InfoCircleIcon />
                    </div>
                    <div className="text-[#777777] text-[12px]">
                      Your deposit is now complete and your funds have been
                      added to your Myria wallet
                    </div>
                  </div>
                  <div className="mt-[32px] flex w-full justify-end">
                    <button
                      className="text-[16px] text-[#040B10] w-full bg-[#F5B941] pt-[15px] py-[13px] font-bold rounded-[8px] flex justify-center items-center w-[126px]"
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
        </Modal>
      )}
    </div>
  );
}
