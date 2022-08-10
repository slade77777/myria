import React from 'react';
import { Link } from 'react-router-dom';
import {
  DiscordIcon,
  InstagramIcon,
  MediumIcon,
  TwitterIcon,
  DashboardIcon,
  SwapIcon,
  StakingIcon,
  BridgeIcon,
  CircleKeyIcon,
} from '../Icons';

const ROUTES = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    icon: <DashboardIcon size={16} className="" />,
  },
  {
    name: 'My Assets',
    route: '/assets',
    icon: <SwapIcon size={16} className="" />,
  },
  { name: 'Swap', route: '/swap', icon: <SwapIcon size={16} className="" /> },
  {
    name: 'Stake',
    route: '/stake',
    icon: <StakingIcon size={16} className="" />,
  },
  {
    name: 'Bridge',
    route: '/bridge',
    icon: <BridgeIcon size={16} className="" />,
  },
  {
    name: 'Governance',
    route: '/governance',
    icon: <CircleKeyIcon size={16} className="" />,
  },
];

interface TProps {
  showTermsServiceModal: any;
}

export default function Sidebar({ showTermsServiceModal }: TProps) {
  return (
    <div className="flex h-[100vh] min-w-[288px] flex-col justify-between bg-[#081824]">
      <div>
        <div className="flex items-center py-[27px] pl-[32px] pr-[60px]">
          <div className="mr-4">
            <img src="/assets/images/logo.png" alt="logo" />
          </div>
          {/* <ArrowIcon /> */}
        </div>
        <div className="mt-[180px] pl-[17px] pr-[32px]">
          {ROUTES.map(item => (
            <Link key={`${JSON.stringify(item)}`} to={item.route}>
              <div
                key={`${JSON.stringify(item)}`}
                className="flex h-[40px] cursor-pointer items-center px-[15px] text-white hover:rounded-[8px] hover:bg-[#E3E3E3]"
                // key={item.name}
              >
                <div>{item.icon}</div>
                <div className="text-bold ml-2">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pb-8">
        <div className="flex border-t border-[#DBDBDB] py-8 px-6 text-[#929292]">
          <DiscordIcon className="mr-6 cursor-pointer text-[#929292]" />
          <TwitterIcon className="mr-6 cursor-pointer text-[#929292]" />
          <MediumIcon className="mr-6 cursor-pointer text-[#929292]" />
          <InstagramIcon className="mr-6 cursor-pointer text-[#929292]" />
        </div>
        <div onClick={showTermsServiceModal}>
          <p className="cursor-pointer px-6 text-[14px] text-[#929292]">
            © Copyright 2022 Myria <br />
            Terms | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}
