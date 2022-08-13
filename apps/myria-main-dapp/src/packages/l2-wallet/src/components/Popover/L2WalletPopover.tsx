// Import packages
import { Trans } from '@lingui/macro';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import cn from 'classnames';
import moment from 'moment';
import { Types } from 'myria-core-sdk';
import Link from 'next/link';

// Import components
import { ThreeDotsVerticalIcon } from '../Icons';
import DepositCompleteScreen from './L2Wallet/DepositCompleteScreen';
import DepositFailedScreen from './L2Wallet/DepositFailedScreen';
import DepositInProgressScreen from './L2Wallet/DepositInProgressScreen';
import DepositScreen from './L2Wallet/DepositScreen';
import MainScreen from './L2Wallet/MainScreen';
import WithdrawCompleteScreen from './L2Wallet/WithdrawCompleteScreen';
import WithdrawInProgressScreen from './L2Wallet/WithdrawInProgressScreen';
import WithdrawRequestScreen from './L2Wallet/WithdrawRequestScreen';
import WithdrawScreen from './L2Wallet/WithdrawScreen';
// import InventoryIcon from './src/components/icons/InventoryIcon';
import InventoryIcon from '../../../../../components/icons/InventoryIcon';
import TransactionHistoryDetailScreen from './L2Wallet/TransactionHistoryDetailScreen';

// Import Redux
import { RootState } from '../../app/store';

// Import Types
import { TokenType } from '../../common/type';
import { TOption } from '../Dropdown/CurrencySelector';

// Import Constant Variables
// import { minABI } from '../../common/abis/minABI';

// Import Hooks
import useBalanceL1 from '../../common/hooks/useBalanceL1';
import useBalanceList from '../../common/hooks/useBalanceList';

// Import Redux
import {
  setSelectedTokenFunc,
  setTransactions,
} from '../../app/slices/tokenSlice';
import WithdrawFailedScreen from './L2Wallet/WithdrawFailedScreen';

//compoment POC
import { TxResult } from 'myria-core-sdk/dist/types/src/types';
import { WithdrawOffchainParamsV2 } from 'myria-core-sdk/dist/types/src/types/WithdrawType';
// @ts-ignore
import { useDepositContext } from 'src/context/deposit-context';
import DropdownMenu from '../../../../../components/DropdownMenu';
import LogoutIcon from '../../../../../components/icons/LogoutIcon';
import { useAuthenticationContext } from '../../../../../context/authentication';
import { useWalletContext } from '../../../../../context/wallet';
import { useEtheriumPrice } from '../../../../../hooks/useEtheriumPrice';
import { useGA4 } from '../../../../../lib/ga';
import { WalletMarketPlaceAction } from '../../../../../lib/ga/use-ga/event';
import { getModuleFactory } from '../../services/myriaCoreSdk';
import {
  convertAmountToQuantizedAmount,
  convertEthToWei,
  convertQuantizedAmountToEth,
} from '../../utils/Converter';
import ChevronIcon from '../Icons/ChevronIcon';
import { useL2WalletContext } from '../../../../../context/l2-wallet';
import WithdrawPendingScreen from './L2Wallet/WithdrawPendingScreen';
import { WalletTabs } from 'src/types';
type Props = {
  abbreviationAddress: string;
  onClosePopover?: () => void;
};

const options: Array<TOption> = [
  {
    id: 1,
    name: 'Ethereum',
    short: 'ETH',
    ico: '/assets/images/eth.svg',
    tokenAddress: '',
    assetType:
      '0xb333e3142fe16b78628f19bb15afddaef437e72d6d7f5c6c20c6801a27fba6',
  },
];

enum SCREENS {
  MAIN_SCREEN,
  DEPOSIT_SCREEN,
  DEPOSIT_IN_PROGRESS_SCREEN,
  DEPOSIT_COMPLETE_SCREEN,
  WITHDRAW_SCREEN,
  WITHDRAW_REQUEST,
  WITHDRAW_IN_PROGRESS,
  WITHDRAW_COMPLETE,
  WITHDRAW_PENDING,
  DEPOSIT_FAILED,
  WITHDRAW_FAILED,
  TRANSACTION_HISTORY_DETAILED,
}

const QUANTUM_CONSTANT = 10000000000;

declare let window: any;

