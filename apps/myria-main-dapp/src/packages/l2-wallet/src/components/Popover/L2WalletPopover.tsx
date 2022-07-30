// Import packages
import { Trans } from '@lingui/macro';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import cn from 'classnames';
import moment from 'moment';
import { IMyriaClient, Modules, MyriaClient, Types } from 'myria-core-sdk';
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
import { setWithdrawClaimModal } from '../../app/slices/uiSlice';
import WithdrawFailedScreen from './L2Wallet/WithdrawFailedScreen';

//compoment POC
import DropdownMenu from '../../../../../components/DropdownMenu';
import LogoutIcon from '../../../../../components/icons/LogoutIcon';
import { useWalletContext } from '../../../../../context/wallet';
import { useEtheriumPrice } from '../../../../../hooks/useEtheriumPrice';
import ChevronIcon from '../Icons/ChevronIcon';
import { useGA4 } from '../../../../../lib/ga';
import { useAuthenticationContext } from '../../../../../context/authentication';
import { WalletMarketPlaceAction } from '../../../../../lib/ga/use-ga/event';
import { getModuleFactory } from '../../services/myriaCoreSdk';
import {
  convertAmountToQuantizedAmount,
  convertEthToWei,
  convertQuantizedAmountToEth,
} from '../../utils/Converter';
import { TxResult } from 'myria-core-sdk/dist/types/src/types';
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
  const [amount, setAmount] = useState<number>(0);
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
  const { address, onConnect, disconnect } = useWalletContext();

  const [activeToken, setActiveToken] = useState<string>('tokens');
  const [depositResponse, setDepositResponse] = useState<TxResult>();

  const initForm = () => {
    setErrorAmount('');
    setErrorMessageAsset('');
    setSelectedToken(options[0]);
    dispatch(setSelectedTokenFunc(null));
    setAmount(0);
  };

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
              id: index,
              type: item.transactionType,
              amount: item.partyAOrder
                ? convertQuantizedAmountToEth(item.partyAOrder.amountSell)
                : item.name === 'Ethereum'
                ? convertQuantizedAmountToEth(item.quantizedAmount)
                : item.quantizedAmount,
              time: moment(item.createdAt).fromNow(),
              updatedAt: moment(item.updatedAt).fromNow(),
              status:
                item.transactionStatus === 'Success'
                  ? 'success'
                  : 'in_progress',
              ico: '/assets/images/eth.svg',
              tokenType: item.tokenType,
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
    if (!amount) {
      setErrorAmount('');
      return false;
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
    setErrorAmount('');
    return true;
  }, [amount, selectedToken, etheCost, screen]);

  const deposit = async () => {
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
            amount: String(convertAmountToQuantizedAmount(amount.toString())),
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
    try {
      setWithdrawInProgress(true);
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
        await withdrawModule.withdrawalOffchain(
          {
            starkKey: '0x' + pKey,
            tokenType: TokenType.ETH,
            amount: String(convertAmountToQuantizedAmount(amount.toString())),
            vaultId: undefined,
            assetId: assetType,
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
        await withdrawModule.withdrawalOffchain(
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
      setScreen(SCREENS.WITHDRAW_COMPLETE);
      setWithdrawInProgress(false);
      trackWalletAction({
        eventName: 'Wallet Withdraw Completed',
        trx_url: '',
      });
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

  const getBalanceOfMyriaL1Wallet = async () => {
    let assetType: string = '';

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
    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;
    const withdrawModule = moduleFactory.getWithdrawModule();

    const assetList = await withdrawModule.getWithdrawalBalance(
      '0x' + pKey,
      assetType,
    );
    return assetList;
  };

  const handleClaimFunction = async () => {
    const assetList = await getBalanceOfMyriaL1Wallet();
    dispatch(
      setWithdrawClaimModal({
        show: true,
        claimAmount: assetList,
        isUpdated: false,
      }),
    );
    onClosePopover();
    setScreen(SCREENS.MAIN_SCREEN);
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
            className="flex cursor-pointer items-center text-white"
            onClick={() => {
              setScreen(SCREENS.MAIN_SCREEN);
              setActiveToken('history');
            }}
          >
            <ChevronIcon direction="left" />
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
            activeToken={activeToken}
            setActiveToken={setActiveToken}
          />
        )}

        {screen === SCREENS.DEPOSIT_SCREEN && (
          <DepositScreen
            goBack={() => {
              setScreen(SCREENS.MAIN_SCREEN);
            }}
            options={options}
            selectCurrency={selectCurrency}
            errorMessageAsset={errorMessageAsset}
            balance={balanceL1}
            setAmountHandle={setAmountHandle}
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
              setScreen(SCREENS.MAIN_SCREEN);
            }}
            amount={amount}
            selectedToken={selectedToken}
            depositInProgress={depositInProgress}
            successHandler={() => {
              setScreen(SCREENS.MAIN_SCREEN);
            }}
          />
        )}

        {screen === SCREENS.DEPOSIT_COMPLETE_SCREEN && (
          <DepositCompleteScreen
            amount={amount}
            items={depositResponse}
            selectedToken={selectedToken}
            successHandler={() => {
              initForm();
              setScreen(SCREENS.MAIN_SCREEN);
            }}
            goBack={() => {
              setScreen(SCREENS.MAIN_SCREEN);
            }}
          />
        )}

        {screen === SCREENS.WITHDRAW_SCREEN && (
          <WithdrawScreen
            goBack={() => {
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
            setWithdrawScreenMounted={setWithdrawScreenMounted}
            isValidForm={isValidForm}
          />
        )}

        {screen === SCREENS.WITHDRAW_REQUEST && (
          <WithdrawRequestScreen
            goBack={() => setScreen(SCREENS.WITHDRAW_COMPLETE)}
            amount={amount}
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
            okHandler={() => {
              setScreen(SCREENS.WITHDRAW_COMPLETE);
            }}
            amount={amount}
          />
        )}

        {screen === SCREENS.WITHDRAW_COMPLETE && (
          <WithdrawCompleteScreen
            amount={amount}
            selectedToken={selectedToken}
            successHandler={() => {
              handleClaimFunction();
            }}
          />
        )}

        {screen === SCREENS.DEPOSIT_FAILED && (
          <DepositFailedScreen
            amount={amount}
            depositRetryHandler={depositRetryHandler}
            goBack={() => {
              setScreen(SCREENS.MAIN_SCREEN);
            }}
          />
        )}

        {screen === SCREENS.WITHDRAW_FAILED && (
          <WithdrawFailedScreen
            amount={amount}
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
