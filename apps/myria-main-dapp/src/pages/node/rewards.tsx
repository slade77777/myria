import NodeLayout from '../../components/node/NodeLayout';
import React from 'react';
import { MyriaIcon } from '../../components/icons/MyriaIcon';
import NodeIcon from '../../components/icons/NodeIcon';
import clsx from 'clsx';

const historyData = [
  {
    time: 'Today',
    data: [
      {
        type: 'mine',
        number: '13892',
        time: '9:12am Thu 9th Nov 2022',
        isClaim: true
      },
      {
        type: 'earn',
        number: '10',
        time: '9:10am Thu 9th Nov 2022',
        isClaim: true
      }
    ]
  },
  {
    time: 'Wed 8th Nov 2022',
    data: [
      {
        type: 'mine',
        number: '13892',
        time: '10:12am Wed 8th Nov 2022',
        isClaim: false
      },
      {
        type: 'earn',
        number: '10',
        time: '9:12am Wed 8th Nov 2022',
        isClaim: false
      }
    ]
  },
  {
    time: 'Wed 7th Nov 2022',
    data: [
      {
        type: 'mine',
        number: '13892',
        time: '10:12am Wed 7th Nov 2022',
        isClaim: true
      },
      {
        type: 'earn',
        number: '10',
        time: '9:12am Wed 7th Nov 2022',
        isClaim: false
      }
    ]
  },
  {
    time: 'Wed 6th Nov 2022',
    data: [
      {
        type: 'mine',
        number: '13892',
        time: '10:12am Wed 6th Nov 2022',
        isClaim: true
      },
      {
        type: 'earn',
        number: '10',
        time: '9:12am Wed 6th Nov 2022',
        isClaim: true
      }
    ]
  }
];

const Rewards = () => {
  return (
    <NodeLayout>
      <p className="text-3xl font-semibold text-white">Rewards</p>
      <div className="bg-base/3 mt-6 flex w-full flex-row items-center justify-between rounded-xl bg-[url('/images/nodes/claim-rewards-bg.png')] bg-cover px-6 py-8">
        <div>
          <p className="text-base/9">Unclaimed rewards</p>
          <div className="mt-6 flex flex-row items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFB705]">
              <MyriaIcon className="h-6 w-6" fill="white" />
            </div>
            <p className="text-4xl font-bold">
              198,149.102<span className="text-base/9 text-sm font-normal"> $MYRIA</span>
            </p>
          </div>
        </div>
        <div className="bg-primary/6 rounded-xl p-4">
          <p className="font-bold text-black">CLAIM ALL REWARDS</p>
        </div>
      </div>
      <div className="bg-base/3 mt-6 w-full rounded-xl p-6">
        <div className="flex flex-row justify-between py-4">
          <p className="text-base/9">Rewards History</p>
          <p className="text-blue/6">View all history</p>
        </div>
        <div>
          {historyData.map((day, index) => (
            <div key={index} className="mt-6">
              <p>{day.time}</p>
              {day.data.map((i, z) => (
                <div key={z} className="mt-6 flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-4">
                    <div className="bg-blue/6 flex h-8 w-8 items-center justify-center rounded-full">
                      {i.type === 'mine' ? (
                        <MyriaIcon className="h-4 w-4" fill="black" />
                      ) : (
                        <NodeIcon className="h-4 w-4 text-black" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">
                        You mined <span className="text-primary/6">{i.number}</span> $MYRIA
                      </p>
                      <p className="text-base/8 mt-2">{i.time}</p>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      'w-36 rounded-xl p-4',
                      !i.isClaim ? 'bg-primary/6' : 'bg-gray/4'
                    )}>
                    <p
                      className={clsx(
                        'text-center font-bold',
                        !i.isClaim ? 'text-black' : 'text-gray/6'
                      )}>
                      {i.isClaim ? 'CLAIMED' : 'CLAIM'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </NodeLayout>
  );
};

export default Rewards;
