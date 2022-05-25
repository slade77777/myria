import clsx from 'clsx';
import React, { useState } from 'react';
import { useAuthenticationContext } from 'src/context/authentication';
import Profile from './Profile';
import { paddingX } from 'src/utils';
import Mission from './MissionV2';

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<'rewards' | 'inventory'>('rewards');
  const { user } = useAuthenticationContext();

  return (
    <div
      className={clsx(
        "flex min-h-screen flex-col bg-[url('/images/nodes/sigil/dashboard-bg_op.jpg')] bg-cover bg-top bg-no-repeat pt-[112px] pb-9 pl-[43px]"
      )}>
      <div className="grid w-full flex-grow grid-cols-[266px_1fr] gap-10">
        <div className="">
          <Profile />
        </div>
        <div>
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
          <div className="mt-7">
            {tab === 'rewards' ? (
              <div className="space-y-8">
                <div>Rewards</div>
                <Mission />
              </div>
            ) : (
              <div>Inventory</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
