import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';

// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DAOIcon from 'src/components/icons/DAOIcon';
import TailSpin from 'src/components/icons/TailSpin';
import { localStorageKeys } from 'src/configs';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { useWalletContext } from 'src/context/wallet';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { useEtheriumPrice } from 'src/hooks/useEtheriumPrice';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { WalletTabs } from 'src/types';
import { StatusWithdrawNFT } from 'src/types/marketplace';
import { formatNumber2digits } from 'src/utils';
import {
  convertQuantizedAmountToEth,
  convertWeiToEth,
} from '../../../utils/Converter';
import { Arrow3Icon, CircleCloseIcon, CompletedIcon } from '../../Icons';
import ArrowDownLeft from '../../Icons/ArrowDownLeft';
import ArrowUpRight from '../../Icons/ArrowUpRight';
import ChevronIcon from '../../Icons/ChevronIcon';
import ETHIcon from '../../Icons/ETHIcon';
import ProgressHistoryIcon from '../../Icons/ProgressHistoryIcon';
import WithdrawNFTIcon from '../../Icons/WithdrawNFTIcon';
import TabContent from '../../Tabs/TabContent';
import TabNavItem from '../../Tabs/TabNavItem';
import useBalanceList from '../../../common/hooks/useBalanceList';
import HistoryTab from './HistoryTab';
import ArrowRightLeftIcon from '../../Icons/ArrowRightLeftIcon';

type Props = {
  gotoDepositScreen: any;
  gotoWithdrawScreen: any;
  options: any;
  balanceList: any;
  balanceEth: any;
  gotoDetailTransaction: any;
  gotoWithdrawNowScreen: any;
  activeToken: any;
  setActiveToken: any;
};

const tabs = [
  { id: WalletTabs.TOKENS, title: 'Tokens' },
  { id: WalletTabs.HISTORY, title: 'History' },
];

const historyData: any[] = [];

const QUANTUM_CONSTANT = 10000000000;

export enum STATUS_HISTORY {
  SUCCESS = 'Success',
  FAILED = 'Failed',
  IN_PROGRESS = 'Pending',
  IN_PROGRESS_VALIDATING = 'Validating',
  COMPLETED = 'Completed',
  PREPARE = 'Prepare',
}

export const TRANSACTION_TYPE = {
  DEPOSIT: 'DepositRequest',
  TRANSFER: 'TransferRequest',
  WITHDRAWAL: 'WithdrawalRequest',
  SETTLEMENT: 'SettlementRequest',
  MINT: 'MintRequest',
  ROYALTYTRANSFER: 'RoyaltyTransferRequest',
};

export const DF_TRANSACTION_TYPE = {
  [TRANSACTION_TYPE.DEPOSIT]: {
    title: 'Deposit',
    titleHistoryDetail: 'Deposit Received',
    titleFailed: 'Deposit Failed',
    iconFailed: <CircleCloseIcon className="text-error/6" />,
    iconReceived: (
      <Arrow3Icon direction="bottom" className="text-blue/6 mr-1" size={60} />
    ),
    icon: '',
  },
  [TRANSACTION_TYPE.WITHDRAWAL]: {
    title: 'Withdrawal',
    titleHistoryDetail: 'Withdrawal',
    titleFailed: 'Withdrawal Failed',
    iconReceived: (
      <Arrow3Icon direction="top" className="text-blue/6 mr-1" size={60} />
    ),
    iconFailed: <CircleCloseIcon className="text-error/6" />,
    icon: '',
  },
  [TRANSACTION_TYPE.SETTLEMENT]: {
    title: 'NFT Purchase',
    titleHistoryDetail: 'Purchase',
    titleFailed: 'Purchase Failed',
    icon: '/images/marketplace/icoPurchase.png',
    iconFailed: <CircleCloseIcon className="text-error/6" />,
    rotateIcon: 'top',
  },
  [TRANSACTION_TYPE.TRANSFER]: {
    title: 'NFT Transfer',
    titleHistoryDetail: 'Transfer',
    titleFailed: '',
    iconReceived: (
      <Arrow3Icon direction="top" className="text-blue/6 mr-1" size={60} />
    ),
    iconFailed: <CircleCloseIcon className="text-error/6" />,
    icon: '',
  },
  [TRANSACTION_TYPE.MINT]: {
    title: 'Mint',
    titleHistoryDetail: 'Mint',
    titleFailed: '',
    iconReceived: (
      <Arrow3Icon direction="top" className="text-blue/6 mr-1" size={60} />
    ),
    iconFailed: <CircleCloseIcon className="text-error/6" />,
    icon: '',
  },
  [TRANSACTION_TYPE.ROYALTYTRANSFER]: {
    title: 'RoyaltyTransferRequest',
    titleHistoryDetail: 'Creator Earnings Received',
    titleFailed: '',
    iconReceived: <ArrowRightLeftIcon />,
    iconFailed: '',
    icon: '',
  },
};

