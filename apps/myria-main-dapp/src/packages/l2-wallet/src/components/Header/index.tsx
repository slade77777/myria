// Import packages
import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

// Import components
import Popover from '../Popover';
import {
  ConnectIcon,
  DropdownArrowIcon,
  GlobalIcon,
  NotificationIcon,
  TriangularIcon,
  GamesIcon,
  DAppIcon,
  MarketPlaceIcon,
} from '../Icons';
import L2WalletPopover from '../Popover/L2WalletPopover';

// Import Redux
import { RootState } from '../../app/store';
import ClaimWithdrawPopover from '../Popover/ClaimWithdrawPopover';

enum TAB {
  GAMES,
  DAPPS,
  STORE,
}

// const tabs = [
//   { id: 1, name: 'Marketplace', icon: GamesIcon },
//   { id: 2, name: 'Games', icon: DAppIcon },
//   { id: 3, name: 'Nodes', icon: MarketPlaceIcon },
// ];

interface TProps {
  handleConnectWallet: any;
  account: any;
}

export default function Header({ handleConnectWallet, account }: TProps) {
  const [activeTab, setActiveTab] = useState<number>(TAB.GAMES);
  const showClaimPopover = useSelector(
    (state: RootState) => state.ui.showClaimPopover,
  );
  const popoverRef = useRef<any>();

  const selectTabHandle = (param: number) => {
    setActiveTab(param);
  };

  const abbreviationAddress = `${account.substring(0, 4)}...${account.substring(
    account.length - 4,
    account.length,
  )}`;

  const closePopover = () => {
    popoverRef?.current?.closePopover();
  };

  return (
    <div className="flex w-full items-center justify-between bg-[#ffffff] py-10 px-[11px]">
      <div className="flex items-center">
        {/* <div className="mr-[40px]">
          <img src="/assets/images/logo.svg" alt="logo" />
        </div> */}
        {/* {tabs.map((item: any, index: number) => (
          <div
            onClick={() => {
              selectTabHandle(index);
            }}
            className={cn(
              'relative mr-6 flex cursor-pointer items-center rounded-[8px] bg-[#081824] px-4 py-2',
              activeTab === index
                ? 'bg-[#0B2231] text-[#9AC9E3]'
                : 'text-white',
            )}
            key={index}
          >
            <p className="text-[14px] font-bold uppercase">{item.name}</p>
            {activeTab === index && (
              <div className="absolute bottom-[-8px] right-[calc(50%-8px)]">
                <TriangularIcon className="text-[#081824]" />
              </div>
            )}
          </div>
        ))} */}
      </div>
      <div className="flex items-center">
        <GlobalIcon className="mx-3 cursor-pointer text-white" />
        <NotificationIcon
          className="mx-3 cursor-pointer text-white"
          size={24}
        />
        <div className="ml-3 flex cursor-pointer rounded-[8px] bg-[#081824] text-[#5C5C5C]">
          <div className="m-[1px] rounded-[7px] bg-[#040B10] px-[12px] py-[10px]">
            {account ? (
              <Popover
                ref={popoverRef}
                width="min-w-[406px]"
                offsetX={-170}
                defaultShow={showClaimPopover}
                renderElement={
                  showClaimPopover ? (
                    <ClaimWithdrawPopover
                      abbreviationAddress={abbreviationAddress}
                      onClosePopover={closePopover}
                    />
                  ) : (
                    <L2WalletPopover
                      onClosePopover={closePopover}
                      abbreviationAddress={abbreviationAddress}
                    />
                  )
                }
              >
                <span className="uppercase">{abbreviationAddress}</span>
              </Popover>
            ) : (
              <span
                className="font-bold text-white"
                onClick={() => {
                  handleConnectWallet();
                }}
              >
                Connect Wallet
              </span>
            )}
          </div>
          <div className="flex items-center px-3">
            <ConnectIcon className="mr-3 text-[#5C5C5C]" />
            <DropdownArrowIcon className="text-[#97AAB5]" size={10} />
          </div>
        </div>
      </div>
    </div>
  );
}
