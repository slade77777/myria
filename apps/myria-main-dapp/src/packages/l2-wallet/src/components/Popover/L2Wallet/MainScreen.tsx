import cn from 'classnames';
import { useEffect, useState } from 'react';

import Web3 from 'web3';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import DAOIcon from 'src/components/icons/DAOIcon';
import { useEtheriumPrice } from 'src/hooks/useEtheriumPrice';
import { formatNumber2digits } from 'src/utils';
import { CompletedIcon } from '../../Icons';
import ArrowDownLeft from '../../Icons/ArrowDownLeft';
import ArrowUpRight from '../../Icons/ArrowUpRight';
import ETHIcon from '../../Icons/ETHIcon';
import ProgressHistoryIcon from '../../Icons/ProgressHistoryIcon';
import TabContent from '../../Tabs/TabContent';
import TabNavItem from '../../Tabs/TabNavItem';
import ChevronIcon from '../../Icons/ChevronIcon';
import { convertQuantizedAmountToEth } from '../../../utils/Converter';
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
  { id: 'tokens', title: 'Tokens' },
  { id: 'history', title: 'History' },
];

const historyData: any[] = [];

const QUANTUM_CONSTANT = 10000000000;

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

  const renderType = (type: string) => {
    switch (type) {
      case 'DepositRequest':
        return 'Deposit';
      case 'WithdrawalRequest':
        return 'Withdrawal';
      case 'SettlementRequest':
        return 'Purchase';
      default:
        return '';
    }
  };

  const renderAmount = (type: string, amount: number) => {
    switch (type) {
      case 'SettlementRequest':
        return 1;
      default:
        return amount;
    }
  };

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
    if (item.status === 'in_progress') {
      return (
        <div className="text-base/9 mt-1 flex items-center">
          In progress <ProgressHistoryIcon size={14} className="ml-1" />
        </div>
      );
    } else {
      if (item.type === 'WithdrawalRequest') {
        return (
          <div className="text-primary/6 mt-1 flex items-center">
            Complete withdrawal{' '}
            {/* <ArrowDownLeft className="ml-1 text-primary/6" size={14} /> */}
            <ChevronIcon
              className="text-primary/6 ml-1"
              size={14}
              direction="right"
            />
          </div>
        );
      } else {
        return (
          <div className="text-base/9 mt-1 flex items-center">
            Complete <CompletedIcon className="text-base/9 ml-1" size={14} />
          </div>
        );
      }
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
          <TabContent id="tokens" activeTab={activeToken}>
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
          <TabContent id="history" activeTab={activeToken}>
            <div className="mt-3 max-h-[244px] overflow-y-auto">
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
                    <img
                      className="w-8 flex-none"
                      src={item.ico}
                      alt="token_icon"
                    />
                  </div>
                  <div className="grow">
                    <div className="text-base/10 flex items-center justify-between text-sm">
                      <span>{renderType(item.type)}</span>
                      <span className="flex items-center">
                        <span className="mb-[2px] mr-1">
                          {item.type !== 'SettlementRequest' && (
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
