import clsx from 'clsx';
import React, { useState } from 'react';
import { paddingX } from 'src/utils';

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<'rewards' | 'inventory'>('rewards');
  return (
    <div
      className={clsx(
        paddingX,
        "flex min-h-screen bg-[url('/images/nodes/sigil/dashboard-bg_op.jpg')] bg-cover bg-top bg-no-repeat pt-[112px] pb-9"
      )}>
      <div className="grid grid-cols-[266px_1fr] gap-10">
        <div>Profile</div>
        <div>
          <div className="space-x-7">
            {(
              [
                {
                  label: 'Rewards',
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
                className="mr-7">
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-7">
            {tab === 'rewards' ? (
              <div className="space-y-8">
                <div>Rewards</div>
                <div>Missions</div>
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
