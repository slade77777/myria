import clsx from 'clsx';
import React, { useState } from 'react';
import { useAuthenticationContext } from 'src/context/authentication';
import Profile from '../Profile';
import Inventory from '../Inventory';
import NftReward from '../NftReward';
import { Trans } from '@lingui/macro';

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<'rewards' | 'inventory'>('rewards');
  const { user } = useAuthenticationContext();

  return (
    <div
      className={clsx(
        "fixed flex h-full min-h-screen w-full flex-col bg-[url('/images/nodes/sigil/dashboard-bg_op.jpg')] bg-cover bg-top bg-no-repeat pb-9 pl-[35px]"
      )}>
      <div className="mt-[166px] grid w-full flex-grow grid-cols-[266px_1fr] gap-10 overflow-auto">
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
              <span className="text-light text-[14px] leading-[17px]">POINTS</span>
              <span className="sigil-text ml-[14px] text-[20px] font-extrabold leading-[25px]">
                {user?.credits}
              </span>
            </p>
          </div>
          <div>
            {tab === 'rewards' ? (
              <div className="space-y-8">
                <NftReward />
                <div className="mt-[120px] flex flex-col items-center space-y-4">
                  <p className="h6">
                    <Trans>Missions are now locked</Trans>
                  </p>
                  <p className="body-14-regular max-w-[364px] text-center text-light">
                    <Trans>
                      Thanks for participating! You can still claim your NFT rewards and open your
                      chests. Reward minting will begin soon.
                    </Trans>
                  </p>
                  <button
                    onClick={() => setTab('inventory')}
                    type="button"
                    className="btn-lg btn-primary">
                    GO TO INVENTORY
                  </button>
                </div>
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
