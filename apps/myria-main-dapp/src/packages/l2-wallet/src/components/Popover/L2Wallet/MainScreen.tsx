import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import Web3 from 'web3';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import {
  Arrow2Icon,
  CompletedIcon,
  EthereumIcon,
  MyriaCoinIcon,
  ProgressIcon,
} from '../../Icons';
import TabNavItem from '../../Tabs/TabNavItem';
import TabContent from '../../Tabs/TabContent';
import DAOIcon from '../../../../../../components/icons/DAOIcon';
import { useEtheriumPrice } from '../../../../../../hooks/useEtheriumPrice';
import { formatNumber2digits } from '../../../../../../utils';
import ETHIcon from '../../Icons/ETHIcon';
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
// {
//   id: 1,
//   type: 'Withdrawal',
//   amount: 1.217,
//   time: '10 minutes ago',
//   status: 'in_progress',
//   ico: '/images/marketplace/eth.svg',
// },
// {
//   id: 2,
//   type: 'Withdrawal',
//   amount: 1.217,
//   time: '10 minutes ago',
//   status: 'success',
//   ico: '/images/marketplace/eth.svg',
// },
// {
//   id: 3,
//   type: 'Purchase - Ultra Rare Vect...',
//   amount: 2.019,
//   time: '2 hours ago',
//   status: 'complete',
//   ico: '/images/marketplace/eth.svg',
// },
// {
//   id: 4,
//   type: 'Deposit',
//   amount: 10.681,
//   time: 'Yesterday',
//   status: 'complete',
//   ico: '/images/marketplace/eth.svg',
// },
// ];

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
        tempOption = { ...tempOption, balance };
      } else tempOption = { ...tempOption, balance: 0 };
      temp.push(tempOption);
      return tempOption;
    });
    setCoinPrices(temp);
  }, [balanceList, options]);

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
          className="mr-4 flex w-[114px] items-center justify-center rounded-[8px] bg-[#0B2231] py-2 px-[18px] text-[14px] text-white"
        >
          <Arrow2Icon
            direction="45"
            className="mr-1 text-[#9AC9E3]"
            size={16}
          />
          <span className="ml-1 text-[#9AC9E3]">DEPOSIT</span>
        </button>
        <button
          onClick={() => {
            gotoWithdrawScreen();
          }}
          className="flex w-[114px] items-center justify-center rounded-[8px] bg-[#0B2231] py-2 px-[18px] text-[14px] text-white"
          id="trigger-withdraw"
        >
          <Arrow2Icon
            direction="225"
            className="mr-1 text-[#9AC9E3]"
            size={16}
          />
          <span className="ml-1 text-[#9AC9E3]">WITHDRAW</span>
        </button>
      </div>
      <div className="Tabs mt-[40px]">
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
                    'flex justify-between py-4',
                    index !== coinPrices.length - 1 &&
                      'border-b border-[#E5E5E5]',
                  )}
                  key={index}
                >
                  <div className="flex items-center">
                    <img
                      className="w-[24px] flex-none"
                      src={item.ico}
                      alt="token_icon"
                    />
                    <span className="ml-2 text-[14px] text-[rgba(255,255,255,0.6)]">
                      {item.name}
                    </span>
                  </div>
                  <div>
                    <div className="mt-1 text-right text-[12px] text-[rgba(255,255,255,0.6)]">
                      {item.balance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabContent>
          <TabContent id="history" activeTab={activeToken}>
            <div className="mt-3 max-h-[320px] overflow-y-auto">
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
                      <span>{item.type}</span>
                      <span className="flex items-center">
                        <span className="mb-[2px] mr-1">
                          <DAOIcon size={16} />{' '}
                        </span>
                        <span>{item.amount}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-[#A1AFBA]">
                      <span>{item.time}</span>
                      {item.status === 'in_progress' ? (
                        <div className="mt-1 flex items-center text-[#A1AFBA]">
                          In progress{' '}
                          <ProgressIcon
                            isNotAnimate
                            size={14}
                            className="ml-1 text-[#A1AFBA]"
                          />
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center text-[#A1AFBA]">
                          Complete{' '}
                          <CompletedIcon
                            className="ml-1 text-[#A1AFBA]"
                            size={14}
                          />
                        </div>
                      )}
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
