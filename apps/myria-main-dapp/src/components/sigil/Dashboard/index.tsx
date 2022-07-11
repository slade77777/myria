import clsx from 'clsx';
import React, { useState } from 'react';
import { useAuthenticationContext } from 'src/context/authentication';
import Profile from '../Profile';
import Mission from './MissionV2';
import Inventory from '../Inventory';
import NftReward from '../NftReward';

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<'rewards' | 'inventory'>('rewards');
  const { user } = useAuthenticationContext();

  return (
    <div
      className={clsx(
        "fixed w-full h-full flex min-h-screen flex-col bg-[url('/images/nodes/sigil/dashboard-bg_op.jpg')] bg-cover bg-top bg-no-repeat pb-9 pl-[35px]"
      )}>
      <div className="grid w-full overflow-auto mt-[112px] flex-grow grid-cols-[266px_1fr] gap-10">
        <div className="pl-2">
          <Profile />
        </div>
        <div className="overflow-auto">
          <div className="flex w-full items-center">
            {(
              [
                {
                  label: 'NFT Rewards',
                  value: 'rewards'
                },
                {
                  label: 'Inventory',
                  value: 'inventory'
                }
              ] as const
            ).map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setTab(item.value);
                }}
                className={clsx(
                  'sigil-text mr-7 text-[20px] font-extrabold uppercase leading-[25px] opacity-50',
                  {
                    '!opacity-100': item.value === tab
                  }
                )}>
                {item.label}
              </button>
            ))}
            <p className="ml-auto min-w-[182px] bg-[url('/images/nodes/sigil/point-bg.png')] bg-cover bg-left py-2 pl-8">
              <span className="text-[14px] leading-[17px] text-light">POINTS</span>
              <span className="sigil-text ml-[14px] text-[20px] font-extrabold leading-[25px]">
                {user?.credits}
              </span>
            </p>
          </div>
          <div>
            {tab === 'rewards' ? (
              <div className="space-y-8">
                <NftReward />
                <Mission />
              </div>
            ) : (
              <Inventory />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
