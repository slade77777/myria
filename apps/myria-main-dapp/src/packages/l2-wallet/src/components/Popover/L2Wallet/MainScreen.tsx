import cn from 'classnames';
import { useEffect, useState } from 'react';

// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import DAOIcon from 'src/components/icons/DAOIcon';
import { useEtheriumPrice } from 'src/hooks/useEtheriumPrice';
import { WalletTabs } from 'src/types';
import { formatNumber2digits } from 'src/utils';
import { convertQuantizedAmountToEth } from '../../../utils/Converter';
import { CircleCloseIcon, CompletedIcon } from '../../Icons';
import ArrowDownLeft from '../../Icons/ArrowDownLeft';
import ArrowUpRight from '../../Icons/ArrowUpRight';
import ChevronIcon from '../../Icons/ChevronIcon';
import ETHIcon from '../../Icons/ETHIcon';
import ProgressHistoryIcon from '../../Icons/ProgressHistoryIcon';
import TabContent from '../../Tabs/TabContent';
import TabNavItem from '../../Tabs/TabNavItem';
import Image from 'next/image';
type Props = {
  gotoDepositScreen: any;
  gotoWithdrawScreen: any;
  options: any;
  balanceList: any;
  balanceEth: any;
  transactionList: any;
  gotoDetailTransaction: any;
  activeToken: any;
  setActiveToken: any;
};

const tabs = [
  { id: WalletTabs.TOKENS, title: 'Tokens' },
  { id: WalletTabs.HISTORY, title: 'History' },
];

const historyData: any[] = [];

const QUANTUM_CONSTANT = 10000000000;

enum STATUS_HISTORY {
  SUCCESS = 'Success',
  FAILED = 'Failed',
  IN_PROGRESS = 'Pending',
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
    rotateIcon: 'bottom',
    icon: '',
  },
  [TRANSACTION_TYPE.WITHDRAWAL]: {
    title: 'Withdrawal',
    titleHistoryDetail: 'Withdrawal',
    rotateIcon: 'top',
    icon: '',
  },
  [TRANSACTION_TYPE.SETTLEMENT]: {
    title: 'Purchase',
    titleHistoryDetail: 'Purchase',
    icon: '/images/marketplace/icoPurchase.png',
    rotateIcon: 'top',
  },
  [TRANSACTION_TYPE.TRANSFER]: {
    title: 'Withdrawal',
    titleHistoryDetail: 'Withdrawal',
    rotateIcon: 'top',
    icon: '',
  },
  [TRANSACTION_TYPE.MINT]: {
    title: 'Mint',
    titleHistoryDetail: 'Deposit',
    rotateIcon: 'top',
    icon: '',
  },
};

const renderAmount = (type: string, amount: number) => {
  switch (type) {
    case 'SettlementRequest':
      return 1;
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
}: Props) {
  const [coinPrices, setCoinPrices] = useState([]);
  const { data: etheCost = 0 } = useEtheriumPrice();

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

  const renderStatus = (item: any) => {
    if (item.status === STATUS_HISTORY.IN_PROGRESS) {
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
      if (
        item.type === 'TransferRequest' ||
        item.type === 'WithdrawalRequest'
      ) {
        return (
          <div className="text-primary/6 mt-1 flex items-center">
            Complete withdrawal{' '}
            <ChevronIcon
              className="text-primary/6 ml-1"
              size={14}
              direction="right"
            />
          </div>
        );
      }
      return (
        <div className="text-base/9 mt-1 flex items-center">
          Complete <CompletedIcon className="text-base/9 ml-1" size={14} />
        </div>
      );
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
          className="text-base/10 bg-base/4 mr-4 flex w-[118px] items-center justify-center rounded-lg p-3 text-sm"
        >
          <div>
            <ArrowDownLeft />
          </div>
          <span className="text-brand-light-blue ml-1 font-medium">
            DEPOSIT
          </span>
        </button>
        <button
          onClick={() => {
            gotoWithdrawScreen();
          }}
          className="text-base/10 bg-base/4 flex w-[114px] items-center justify-center rounded-lg p-3 text-sm"
        >
          <div>
            <ArrowUpRight />
          </div>
          <span className="text-brand-light-blue ml-1 flex gap-1 font-medium">
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
          <TabContent id={WalletTabs.HISTORY} activeTab={activeToken}>
            <div className="mt-3 max-h-[244px] pr-2">
              {transactionList.length === 0 && <div>No data available yet</div>}
              {transactionList.map((item: any, index: number) => (
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
                  <div className="mr-2">
                    {item.type !== TRANSACTION_TYPE.SETTLEMENT && (
                      <img
                        className="w-8 flex-none"
                        src={item.ico}
                        alt="token_icon"
                      />
                    )}
                    {item.type === TRANSACTION_TYPE.SETTLEMENT && (
                      <Image
                        className="rounded-[16px]"
                        src={'/assets/images/assetPurchase.png'}
                        width={32}
                        height={32}
                      />
                    )}
                  </div>
                  <div className="grow">
                    <div className="text-base/10 flex items-center justify-between text-sm">
                      <span>{DF_TRANSACTION_TYPE[item?.type]?.title}</span>
                      <span className="flex items-center">
                        <span className="mb-[2px] mr-1">
                          {item.type !== TRANSACTION_TYPE.SETTLEMENT && (
                            <DAOIcon size={16} />
                          )}
                        </span>
                        <span>{renderAmount(item.type, item.amount)}</span>
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
        </div>
      </div>
    </div>
  );
}
