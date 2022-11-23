import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import useBalanceL1 from '../../common/hooks/useBalanceL1';
import {
  InfoCircleIcon,
  ProgressIcon,
  TickCircleIcon,
} from '../../components/Icons';
import CurrencySelector, { TOption } from '../Dropdown/CurrencySelector';
import { ThreeDotsVerticalIcon } from '../Icons';
import MaxInput from '../Input/MaxInput';
import { Trans } from '@lingui/macro';
import { TxResult, ConfirmationType } from 'myria-core-sdk';
import { getNetworkId } from 'src/services/myriaCoreSdk';
import { getExplorerForAddress } from 'src/utils';
import DAOIcon from '../../../../../components/icons/DAOIcon';
import Tooltip from '../../../../../components/Tooltip';
import { TokenType } from '../../common/type';
import { useEthereumPrice } from '../../hooks/useEthereumPrice';
import { getModuleFactory } from '../../services/myriaCoreSdk';
import { convertEthToWei } from '../../utils/Converter';
import FirstDepositFailed from './FirstDepositFailed';
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
    ico: '/assets/images/eth.svg',
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
  FAILED,
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
  const [selectedToken, setSelectedToken] = useState<TOption>(options[0]);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [depositProgress, setDepositProgress] = useState<number>(
    PROGRESS.START,
  );
  const [errorAmount, setErrorAmount] = useState('');
  const [depositResponse, setDepositResponse] = useState<TxResult>();
  const { data: etheCost = 0 } = useEthereumPrice();
  const { balanceL1 } = useBalanceL1(selectedToken, connectedAccount);
  const [etherLinkContract, setEtherLinkContract] = useState<string>();

  useEffect(() => {
    const setLink = async () => {
      const networkId = await getNetworkId();
      if (!networkId || !depositResponse?.transactionHash) return '';
      setEtherLinkContract(
        getExplorerForAddress(
          depositResponse?.transactionHash,
          networkId,
          'transaction',
        ),
      );
    };
    setLink();
  }, [depositResponse?.transactionHash]);

  const selectCurrency = (param: any) => {
    setSelectedToken(param);
  };

  const setAmountHandle = (param: number) => {
    setAmount(param);
  };
  const isValidForm = useMemo(() => {
    if (amount == undefined) {
      setErrorAmount('');
      return true;
    }
    if (!selectedToken) {
      setErrorAmount('Select Asset required.');
      return false;
    }
    if (amount === 0) {
      setErrorAmount("Amount can't be 0.");
      return false;
    }
    if (amount * etheCost < 10) {
      setErrorAmount(
        `Deposit amount cannot be less than ${(10 / etheCost).toFixed(6)} ETH.`,
      );
      return false;
    }
    if (parseFloat(balanceL1) === amount) {
      setErrorAmount(`Please, consider transaction fee costs.`);
      return false;
    }
    if (parseFloat(balanceL1) < amount) {
      setErrorAmount(`Deposit amount cannot be higher than available ETH.`);
      return false;
    }
    setErrorAmount('');
    return true;
  }, [amount, balanceL1, etheCost, selectedToken]);
  const deposit = async () => {
    let resultDeposit: TxResult | any;
    if (amount == undefined) return;
    try {
      setDepositProgress(PROGRESS.PROCESSING);
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const depositModule = moduleFactory.getDepositModule();
      if (selectedToken.name === 'Ethereum') {
        resultDeposit = await depositModule.depositEth(
          {
            starkKey: '0x' + pKey,
            tokenType: TokenType.ETH,
            amount: String(amount),
          },
          {
            confirmationType: ConfirmationType.Sender,
            from: connectedAccount,
            value: String(convertEthToWei(amount.toString())),
          },
        );
      } else {
        resultDeposit = await depositModule.depositERC20(
          {
            starkKey: '0x' + pKey,
            contractAddress: selectedToken.tokenAddress,
            amount: String(convertEthToWei(amount.toString())),
          },
          {
            from: connectedAccount,
            confirmationType: ConfirmationType.Confirmed,
          },
        );
      }
      if (resultDeposit) {
        setDepositResponse(resultDeposit);
      }
      setDepositProgress(PROGRESS.COMPLETED);
    } catch (err) {
      console.log(err);
      setDepositProgress(PROGRESS.FAILED);
    }
  };

  return (
    <div className={cn(modalShow ? 'block' : 'hidden')}>
      <div className="bg-brand-deep-blue absolute -bottom-[30px] left-1/2 z-30 h-[20px] w-[20px] rotate-45 border-t border-l border-[#202230]" />

      <div className="bg-brand-deep-blue absolute top-16 right-16 h-[565px] max-h-[80vh] w-[406px] overflow-auto rounded-[20px] border border-[#202230] py-6">
        <div className="h-full">
          <div className="flex items-center justify-between px-6">
            <div className="text-[20px] font-bold text-[#E7EBEE]">
              Make your first deposit
            </div>
            <ThreeDotsVerticalIcon className="text-[#A1AFBA]" size={32} />
          </div>
          <div className="h-[calc(100%-32px)] px-6 pt-5">
            {depositProgress === PROGRESS.START && (
              <div className="flex h-full flex-col">
                <div className="mt-[15px]">
                  <div className="mb-2 text-sm text-white">Asset</div>
                  <CurrencySelector
                    options={options}
                    selectHandle={selectCurrency}
                  />
                </div>
                <div className="mt-6 grow">
                  <div className="mb-2  flex justify-between">
                    <div className=" text-sm text-white">Amount</div>
                    <div className="flex items-center text-sm text-[#777777]">
                      <span className="text-[#9DA3A7]">Available</span>
                      <DAOIcon className="ml-2 mr-1" size={14} />
                      <span className=" text-base/9">{balanceL1}</span>
                      <Tooltip>
                        <Tooltip.Trigger className="focus:outline-none">
                          <InfoCircleIcon className="ml-2 text-[#A1AFBA]" />
                        </Tooltip.Trigger>
                        <Tooltip.Content className="bg-base/5 ml-[-100px] max-w-[256px]">
                          <Tooltip.Arrow
                            className="fill-base/5 mr-[200px]"
                            width={16}
                            height={8}
                          />
                          <p className="text-base/9">
                            <Trans>
                              This is the amount you have available to deposit
                              from your L1 wallet.
                            </Trans>
                          </p>
                        </Tooltip.Content>
                      </Tooltip>
                    </div>
                  </div>
                  <MaxInput
                    max={parseFloat(balanceL1)}
                    onChangeHandle={setAmountHandle}
                    isValidForm={isValidForm}
                  />
                  {errorAmount && (
                    <div className={'text-error/6 mt-2 text-sm'}>
                      {errorAmount}
                    </div>
                  )}
                </div>
                <div className="flex justify-between justify-self-end">
                  <button
                    onClick={closeModal}
                    className="border-base/9 flex w-full max-w-[126px] items-center justify-center rounded-lg border py-2 px-9 text-base font-bold text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    className={cn(
                      'flex w-full max-w-[126px] items-center justify-center rounded-lg text-base font-bold',
                      isValidForm && amount != undefined
                        ? 'bg-primary/6 text-base/1'
                        : 'bg-gray/4 text-gray/6',
                    )}
                    onClick={
                      isValidForm && amount != undefined ? deposit : () => {}
                    }
                  >
                    NEXT
                  </button>
                </div>
              </div>
            )}

            {depositProgress === PROGRESS.PROCESSING && (
              <div className="flex h-full flex-col">
                <div className="grow">
                  <div className="mx-auto mt-5 flex h-16 w-16 justify-center">
                    <ProgressIcon
                      size={64}
                      className="text-light-green w-full"
                    />
                  </div>
                  <div className="mt-6 text-center text-2xl text-white">
                    Deposit in progress
                  </div>
                  <div className="text-base/9 bg-base/2/50 mt-4 rounded-lg py-2 px-4 text-sm">
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className="flex items-center text-white">
                        <DAOIcon size={16} className="mb-[2px]" />
                        <span className="ml-1">{amount}</span>
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <span>Estimated completion</span>
                      <span className="text-white">10 minutes</span>
                    </div>
                  </div>
                  <div className="mt-4 flex rounded-lg border border-[rgba(154,201,227,0.2)] bg-[rgba(154,201,227,0.1)] py-4 px-[14px]">
                    <div className="mr-[9px] flex-none">
                      <InfoCircleIcon className="text-blue/6" />
                    </div>
                    <div className="text-blue/6 text-[12px]">
                      Your deposit has been confirmed and is now in progress.
                      You will receive a notification once the deposit is
                      complete.
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-end">
                  <button
                    disabled
                    className="text-gray/6 bg-gray/4 flex h-10 items-center rounded-lg px-3 text-sm font-bold uppercase"
                  >
                    <span>Processing </span>
                    <ProgressIcon className="text-gray/6 ml-2" size={16} />
                  </button>
                </div>
              </div>
            )}

            {depositProgress === PROGRESS.COMPLETED && (
              <div className="flex h-full flex-col">
                <div className="grow">
                  <div className="mt-6 flex justify-center">
                    <TickCircleIcon className="text-[#9ECEAB]" />
                  </div>

                  <div className="mt-6 text-center text-2xl text-white">
                    Deposit is in progress
                  </div>
                  <div className="text-base/9 bg-base/2/50 mt-4 rounded-lg py-2 px-4 text-sm">
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className="flex items-center text-white">
                        <DAOIcon size={16} className="mb-[2px]" />
                        <span className="ml-1">{amount}</span>
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <span>Transaction ID</span>
                      <a
                        className="text-primary/6 text-base"
                        target="_blank"
                        href={etherLinkContract}
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex w-full justify-end">
                  <button
                    className="bg-primary/6 flex h-10 w-full items-center justify-center rounded-lg text-base font-bold text-black"
                    onClick={() => {
                      closeModal();
                      completeDepositModal();
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

            {depositProgress === PROGRESS.FAILED && (
              <FirstDepositFailed
                amount={amount || 0}
                depositRetryHandler={() => setDepositProgress(PROGRESS.START)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
