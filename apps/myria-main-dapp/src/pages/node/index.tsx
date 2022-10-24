import NodeLayout from '../../components/node/NodeLayout';
import React from 'react';
import { MyriaIcon } from '../../components/icons/MyriaIcon';
import NodeIcon from '../../components/icons/NodeIcon';
import KeyIcon from '../../components/icons/KeyIcon';

const historyData = [
  {
    time: 'Today',
    data: [
      {
        type: 'mine',
        number: '13892',
        time: '9:12am Thu 9th Nov 2022'
      },
      {
        type: 'earn',
        number: '10',
        time: '9:10am Thu 9th Nov 2022'
      }
    ]
  },
  {
    time: 'Wed 8th Nov 2022',
    data: [
      {
        type: 'mine',
        number: '13892',
        time: '10:12am Wed 8th Nov 2022'
      },
      {
        type: 'earn',
        number: '10',
        time: '9:12am Wed 8th Nov 2022'
      }
    ]
  },
  {
    time: 'Wed 7th Nov 2022',
    data: [
      {
        type: 'mine',
        number: '13892',
        time: '10:12am Wed 7th Nov 2022'
      },
      {
        type: 'earn',
        number: '10',
        time: '9:12am Wed 7th Nov 2022'
      }
    ]
  },
  {
    time: 'Wed 6th Nov 2022',
    data: [
      {
        type: 'mine',
        number: '13892',
        time: '10:12am Wed 6th Nov 2022'
      },
      {
        type: 'earn',
        number: '10',
        time: '9:12am Wed 6th Nov 2022'
      }
    ]
  }
];

const nodesProgress = [
  {
    name: 'My node abcx692',
    percent: 30,
    time: '01:00:56'
  },
  {
    name: 'My node sf32432r',
    percent: 60,
    time: '01:00:56'
  },
  {
    name: 'My node fdg324',
    percent: 40,
    time: '01:00:56'
  },
  {
    name: 'My node 4232353',
    percent: 30,
    time: '02:00:56'
  },
  {
    name: 'My node few32f',
    percent: 70,
    time: '03:00:56'
  },
  {
    name: 'My node dg34g3',
    percent: 90,
    time: '01:00:12'
  }
];

const Dashboard = () => {
  return (
    <NodeLayout>
      <p className="text-3xl font-semibold text-white">DashBoard</p>
      <div className="flex flex-row gap-6">
        <div className="w-2/3">
          <div className="bg-base/3 mt-6 w-full rounded-xl py-6 pl-6">
            <p className="text-base/9">Total Mined</p>
            <div className="mt-6 flex flex-row items-center gap-4">
              <div className="bg-blue/6 flex h-8 w-8 items-center justify-center rounded-full">
                <MyriaIcon className="h-6 w-6" fill="black" />
              </div>
              <p className="text-4xl font-bold">
                198,149.102<span className="text-base/9 text-sm font-normal"> $MYRIA</span>
              </p>
            </div>
          </div>
          <div className="flex w-full flex-row gap-6">
            <div className="bg-base/3 mt-6 rounded-xl py-6 pl-6 md:w-1/2">
              <p className="text-base/9">Your Node Online</p>
              <div className="mt-6 flex flex-row items-center gap-4">
                <div className="bg-success/8 flex h-8 w-8 items-center justify-center rounded-full">
                  <NodeIcon className="h-4 w-4 text-black" />
                </div>
                <p className="text-4xl font-bold">4</p>
              </div>
            </div>
            <div className="bg-base/3 mt-6 rounded-xl py-6 pl-6 md:w-1/2">
              <p className="text-base/9">Purchased Licenses</p>
              <div className="mt-6 flex flex-row items-center gap-4">
                <div className="bg-primary/6 flex h-8 w-8 items-center justify-center rounded-full">
                  <KeyIcon className="h-4 w-4 text-black" />
                </div>
                <p className="text-4xl font-bold">5</p>
              </div>
            </div>
          </div>
          <div className="bg-base/3 mt-6 w-full rounded-xl p-6">
            <div className="flex flex-row justify-between py-4">
              <p className="text-base/9">Node History</p>
              <p className="text-blue/6">View all history</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {historyData.map((day, index) => (
                <div key={index} className="mt-6">
                  <p>{day.time}</p>
                  {day.data.map((i, z) => (
                    <div key={z} className="mt-6 flex flex-row items-center gap-4">
                      <div className="bg-success/8 flex h-8 w-8 items-center justify-center rounded-full">
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
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-base/3 mt-6 w-full rounded-xl p-6">
            <p className="text-base/9">Node progress (Current cycle)</p>
            {nodesProgress.map((node, i) => (
              <div key={i} className="flex flex-row gap-4 mt-4 items-center w-full">
                <NodeIcon className="text-success-8 h-4 w-4" />
                <span className="w-40">{node.name}</span>
                <div className="bg-base/2 h-2 w-1/2 rounded-[4px]">
                  <div
                    className="bg-blue/6 h-2 rounded-[4px]"
                    style={{ width: `${node.percent}%` }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-right">{node.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-base/3 mt-6 w-full rounded-xl p-6">
            <p className="text-base/9">Progress Toward Goal</p>
            <div className="w-full mt-6"></div>
          </div>
        </div>
      </div>
    </NodeLayout>
  );
};

export default Dashboard;
