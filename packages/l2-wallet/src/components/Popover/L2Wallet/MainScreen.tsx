import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import Web3 from 'web3';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { Arrow2Icon } from '../../Icons';
// import { Tab } from '../../Tabs';
import TabNavItem from '../../Tabs/TabNavItem';
import TabContent from '../../Tabs/TabContent';

type Props = {
  gotoDepositScreen: any;
  gotoWithdrawScreen: any;
  options: any;
  balanceList: any;
  balanceEth: any;
};

const tabs = [
  { id: 'tokens', title: 'Tokens' },
  { id: 'history', title: 'History' },
];

export default function MainScreen({
  gotoDepositScreen,
  gotoWithdrawScreen,
  options,
  balanceList,
  balanceEth,
}: Props) {
  const [coinPrices, setCoinPrices] = useState([]);
  const [activeToken, setActiveToken] = useState<string>('tokens');
  useEffect(() => {
    const temp: any = [];
    options.map((option: any, index: number) => {
      let tempOption = option;
      let assetType: string;
      if (option.name === 'Ethereum') {
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
            ? Web3.utils.fromWei(matchedBalance[0].quantizedAmount)
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
        <div className="flex justify-center mt-2 items-center">
          <div className="w-6 h-6">
            <img src="/assets/images/eth.png" alt="main-eth-token" />
          </div>
          <div className="text-[32px] ml-2 text-[#E7EBEE]">{balanceEth}</div>
        </div>
        <p className="tex-[#A1AFBA] text-center">$27,078.27</p>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={async () => {
            gotoDepositScreen();
          }}
          className="w-[114px] bg-[#0B2231] rounded-[8px] flex justify-center items-center text-white text-[14px] py-2 px-[18px] mr-4"
        >
          <Arrow2Icon
            direction="45"
            className="text-[#9AC9E3] mr-1"
            size={16}
          />
          <span className="ml-1 text-[#9AC9E3]">DEPOSIT</span>
        </button>
        <button
          onClick={() => {
            gotoWithdrawScreen();
          }}
          className="w-[114px] bg-[#0B2231] rounded-[8px] flex justify-center items-center text-white text-[14px] py-2 px-[18px]"
        >
          <Arrow2Icon
            direction="225"
            className="text-[#9AC9E3] mr-1"
            size={16}
          />
          <span className="ml-1 text-[#9AC9E3]">WITHDRAW</span>
        </button>
      </div>
      <div className="Tabs mt-[40px]">
        <ul className="flex justify-center">
          {tabs.map((item: any, index) => (
            <TabNavItem
              id={item.id}
              title={item.title}
              activeTab={activeToken}
              setActiveTab={setActiveToken}
            />
          ))}
        </ul>
        <div className="outlet">
          <TabContent id="tokens" activeTab={activeToken}>
            <div className="mt-[24px]">
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
                      className="flex-none w-[24px]"
                      src={item.ico}
                      alt="token_icon"
                    />
                    <span className="text-[14px] text-[rgba(255,255,255,0.6)] ml-2">
                      {item.name}
                    </span>
                  </div>
                  <div>
                    {/* <div className="text-[14px] text-[rgba(255,255,255,0.6)] text-right">
                {item.price}
              </div> */}
                    <div className="text-[12px] text-[rgba(255,255,255,0.6)] text-right mt-1">
                      {item.balance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabContent>
          <TabContent id="history" activeTab={activeToken}>
            <div className="mt-[24px]">
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
                      className="flex-none w-[24px]"
                      src={item.ico}
                      alt="token_icon"
                    />
                    <span className="text-[14px] text-[rgba(255,255,255,0.6)] ml-2">
                      {item.name}
                    </span>
                  </div>
                  <div>
                    <div className="text-[14px] text-[rgba(255,255,255,0.6)] text-right">
                      {item.price}
                    </div>
                    <div className="text-[12px] text-[rgba(255,255,255,0.6)] text-right mt-1">
                      {item.balance}
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