export default function L2WalletPopover({ onClosePopover = () => {} }: Props) {
  const [screen, setScreen] = useState<number>(SCREENS.MAIN_SCREEN);
  const pKey = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );
  const connectedAccount = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );
  const [selectedToken, setSelectedToken] = useState<TOption>(options[0]);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [errorMessageAsset, setErrorMessageAsset] = useState('');
  const [errorAmount, setErrorAmount] = useState('');
  const [balance, setBalance] = useState('0');
  const [withdrawScreenMounted, setWithdrawScreenMounted] =
    useState<boolean>(false);
  const [withdrawInProgress, setWithdrawInProgress] = useState<boolean>(false);
  const [depositScreenMounted, setDepositScreenMounted] =
    useState<boolean>(false);
  const [depositInProgress, setDepositInProgress] = useState<boolean>(false);
  const [transactionList, setTransactionList] = useState<Array<any>>([]);

  const dispatch = useDispatch();

  const { balanceList } = useBalanceList(pKey, screen);
  const { balanceL1 } = useBalanceL1(selectedToken, connectedAccount);
  const { data: etheCost = 0 } = useEtheriumPrice();

  const [balanceL2Eth, setBalanceL2Eth] = useState<any>('');
  const [transactionDetail, setTransactionDetail] = useState<any>(null);
  const { address, disconnect } = useWalletContext();
  const { disconnectL2Wallet, isWithdrawComplete, showWithdrawCompleteScreen, activeWalletTabs, handleActiveWalletTabs } =
    useL2WalletContext();

  // const [activeWalletTabs, setActiveToken] = useState<string>('tokens');
  const [depositResponse, setDepositResponse] = useState<TxResult>();

  const initForm = () => {
    setErrorAmount('');
    setErrorMessageAsset('');
    setSelectedToken(options[0]);
    dispatch(setSelectedTokenFunc(null));
    setAmount(0);
  };

  useEffect(() => {
    if (isWithdrawComplete.isShow) {
      setScreen(SCREENS.WITHDRAW_COMPLETE);
    }
    return () => showWithdrawCompleteScreen({ isShow: false });
  }, [isWithdrawComplete.isShow]);

  useEffect(() => {
    if (withdrawScreenMounted || depositScreenMounted) {
      setSelectedToken(options[0]);
      dispatch(setSelectedTokenFunc(options[0]));
    }
  }, [withdrawScreenMounted, depositScreenMounted, dispatch]);

  useEffect(() => {
    const assetType = asset.getAssetType({
      type: 'ETH',
      data: {
        quantum: QUANTUM_CONSTANT.toString(),
      },
    });
    let exactBalance: any;
    if (Array.isArray(balanceList)) {
      exactBalance = balanceList?.filter(
        (item: any) => item.assetId === assetType,
      );
    }

    if (exactBalance && exactBalance.length > 0) {
      setBalanceL2Eth(
        convertQuantizedAmountToEth(exactBalance[0].quantizedAmount).toString(),
      );
    }
  }, [balanceList]);

  useEffect(() => {
    const setBalanceFunc = async () => {
      if (screen !== SCREENS.WITHDRAW_SCREEN) {
        setBalance(balanceL1);
      } else {
        let assetType: string;

        if (selectedToken.name === 'Ethereum') {
          assetType = asset.getAssetType({
            type: 'ETH',
            data: {
              quantum: QUANTUM_CONSTANT.toString(),
            },
          });
        } else {
          assetType = asset.getAssetType({
            type: 'ERC20',
            data: {
              quantum: '1',
              tokenAddress: selectedToken.tokenAddress,
            },
          });
        }
        let exactBalance: any;
        if (Array.isArray(balanceList)) {
          exactBalance = balanceList?.filter(
            (item: any) => item.assetId === assetType,
          );
        }

        if (exactBalance && exactBalance.length > 0) {
          setBalance(
            selectedToken.name === 'Ethereum'
              ? convertQuantizedAmountToEth(exactBalance[0].quantizedAmount)
              : exactBalance[0].quantizedAmount,
          );
        } else {
          setBalance('0');
        }
      }
    };

    if (selectedToken) {
      setBalanceFunc();
    }
  }, [
    selectedToken,
    withdrawScreenMounted,
    depositScreenMounted,
    balanceL1,
    setBalance,
    balanceList,
    screen,
  ]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;
      const transactionModule = moduleFactory.getTransactionModule();
      try {
        const { data } = await transactionModule.getTransactionList(
          '0x' + pKey,
        );
        const result = data
          .filter((item: any, index: number) => {
            if (item.assetType || item.settlementInfo) return true;
            else return false;
          })
          .map((transaction: any, index: number) => {
            const matched = options.filter(
              (option: TOption, index: number) =>
                option.assetType === transaction.assetType,
            );
            if (matched && matched.length > 0) {
              return {
                ...transaction,
                ...matched[0],
              };
            } else return transaction;
          });
        const processedData = result
          .sort((a: any, b: any) => b.createdAt - a.createdAt)
          .map((item: any, index: number) => {
            return {
              ...item,
              id: index,
              type: item.transactionType,
              amount: item.partyAOrder
                ? convertQuantizedAmountToEth(item.partyAOrder.amountSell)
                : item.name === 'Ethereum'
                ? convertQuantizedAmountToEth(item.quantizedAmount)
                : item.quantizedAmount,
              time: moment(item.createdAt).fromNow(),
              updatedAt: moment(item.updatedAt).fromNow(),
              status: item.transactionStatus,
              ico: '/assets/images/eth.svg',
            };
          });
        dispatch(setTransactions(processedData));
        setTransactionList(processedData);
      } catch (ex) {
        console.log('Transaction list error ', ex);
      }
    };

    if (pKey) {
      fetchTransactionHistory();
    }
  }, [pKey, dispatch, screen]);

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
        `${
          screen === SCREENS.DEPOSIT_SCREEN ? 'Deposit' : 'Withdraw'
        } amount cannot be less than ${(10 / etheCost).toFixed(6)} ETH.`,
      );
      return false;
    }
    if (screen === SCREENS.DEPOSIT_SCREEN && parseFloat(balanceL1) < amount) {
      setErrorAmount(`Deposit amount cannot be higher than available ETH.`);
      return false;
    }
    if (screen === SCREENS.WITHDRAW_SCREEN && parseFloat(balance) < amount) {
      setErrorAmount(`Withdraw amount cannot be higher than available ETH.`);
      return false;
    }
    setErrorAmount('');
    return true;
  }, [amount, selectedToken, etheCost, screen, balanceL1, balance]);

  const deposit = async () => {
    if (amount == undefined) return;
    let resultDepoit: TxResult;
    trackWalletAction({
      eventName: 'Wallet Deposit Selected',
      hide_balance: true,
    });
    try {
      setDepositInProgress(true);
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const depositModule = moduleFactory.getDepositModule();

      if (selectedToken.name === 'Ethereum') {
        resultDepoit = await depositModule.depositEth(
          {
            starkKey: '0x' + pKey,
            tokenType: TokenType.ETH,
            amount: String(amount),
          },
          {
            confirmationType: Types.ConfirmationType.Confirmed,
            from: connectedAccount,
            value: String(convertEthToWei(amount.toString())),
          },
        );
      } else {
        resultDepoit = await depositModule.depositERC20Token(
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
      if (resultDepoit) {
        setDepositResponse(resultDepoit);
      }
      setDepositInProgress(false);
      setScreen(SCREENS.DEPOSIT_COMPLETE_SCREEN);
      trackWalletAction({ eventName: 'Wallet Deposit Completed', trx_url: '' });
    } catch (err) {
      trackWalletAction({ eventName: 'Wallet Deposit Failed', error_code: '' });
      setDepositInProgress(false);
      setScreen(SCREENS.DEPOSIT_FAILED);
    }
  };

  const withdraw = async () => {
    if (amount == undefined) return;
    try {
      let responseWithdraw: any = null;
      setWithdrawInProgress(true);
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory || !address) return;

      const withdrawModule = moduleFactory.getWithdrawModule();

      if (selectedToken.name === 'Ethereum') {
        const assetType = asset.getAssetType({
          type: 'ETH',
          data: {
            quantum: QUANTUM_CONSTANT.toString(),
          },
        });
        const withdrawParamsV2: WithdrawOffchainParamsV2 = {
          senderPublicKey: `0x${pKey}`,
          senderEthAddress: address,
          receiverPublicKey: address,
          quantizedAmount: String(
            convertAmountToQuantizedAmount(amount.toString()),
          ),
          token: assetType,
        };
        responseWithdraw = await withdrawModule.withdrawalOffchainV2(
          withdrawParamsV2,
        );
      } else {
        const assetType = asset.getAssetType({
          type: 'ERC20',
          data: {
            quantum: '1',
            tokenAddress: selectedToken.tokenAddress,
          },
        });
        responseWithdraw = await withdrawModule.withdrawalOffchain(
          {
            starkKey: '0x' + pKey,
            tokenType: TokenType.ERC20,
            amount: amount.toString(),
            vaultId: undefined,
            assetId: assetType,
            tokenAddress: selectedToken.tokenAddress,
          },
          {
            from: connectedAccount,
            nonce: new Date().getTime(),
            confirmationType: Types.ConfirmationType.Confirmed,
          },
        );
      }
      if (responseWithdraw) {
        setScreen(SCREENS.WITHDRAW_PENDING);
        trackWalletAction({
          eventName: 'Wallet Withdraw Completed',
          trx_url: '',
        });
      }
      setWithdrawInProgress(false);
    } catch (err) {
      setWithdrawInProgress(false);
      setScreen(SCREENS.WITHDRAW_FAILED);
      trackWalletAction({
        eventName: 'Wallet Withdraw Failed',
        error_code: '',
      });
    }
  };

  const selectCurrency = (param: any) => {
    setSelectedToken(param);
    dispatch(setSelectedTokenFunc(param));
  };

  const setAmountHandle = (param: number) => {
    setAmount(param);
  };

  // const disconnect = async () => {
  //   localStorage.clear();
  //   dispatch(disconnectAccount());
  // };

  const depositRetryHandler = async () => {
    setScreen(SCREENS.MAIN_SCREEN);
  };

  const withdrawRetryHandler = async () => {
    setScreen(SCREENS.MAIN_SCREEN);
  };

  const { event } = useGA4();
  const { user, logout } = useAuthenticationContext();
  const { handleSetAmount, handleShowMessageDeposit } = useDepositContext();
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );
  const trackWalletAction = useCallback(
    ({
      eventName,
      trx_url,
      error_code,
      hide_balance,
    }: {
      eventName: WalletMarketPlaceAction;
      trx_url?: string;
      error_code?: string;
      hide_balance?: boolean;
    }) => {
      if (amount == undefined) return;
      event(eventName, {
        myria_id: user?.user_id,
        wallet_address: `_${address}`,
        L2_wallet_address: `_0x${starkKeyUser}`,
        amount_eth: +amount,
        amount_usd: amount * etheCost,
        ...(hide_balance
          ? {}
          : {
              balance_eth: +balance,
              balance_usd: +balance * etheCost,
            }),
        ...(trx_url ? { trx_url } : {}),
        ...(error_code ? { error_code } : {}),
      });
    },
    [amount, address, user?.user_id, etheCost],
  );

  return (
    <>
      {/* Header Part */}
      <div
        className={cn(
          'flex h-8 items-center text-[14px] text-[#666666]',
          screen === SCREENS.TRANSACTION_HISTORY_DETAILED
            ? 'justify-between'
            : 'justify-end',
        )}
      >
        {screen === SCREENS.TRANSACTION_HISTORY_DETAILED && (
          <div
            className="text-base/10 flex cursor-pointer items-center"
            onClick={() => {
              setScreen(SCREENS.MAIN_SCREEN);
              handleActiveWalletTabs(WalletTabs.HISTORY);
            }}
          >
            <ChevronIcon direction="left" size={30} />
            <span className="text-[20px] font-bold">History</span>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <div className="text-primary/6">
              <ThreeDotsVerticalIcon className="text-base/9" size={32} />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            sideOffset={8}
            align="end"
            className="text-base/2 rounded-md bg-current p-3"
          >
            <DropdownMenu.Arrow className="translate-x-3 fill-current" />
            <div className="text-white">
              <button
                className="body-14-medium flex items-center space-x-2.5 text-white"
                onClick={() => {
                  disconnect();
                  disconnectL2Wallet();
                  logout();
                }}
              >
                <i className="w-4">
                  <LogoutIcon />
                </i>
                <span>Disconnect</span>
              </button>
              <div className="mt-2 text-white">
                <Link href={'/marketplace/inventory'}>
                  <a
                    href={'/marketplace/inventory'}
                    className="body-14-medium flex cursor-pointer items-center space-x-2.5 text-white"
                  >
                    <i className="w-4">
                      <InventoryIcon />
                    </i>
                    <span>
                      <Trans>Inventory</Trans>
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>

      {/* Body Part */}
      <div className="flex h-[calc(100%-32px)] flex-col">
        {screen === SCREENS.MAIN_SCREEN && (
          <MainScreen
            transactionList={transactionList}
            gotoDepositScreen={() => {
              setScreen(SCREENS.DEPOSIT_SCREEN);
            }}
            options={options}
            gotoWithdrawScreen={() => {
              setScreen(SCREENS.WITHDRAW_SCREEN);
            }}
            balanceList={balanceList}
            balanceEth={balanceL2Eth}
            gotoDetailTransaction={(detail: any) => {
              setTransactionDetail(detail);
              setScreen(SCREENS.TRANSACTION_HISTORY_DETAILED);
            }}
            activeToken={activeWalletTabs}
            setActiveToken={handleActiveWalletTabs}
          />
        )}

        {screen === SCREENS.DEPOSIT_SCREEN && (
          <DepositScreen
            goBack={() => {
              setAmount(undefined);
              setScreen(SCREENS.MAIN_SCREEN);
            }}
            options={options}
            selectCurrency={selectCurrency}
            errorMessageAsset={errorMessageAsset}
            balance={balanceL1}
            setAmountHandle={setAmountHandle}
            amount={amount}
            selectedToken={selectedToken}
            isValidForm={isValidForm}
            errorAmount={errorAmount}
            gotoProgressScreen={() => {
              deposit();
              setScreen(SCREENS.DEPOSIT_IN_PROGRESS_SCREEN);
            }}
            setDepositScreenMounted={setDepositScreenMounted}
          />
        )}

        {screen === SCREENS.DEPOSIT_IN_PROGRESS_SCREEN && (
          <DepositInProgressScreen
            goBack={() => {
              setAmount(undefined);
              setScreen(SCREENS.MAIN_SCREEN);
            }}
            amount={amount || 0}
            selectedToken={selectedToken}
            depositInProgress={depositInProgress}
            successHandler={() => {
              setScreen(SCREENS.MAIN_SCREEN);
            }}
          />
        )}

        {screen === SCREENS.DEPOSIT_COMPLETE_SCREEN && (
          <DepositCompleteScreen
            amount={amount || 0}
            items={depositResponse}
            selectedToken={selectedToken}
            successHandler={() => {
              initForm();
              handleSetAmount(amount || 0);
              handleShowMessageDeposit(true);
            }}
            goBack={() => {
              setScreen(SCREENS.MAIN_SCREEN);
            }}
          />
        )}

        {screen === SCREENS.WITHDRAW_SCREEN && (
          <WithdrawScreen
            goBack={() => {
              setAmount(undefined);
              setScreen(SCREENS.MAIN_SCREEN);
            }}
            balance={balance}
            selectCurrency={selectCurrency}
            errorMessageAsset={errorMessageAsset}
            setAmountHandle={setAmountHandle}
            withdrawHandle={() => {
              // if (isValidForm()) {
              trackWalletAction({
                eventName: 'Wallet Withdraw Selected',
                hide_balance: true,
              });
              setScreen(SCREENS.WITHDRAW_REQUEST);
              // }
            }}
            errorAmount={errorAmount}
            options={options}
            amount={amount}
            setWithdrawScreenMounted={setWithdrawScreenMounted}
            isValidForm={isValidForm}
          />
        )}

        {screen === SCREENS.WITHDRAW_REQUEST && (
          <WithdrawRequestScreen
            goBack={() => setScreen(SCREENS.WITHDRAW_SCREEN)}
            amount={amount || 0}
            cancelHandler={() => {
              setScreen(SCREENS.MAIN_SCREEN);
            }}
            withdrawInProgress={withdrawInProgress}
            withdrawHandler={withdraw}
          />
        )}

        {screen === SCREENS.WITHDRAW_IN_PROGRESS && (
          <WithdrawInProgressScreen
            goBack={() => setScreen(SCREENS.WITHDRAW_REQUEST)}
            amount={amount || 0}
          />
        )}

        {screen === SCREENS.WITHDRAW_COMPLETE && (
          <WithdrawCompleteScreen
            amount={amount || 0}
            selectedToken={selectedToken}
            successHandler={() => setScreen(SCREENS.MAIN_SCREEN)}
          />
        )}

        {screen === SCREENS.WITHDRAW_PENDING && (
          <WithdrawPendingScreen amount={amount || 0} />
        )}

        {screen === SCREENS.DEPOSIT_FAILED && (
          <DepositFailedScreen
            amount={amount || 0}
            depositRetryHandler={depositRetryHandler}
            goBack={() => {
              setScreen(SCREENS.MAIN_SCREEN);
            }}
          />
        )}

        {screen === SCREENS.WITHDRAW_FAILED && (
          <WithdrawFailedScreen
            amount={amount || 0}
            withdrawRetryHandler={withdrawRetryHandler}
          />
        )}

        {screen === SCREENS.TRANSACTION_HISTORY_DETAILED && (
          <TransactionHistoryDetailScreen
            goBack={() => setScreen(SCREENS.MAIN_SCREEN)}
            transactionDetail={transactionDetail}
          />
        )}
      </div>
    </>
  );
}

L2WalletPopover.defaultProps = {
  onClosePopover: () => {},
};
