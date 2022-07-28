import cn from 'classnames';
import { useEffect, useState } from 'react';

import Web3 from 'web3';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import DAOIcon from '../../../../../../components/icons/DAOIcon';
import { useEtheriumPrice } from '../../../../../../hooks/useEtheriumPrice';
import { formatNumber2digits } from '../../../../../../utils';
import { CompletedIcon } from '../../Icons';
import ArrowDownLeft from '../../Icons/ArrowDownLeft';
import ArrowUpRight from '../../Icons/ArrowUpRight';
import ETHIcon from '../../Icons/ETHIcon';
import ProgressHistoryIcon from '../../Icons/ProgressHistoryIcon';
import TabContent from '../../Tabs/TabContent';
import TabNavItem from '../../Tabs/TabNavItem';
import ChevronIcon from '../../Icons/ChevronIcon';
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
            ? Web3.utils.fromWei(
                (
                  matchedBalance[0].quantizedAmount * QUANTUM_CONSTANT ?? 0
                ).toString(),
              )
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
        <div className="mt-1 flex items-center text-[#A1AFBA]">
          In progress <ProgressHistoryIcon size={14} className="ml-1" />
        </div>
      );
    } else {
      if (item.type === 'WithdrawalRequest') {
        return (
          <div className="mt-1 flex items-center text-[#F5B941]">
            Complete withdrawal{' '}
            {/* <ArrowDownLeft className="ml-1 text-[#F5B941]" size={14} /> */}
            <ChevronIcon
              className="ml-1 text-[#F5B941]"
              size={14}
              direction="right"
            />
          </div>
        );
      } else {
        return (
          <div className="mt-1 flex items-center text-[#A1AFBA]">
            Complete <CompletedIcon className="ml-1 text-[#A1AFBA]" size={14} />
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
          <div className="ml-2 text-[32px] text-[#E7EBEE]">{balanceEth}</div>
        </div>
        <p className="text-center text-[#A1AFBA]">
          ${formatNumber2digits(etheCost * balanceEth)}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={async () => {
            gotoDepositScreen();
          }}
          className="mr-4 flex w-[118px] items-center justify-center rounded-[8px] bg-[#0B2231] p-3 text-[14px] text-white"
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
          className="flex w-[114px] items-center justify-center rounded-[8px] bg-[#0B2231] p-3 px-[18px] text-[14px] text-white"
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
                      'border-b border-[#E5E5E5]',
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
                        <p className="text-[14px] text-[rgba(255,255,255,0.6)]">
                          {item.name}
                        </p>
                        <div>
                          <span className="text-base/9 bg-base/4 rounded py-[2px] px-2 text-[10px] font-bold">
                            {item.short}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-base/10 mt-1 text-right text-[14px]">
                        {item.balance}
                      </div>
                      <div className="text-base/8 mt-1 text-right text-[14px]">
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
                      'border-b border-[rgba(255,255,255,0.1)]',
                  )}
                  key={index}
                >
                  <div className="mr-2">
                    <img
                      className="w-[32px] flex-none"
                      src={item.ico}
                      alt="token_icon"
                    />
                  </div>
                  <div className="grow">
                    <div className="flex items-center justify-between text-[14px] text-[#E7EBEE]">
                      <span>{renderType(item.type)}</span>
                      <span className="flex items-center">
                        <span className="mb-[2px] mr-1">
                          <DAOIcon size={16} />{' '}
                        </span>
                        <span>{item.amount}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-[#A1AFBA]">
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
