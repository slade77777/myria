// Import packages
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { IMyriaClient, Modules, MyriaClient, Types } from 'myria-core-sdk';

// Import components
// import { disconnect } from 'process';
import DepositScreen from './L2Wallet/DepositScreen';
// import { ConnectIcon } from '../Icons';
import DepositInProgressScreen from './L2Wallet/DepositInProgressScreen';
import DepositCompleteScreen from './L2Wallet/DepositCompleteScreen';
import WithdrawScreen from './L2Wallet/WithdrawScreen';
import WithdrawRequestScreen from './L2Wallet/WithdrawRequestScreen';
import WithdrawInProgressScreen from './L2Wallet/WithdrawInProgressScreen';
import WithdrawCompleteScreen from './L2Wallet/WithdrawCompleteScreen';
import MainScreen from './L2Wallet/MainScreen';
import ThreeDotsVerticalIcon from '../Icons/ThreeDotsVerticalIcon';

// Import Redux
import { RootState } from '../../app/store';
// import { disconnectAccount } from '../../app/slices/accountSlice';

// Import Assets
// import Myria from '../../assets/images/myria.png';
// import Metarush from '../../assets/images/metarush.png';
// import Eth from '../../assets/images/eth.png';
// import USDC from '../../assets/images/usdc.png';
import Ethereum from '../../assets/images/ethereum.png';
import TestToken from '../../assets/images/TT.png';

// Import Types
import { TOption } from '../Dropdown/CurrencySelector';
import { TokenType } from '../../common/type';

// Import Constant Variables
// import { minABI } from '../../common/abis/minABI';

// Import Hooks
import useBalanceList from '../../common/hooks/useBalanceList';
import useBalanceL1 from '../../common/hooks/useBalanceL1';

// Import Redux
import { setWithdrawClaimModal } from '../../app/slices/uiSlice';
import { setSelectedTokenFunc } from '../../app/slices/tokenSlice';

