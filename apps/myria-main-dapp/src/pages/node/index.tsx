import NodeLayout from '../../components/node/NodeLayout';
import React from 'react';
import { MyriaIcon } from '../../components/icons/MyriaIcon';
import NodeIcon from '../../components/icons/NodeIcon';
import KeyIcon from '../../components/icons/KeyIcon';
import SemiCircleBar from '../../components/node/SemiCircleBar';
import { Trans } from '@lingui/macro';
import Switch from '../../components/Switch';

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
          <div className="bg-base/3 mt-6 w-full rounded-xl p-6 pt-2">
            <div className="flex flex-row justify-between gap-8 py-4 items-center">
              <div>
                <p className="text-base/9 font-semibold">Node progress (Current cycle)</p>
                {/*<p className="text-base/9 mt-4">*/}
                {/*  Myria team help them run your nodes for a specific time before Nodes software is*/}
                {/*  available.<span className="text-primary/6"> Learn more</span>*/}
                {/*</p>*/}
              </div>
              <div
                className="border-base/9 h-fit w-fit cursor-pointer rounded-xl border-2 p-3"
                onClick={() => {}}>
                <p className="text-center font-bold text-white">TURN OFF ALL NODES</p>
              </div>
            </div>
            {nodesProgress.map((node, i) => (
              <div key={i} className="mt-4 flex w-full flex-row items-center gap-4">
                <NodeIcon className="text-success-8 h-4 w-4" />
                <span className="w-40">{node.name}</span>
                <div className="bg-base/2 h-2 w-1/2 rounded-[4px]">
                  <div
                    className="bg-blue/6 h-2 rounded-[4px]"
                    style={{ width: `${node.percent}%` }}
                  />
                </div>
                <p className="text-right">{node.time}</p>
                <Switch defaultChecked={true} onChange={() => {}} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-base/3 mt-6 w-full rounded-xl p-6 pb-12">
            <p className="text-base/9">Progress Toward Goal</p>
            <div className="mt-6 w-full">
              <SemiCircleBar percentage={90} showPercentValue />
              <div className="mt-8 flex flex-row">
                <div className="text-base/9 w-1/2">Current</div>
                <div className="text-base/9 w-1/2">Time</div>
              </div>
              <div className="mt-2 flex flex-row">
                <div className="text-base/9 w-1/2">Distribution</div>
                <div className="text-base/9 w-1/2">Active</div>
              </div>
              <div className="text-base/9 mt-2">Cycle</div>
              <div className="mt-2 flex flex-row">
                <div className="w-1/2 text-4xl font-semibold">00:05</div>
                <div className="w-1/2 text-4xl font-semibold">23:29</div>
              </div>
            </div>
          </div>
          <div className="bg-base/3 shadow-dark-panel mt-6 w-full rounded-xl bg-[url('/images/nodes/dashboard/network-bg_op.png')] bg-cover bg-center p-6">
            <p className="text-brand-light-blue text-[20px] font-medium leading-[1.25]">
              <Trans>Maximise your network</Trans>
            </p>
            <button className="btn-lg btn-white mt-6">
              <Trans>GET MORE LICENSES</Trans>
            </button>
          </div>
        </div>
      </div>
    </NodeLayout>
  );
};

export default Dashboard;
