import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
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
    <div className="min-w-[288px] bg-[#081824] h-[100vh] flex flex-col justify-between">
      <div>
        <div className="flex items-center pl-[32px] py-[27px] pr-[60px]">
          <div className="mr-4">
            <img src={Logo} alt="logo" />
          </div>
          {/* <ArrowIcon /> */}
        </div>
        <div className="pl-[17px] pr-[32px] mt-[180px]">
          {ROUTES.map(item => (
            <Link to={item.route}>
              <div
                className="flex items-center h-[40px] px-[15px] hover:bg-[#E3E3E3] hover:rounded-[8px] cursor-pointer text-white"
                key={item.name}
              >
                <div>{item.icon}</div>
                <div className="text-bold ml-2">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pb-8">
        <div className="flex text-[#929292] py-8 border-t border-[#DBDBDB] px-6">
          <DiscordIcon className="text-[#929292] mr-6 cursor-pointer" />
          <TwitterIcon className="text-[#929292] mr-6 cursor-pointer" />
          <MediumIcon className="text-[#929292] mr-6 cursor-pointer" />
          <InstagramIcon className="text-[#929292] mr-6 cursor-pointer" />
        </div>
        <div onClick={showTermsServiceModal}>
          <p className="text-[#929292] text-[14px] px-6 cursor-pointer">
            © Copyright 2022 Myria <br />
            Terms | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}