type Props = {
  abbreviationAddress: string;
  onClosePopover?: () => void;
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

// const coinPrices = [
//   {
//     id: 1,
//     name: '$MYRIA',
//     price: '459,901.614',
//     balance: '$89,619.41',
//     icon: Myria,
//   },
//   {
//     id: 2,
//     name: 'Metarush',
//     price: '147.201',
//     balance: '$22.10',
//     icon: Metarush,
//   },
//   { id: 3, name: 'ETH', price: '5.619', balance: '$25,412.88', icon: Eth },
//   {
//     id: 4,
//     name: 'USDC',
//     price: '189,098.91',
//     balance: '189,098.91',
//     icon: USDC,
//   },
// ];

enum SCREENS {
  MAIN_SCREEN,
  DEPOSIT_SCREEN,
  DEPOSIT_IN_PROGRESS_SCREEN,
  DEPOSIT_COMPLETE_SCREEN,
  WITHDRAW_SCREEN,
  WITHDRAW_REQUEST,
  WITHDRAW_IN_PROGRESS,
  WITHDRAW_COMPLETE,
}

declare let window: any;

export default function L2WalletPopover({
  abbreviationAddress,
  onClosePopover = () => {},
}: Props) {
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
  // const [firstJourneyDeposit, setFirstJourneyDeposit] = useState(true);
  const [balance, setBalance] = useState('0');
  const [withdrawScreenMounted, setWithdrawScreenMounted] =
    useState<boolean>(false);
  const [withdrawInProgress, setWithdrawInProgress] = useState<boolean>(false);
  const [depositScreenMounted, setDepositScreenMounted] =
    useState<boolean>(false);
  const [depositInProgress, setDepositInProgress] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { balanceList } = useBalanceList(pKey, screen);
  const { balanceL1 } = useBalanceL1(selectedToken, connectedAccount);
  const { balanceL1: balanceEth } = useBalanceL1(options[0], connectedAccount);

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
    const setBalanceFunc = async () => {
      if (screen !== SCREENS.WITHDRAW_SCREEN) {
        setBalance(balanceL1);
      } else {
        let assetType: string;
        if (selectedToken.name === 'Ethereum') {
          assetType = asset.getAssetType({
            type: 'ETH',
            data: {
              quantum: '1',
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
        if (exactBalance) {
          setBalance(
            selectedToken.name === 'Ethereum'
              ? Web3.utils.fromWei(exactBalance[0].quantizedAmount.toString())
              : exactBalance[0].quantizedAmount,
          );
        }
      }
    };
    
    if (selectedToken) {
      setBalanceFunc();
    }
  }, [selectedToken, withdrawScreenMounted, depositScreenMounted, balanceL1, balanceList, screen]);

  const isValidForm = useMemo(() => {
    let invalid = false;
    if (!selectedToken) {
      setErrorMessageAsset('Select Asset required.');
      invalid = true;
    } else {
      setErrorMessageAsset('');
    }
    if (amount === 0) {
      setErrorAmount("Amount can't be 0.");
      invalid = true;
    }
    if (amount > parseFloat(balance)) {
      setErrorAmount('Insufficient Balance.');
      invalid = true;
    }
    if (invalid) return false;
    setErrorAmount('');
    return true;
  }, [selectedToken, amount, balance]);

  const deposit = async () => {
    try {
      setDepositInProgress(true);
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
      setDepositInProgress(false);
      setScreen(SCREENS.DEPOSIT_COMPLETE_SCREEN);
    } catch (err) {
      setDepositInProgress(false);
      setScreen(SCREENS.MAIN_SCREEN);
      console.error(err);
    }
  };

  const withdraw = async () => {
    try {
      setWithdrawInProgress(true);
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
        await withdrawModule.withdrawalOffchain(
          {
            starkKey: '0x' + pKey,
            tokenType: TokenType.ETH,
            amount: Web3.utils.toWei(amount.toString()).toString(),
            vaultId: undefined,
            assetId: assetType,
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
            nonce: '1',
            confirmationType: Types.ConfirmationType.Confirmed,
          },
        );
      }
      setScreen(SCREENS.WITHDRAW_COMPLETE);
      setWithdrawInProgress(false);
    } catch (err) {
      console.error(err);
      setWithdrawInProgress(false);
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
          quantum: '1',
          // tokenAddress: '0xD5f1cC0264d0E22BE4488109dbf5d097eb37a576',
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
    const initializeClient: IMyriaClient = {
      provider: window.web3.currentProvider,
      networkId: 5,
      web3: window.web3,
    };

    const moduleFactory = new Modules.ModuleFactory(initializeClient);
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

  return (
    <div className="py-[24px] min-h-[401px]">
      {/* Header Part */}
      <div className="flex items-center justify-between text-[14px] text-[#666666] pb-[16px] px-[24px]">
        <div className="flex items-center">
          {/* <ConnectIcon />
          <span className="ml-[10px] text-[rgba(255,255,255,0.6)]">
            {abbreviationAddress}
          </span> */}
        </div>
        {/* <div
          className="text-[#F5B941]"
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </div> */}
        <ThreeDotsVerticalIcon className = 'text-[#A1AFBA]' size={32}/>
      </div>

      {/* Body Part */}
      <div className="px-[24px] min-h-[460px]">
        {screen === SCREENS.MAIN_SCREEN && (
          <MainScreen
            gotoDepositScreen={() => {
              setScreen(SCREENS.DEPOSIT_SCREEN);
            }}
            options={options}
            gotoWithdrawScreen={() => {
              setScreen(SCREENS.WITHDRAW_SCREEN);
            }}
            balanceList={balanceList}
            balanceEth={balanceEth}
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
            balance={balance}
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
            selectedToken={selectedToken}
            successHandler={() => {
              initForm();
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
            okHandler={() => {
              setScreen(SCREENS.WITHDRAW_COMPLETE);
            }}
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
      </div>
    </div>
  );
}

L2WalletPopover.defaultProps = {
  onClosePopover: () => {},
};
