import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';

// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DAOIcon from 'src/components/icons/DAOIcon';
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

type Props = {
  gotoDepositScreen: any;
  gotoWithdrawScreen: any;
  options: any;
  balanceList: any;
  balanceEth: any;
  transactionList: any;
  gotoDetailTransaction: any;
  gotoWithdrawNowScreen: any;
  activeToken: any;
  setActiveToken: any;
};

const tabs = [
  { id: WalletTabs.HISTORY, title: 'History' },
  { id: WalletTabs.TOKENS, title: 'Tokens' },
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
    titleFailed: 'Purchase',
    icon: '/images/marketplace/icoPurchase.png',
    iconFailed: '',
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
    titleHistoryDetail: 'Deposit',
    titleFailed: '',
    iconReceived: '',
    iconFailed: '',
    icon: '',
  },
};

const renderAmount = (type: string, amount: number, item: any) => {
  switch (type) {
    case 'SettlementRequest':
      return convertQuantizedAmountToEth(item.partyBOrder.amountSell);
    default:
      return amount;
  }
};

export default function MainScreen({
  gotoDepositScreen,
  gotoWithdrawScreen,
  options,
  balanceList,
  balanceEth,
  transactionList,
  gotoDetailTransaction,
  activeToken,
  setActiveToken,
  gotoWithdrawNowScreen,
}: Props) {
  const [coinPrices, setCoinPrices] = useState([]);
  const [l1Balance, setL1Balance] = useState(0);
  const { data: etheCost = 0 } = useEtheriumPrice();
  const { address, onConnect, onConnectCompaign } = useWalletContext();
  const { valueNFT, setStatus, handleSetValueNFT } = useWithDrawNFTContext();
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
    options.map((option: any, index: number) => {
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

  const onWithdrawActionFromHistory = async (item: any) => {
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
  };

  const showWithdrawPopover = (item: any) => {
    handleDisplayPopover(false);
    handleSetValueNFT({
      ...item,
      name: 'Sigil NFT',
      assetMintId: item.assetId,
      isComeFrom: WalletTabs.HISTORY,
    });
    completeWithdrawal();
  };

  const renderStatus = (item: any) => {
    if (
      item.status === STATUS_HISTORY.IN_PROGRESS ||
      item.status === STATUS_HISTORY.IN_PROGRESS_VALIDATING ||
      item.status === STATUS_HISTORY.PREPARE
    ) {
      return (
        <div className="text-base/9 mt-1 flex items-center">
          In progress <ProgressHistoryIcon size={14} className="ml-1" />
        </div>
      );
    }

    if (item.status === STATUS_HISTORY.FAILED) {
      return (
        <div className="text-error/6 mt-1 flex items-center">
          Failed <CircleCloseIcon size={14} className="text-error/6 ml-1" />
        </div>
      );
    }

    if (item.status === STATUS_HISTORY.SUCCESS) {
      if (item.type === TRANSACTION_TYPE.WITHDRAWAL) {
        if (item.tokenType === 'ETH' && l1Balance > 0) {
          return (
            <button
              onClick={e => {
                e.stopPropagation();
                onWithdrawActionFromHistory(item);
              }}
              className="text-primary/6 mt-1 flex cursor-pointer items-center"
            >
              Complete withdrawal{' '}
              <ChevronIcon
                className="text-primary/6 ml-1"
                size={14}
                direction="right"
              />
            </button>
          );
        }

        if (item.tokenType === 'ETH' && l1Balance === 0) {
          return (
            <div className="text-base/9 mt-1 flex items-center">
              In progress <ProgressHistoryIcon size={14} className="ml-1" />
            </div>
          );
        }

        if (item.tokenType === 'MINTABLE_ERC721') {
          return (
            <RenderStatus
              item={item}
              showWithdrawPopover={() => showWithdrawPopover(item)}
              starkKeyUser={`0x${localStarkKey}`}
              address={walletAddress}
            />
          );
        }
      }
      return (
        <div className="text-base/9 mt-1 flex items-center">
          Complete <CompletedIcon className="text-base/9 ml-1" size={14} />
        </div>
      );
    }

    if (
      item.status === STATUS_HISTORY.COMPLETED &&
      (item.type === TRANSACTION_TYPE.TRANSFER ||
        item.type === TRANSACTION_TYPE.WITHDRAWAL)
    ) {
      return (
        <div className="text-base/9 mt-1 flex items-center">
          Complete <CompletedIcon className="text-base/9 ml-1" size={14} />
        </div>
      );
    }
  };

  const renderIcon = (item: any) => {
    if (
      !item.name &&
      (item.type === TRANSACTION_TYPE.WITHDRAWAL ||
        item.type === TRANSACTION_TYPE.TRANSFER ||
        item.type === TRANSACTION_TYPE.SETTLEMENT)
    ) {
      return <WithdrawNFTIcon size={32} />;
    }

    if (item.type !== TRANSACTION_TYPE.SETTLEMENT) {
      return <img className="w-8 flex-none" src={item.ico} alt="token_icon" />;
    }
  };

  const renderTitle = (item: any) => {
    const startKey = `0x${starkKeyUser}`;
    if (item.type === TRANSACTION_TYPE.SETTLEMENT) {
      if (item.partyAOrder.publicKey === startKey) {
        return 'NFT Sale';
      }
      if (item.partyBOrder.publicKey === startKey) {
        return 'NFT Purchase';
      }
    }
    if (!item.name && item.type === TRANSACTION_TYPE.WITHDRAWAL) {
      return 'NFT Withdraw';
    }
    if (!item.name && item.type === TRANSACTION_TYPE.TRANSFER) {
      return 'NFT Transfer';
    } else {
      return DF_TRANSACTION_TYPE[item?.type]?.title;
    }
  };

  return (
    <div>
      <div>
        <div className="mt-2 flex items-center justify-center">
          <ETHIcon />
          <div className="text-base/10 ml-2 text-[32px]">
            {balanceEth || '0'}
          </div>
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
            <div className="mt-3 max-h-[244px] pr-2">
              {transactionList?.length === 0 && (
                <div>No data available yet</div>
              )}
              {transactionList?.map((item: any, index: number) => (
                <div
                  onClick={() => {
                    gotoDetailTransaction(item);
                  }}
                  className={cn(
                    'flex cursor-pointer items-center py-4',
                    index !== historyData.length - 1 &&
                      'border-b border-white/10',
                  )}
                  key={index}
                >
                  <div className="mr-2">{renderIcon(item)}</div>
                  <div className="grow">
                    <div className="text-base/10 flex items-center justify-between text-sm">
                      <span>{renderTitle(item)}</span>
                      <span className="flex items-center">
                        <span className="mb-[2px] mr-1">
                          {!item.name &&
                          (item.type === TRANSACTION_TYPE.WITHDRAWAL ||
                            item.type === TRANSACTION_TYPE.TRANSFER) ? (
                            ''
                          ) : (
                            <DAOIcon size={16} />
                          )}
                        </span>
                        <span>
                          {renderAmount(item.type, item.amount, item)}
                        </span>
                      </span>
                    </div>
                    <div className="text-base/9 flex items-center justify-between text-xs">
                      <span>{item.time}</span>
                      {renderStatus(item)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                      <div className="ml-4">
                        <p className="text-base/9 text-sm">{item.name}</p>
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

const RenderStatus: React.FC<{
  item: any;
  starkKeyUser: string;
  address: string;
  showWithdrawPopover: any;
}> = ({ item, starkKeyUser, address, showWithdrawPopover }) => {
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    const getBalance = async (item: any) => {
      if (!starkKeyUser || !address || !item?.assetId) return;
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const withdrawalModule = moduleFactory.getWithdrawModule();

      const balance = await withdrawalModule.getWithdrawalBalance(
        address.toLowerCase(),
        item?.assetId + '',
      );
      setBalance(Number(balance));
    };
    getBalance(item);
  }, [address, item, starkKeyUser]);

  return (
    <>
      {balance > 0 ? (
        <button
          onClick={e => {
            e.stopPropagation();
            showWithdrawPopover();
          }}
          className="text-primary/6 mt-1 flex cursor-pointer items-center"
        >
          Complete withdrawal{' '}
          <ChevronIcon
            className="text-primary/6 ml-1"
            size={14}
            direction="right"
          />
        </button>
      ) : (
        <div className="text-base/9 mt-1 flex items-center">
          In progress <ProgressHistoryIcon size={14} className="ml-1" />
        </div>
      )}
    </>
  );
};