export default function MainScreen({
  gotoDepositScreen,
  gotoWithdrawScreen,
  options,
  balanceList,
  balanceEth,
  gotoDetailTransaction,
  activeToken,
  setActiveToken,
  gotoWithdrawNowScreen,
}: Props) {
  const [coinPrices, setCoinPrices] = useState([]);
  const [l1Balance, setL1Balance] = useState(0);
  const { isLoading, isFetched } = useBalanceList();
  const { data: etheCost = 0 } = useEtheriumPrice();
  const { address } = useWalletContext();
  const { setStatus, handleSetValueNFT } = useWithDrawNFTContext();
  const { handleDisplayPopoverWithdrawNFT, handleDisplayPopover } =
    useL2WalletContext();
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );
  const [walletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(
    localStorageKeys.starkKey,
    '',
  );

  useEffect(() => {
    let addressWallet: any = null;

    if (walletAddress) {
      addressWallet = walletAddress;
    }
    if (address) {
      addressWallet = address;
    }
    if (!addressWallet) return;

    const getBalanceOfMyriaL1Wallet = async () => {
      let assetType: string = '';
      assetType = asset.getAssetType({
        type: 'ETH',
        data: {
          quantum: QUANTUM_CONSTANT.toString(),
        },
      });
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const withdrawModule = moduleFactory.getWithdrawModule();

      const currentBalance = await withdrawModule.getWithdrawalBalance(
        addressWallet,
        assetType,
      );
      console.log('L1 Current balance ->', currentBalance);
      if (currentBalance > 0) {
        setL1Balance(Number(currentBalance));
      }
    };
    const interval = setInterval(() => {
      if (walletAddress && localStarkKey) {
        getBalanceOfMyriaL1Wallet();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [walletAddress, localStarkKey]);

  const completeWithdrawal = useCallback(() => {
    handleDisplayPopoverWithdrawNFT(true);
    setStatus(StatusWithdrawNFT.COMPLETED);
  }, [setStatus]);

  useEffect(() => {
    const temp: any = [];
    options.map((option: any) => {
      let tempOption = option;
      let assetType: string;
      if (option.name === 'Ethereum') {
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
            tokenAddress: option.tokenAddress,
          },
        });
      }
      const matchedBalance = balanceList.filter(
        (item: any) => item.assetType === assetType,
      );

      if (matchedBalance && matchedBalance.length > 0) {
        const balance =
          option.name === 'Ethereum'
            ? convertQuantizedAmountToEth(matchedBalance[0].quantizedAmount)
            : matchedBalance[0].quantizedAmount;
        const price =
          option.name === 'Ethereum'
            ? formatNumber2digits(etheCost * balance)
            : 0;
        tempOption = { ...tempOption, balance, price };
      } else tempOption = { ...tempOption, balance: 0 };
      temp.push(tempOption);
      return tempOption;
    });
    setCoinPrices(temp);
  }, [balanceList, options]);

  const onWithdrawActionFromHistory = useCallback(
    async (item: any) => {
      if (!starkKeyUser || !address || !item.assetId) return;
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;
      const withdrawalModule = moduleFactory.getWithdrawModule();
      const balance = await withdrawalModule.getWithdrawalBalance(
        address.toLowerCase(),
        item.assetId,
      );
      if (Number(balance) > 0) {
        if (item.name === 'Ethereum') {
          const transactionDetails = {
            ...item,
            ethAmount: convertWeiToEth(String(balance)),
          };
          console.log('Go to withdraw now screen');
          gotoWithdrawNowScreen({
            isComeFrom: WalletTabs.HISTORY,
            ...transactionDetails,
          });
        } else {
          handleDisplayPopover(false);
          handleSetValueNFT({
            ...item,
            name: 'Sigil NFT',
            assetMintId: item.assetId,
            isComeFrom: WalletTabs.HISTORY,
          });
          completeWithdrawal();
        }
      } else {
        toast(
          'Your L1 balance is not available yet. Please wait and be patient.',
        );
      }
    },
    [address, starkKeyUser],
  );

  const showWithdrawPopover = useCallback((item: any) => {
    handleDisplayPopover(false);
    handleSetValueNFT({
      ...item,
      name: 'NFT',
      assetMintId: item.assetId,
      isComeFrom: WalletTabs.HISTORY,
    });
    completeWithdrawal();
  }, []);

  const handleDetailTransaction = useCallback(item => {
    gotoDetailTransaction(item);
  }, []);

  if (isLoading && !isFetched) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <TailSpin />
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className="mt-2 flex items-center justify-center">
          <ETHIcon />
          <div className="text-base/10 ml-2 text-[32px]">{balanceEth || 0}</div>
        </div>
        <p className="text-base/9 text-center">
          ${formatNumber2digits(etheCost * balanceEth)}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={async () => {
            gotoDepositScreen();
          }}
          id="trigger-popover-deposit"
          className="text-base/10 bg-base/4 mr-4 flex items-center justify-center rounded-lg py-[10px] px-[18px] text-sm"
        >
          <div>
            <ArrowDownLeft />
          </div>
          <span className="text-brand-light-blue ml-1 text-sm font-medium">
            DEPOSIT
          </span>
        </button>
        <button
          onClick={() => {
            gotoWithdrawScreen();
          }}
          className="text-base/10 bg-base/4 flex items-center justify-center rounded-lg py-[10px] pl-2 pr-3 text-sm"
        >
          <div>
            <ArrowUpRight />
          </div>
          <span className="text-brand-light-blue ml-1 flex gap-1 text-sm font-medium">
            WITHDRAW
          </span>
        </button>
      </div>
      <div className="Tabs mt-[35px]">
        <ul className="flex justify-center">
          {tabs.map((item: any, index) => (
            <TabNavItem
              key={index}
              id={item.id}
              title={item.title}
              activeTab={activeToken}
              setActiveTab={setActiveToken}
            />
          ))}
        </ul>
        <div className="outlet">
          <TabContent id={WalletTabs.HISTORY} activeTab={activeToken}>
            <HistoryTab
              walletAddress={walletAddress}
              l1Balance={l1Balance}
              gotoDetailTransaction={handleDetailTransaction}
              localStarkKey={localStarkKey}
              onWithdrawActionFromHistory={onWithdrawActionFromHistory}
              showWithdrawPopover={showWithdrawPopover}
              starkKeyUser={starkKeyUser}
            />
          </TabContent>
          <TabContent id={WalletTabs.TOKENS} activeTab={activeToken}>
            <div className="mt-3">
              {coinPrices.map((item: any, index: number) => (
                <div
                  className={cn(
                    'flex cursor-pointer justify-between py-4',
                    index !== coinPrices.length - 1 &&
                      'border-base/10 border-b',
                  )}
                  key={index}
                >
                  <div className="flex w-full justify-between">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 flex-none"
                        src={item.ico}
                        alt="token_icon"
                      />
                      <div className="ml-2">
                        <p className="text-base/10 text-sm">{item.name}</p>
                        <div>
                          <span className="text-base/9 bg-base/4 rounded py-[2px] px-2 text-[10px] font-bold">
                            {item.short}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-base/10 mt-1 text-right text-sm">
                        {item.balance}
                      </div>
                      <div className="text-base/8 mt-1 text-right text-sm">
                        ${item.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabContent>
        </div>
      </div>
    </div>
  );
}
