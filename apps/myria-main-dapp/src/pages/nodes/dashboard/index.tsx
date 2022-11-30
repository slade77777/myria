import NodeLayout from '../../../components/nodes/dashboard/NodeLayout';
import React, { useMemo, useState } from 'react';
import { MyriaIcon } from '../../../components/icons/MyriaIcon';
import NodeIcon from '../../../components/icons/NodeIcon';
import KeyIcon from '../../../components/icons/KeyIcon';
import { Trans } from '@lingui/macro';
import { NODE_LIMIT } from '../../../configs';
import useNodeLicense from '../../../hooks/useNodeLicense';
import clsx from 'clsx';
import NodesModal from '../../../components/nodes/dashboard/NodesModal';
import SemiCircleBar from '../../../components/nodes/dashboard/SemiCircleBar';
import { useRouter } from 'next/router';
import useNodeLicenseOperation from '../../../hooks/useNodeLicenseOperation';
import { formatTimeSecond } from '../../../utils';
import { Loading } from '../../../components/Loading';

const Dashboard = () => {
  const router = useRouter();
  const { data } = useNodeLicense();
  const [showFullNode, setShowNode] = useState(false);
  const { data: license, toggleMutation } = useNodeLicenseOperation();

  const nodeOnlineCount = useMemo(() => {
    return (
      license.nodes?.filter((i) => i.current_cycle_operation.status === 'running')?.length || 0
    );
  }, [license.nodes]);

  return (
    <NodeLayout>
      <NodesModal open={showFullNode} onClose={() => setShowNode(false)} />
      <p className="text-3xl font-semibold text-white">DashBoard</p>
      <div className="flex flex-row gap-6">
        <div className="w-2/3">
          <div className="bg-base/3 mt-6 w-full rounded-xl py-6 pl-6">
            <p className="text-base/9">Total Emissions</p>
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
                <p className="text-4xl font-bold">{nodeOnlineCount}</p>
              </div>
            </div>
            <div
              className="bg-base/3 mt-6 cursor-pointer rounded-xl py-6 pl-6 md:w-1/2"
              onClick={() => setShowNode(true)}>
              <p className="text-base/9">Purchased Licenses</p>
              <div className="mt-6 flex flex-row items-center gap-4">
                <div className="bg-primary/6 flex h-8 w-8 items-center justify-center rounded-full">
                  <KeyIcon className="h-4 w-4 text-black" />
                </div>
                <p className="text-4xl font-bold">{data?.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-base/3 mt-6 w-full rounded-xl p-6 pt-2">
            <div className="flex flex-row items-center justify-between gap-8 py-4">
              <div className="w-2/3">
                <p className="text-base/9 font-semibold">Node progress (Current cycle)</p>
                <p className="text-base/9 mt-4">
                  Your Node licenses are currently not operational, please click{' '}
                  <span className="font-semibold text-white">Turn On All Nodes</span> to begin
                  operating your Nodes. Myria will operate the Node Licenses on your behalf.
                </p>
              </div>
              {toggleMutation.isLoading ? (
                <div className="w-32 p-3 flex items-center justify-center">
                  <Loading />
                </div>
              ) : (
                <div>
                  {license.all_nodes_running ? (
                    <div
                      className="h-fit w-fit cursor-pointer rounded-xl p-3 border-2 border-white"
                      onClick={() => toggleMutation.mutate(false)}>
                      <p className="text-center font-bold text-white">TURN OFF ALL NODES</p>
                    </div>
                  ) : (
                    <div
                      className="bg-primary/6 h-fit w-fit cursor-pointer rounded-xl p-3"
                      onClick={() => toggleMutation.mutate(true)}>
                      <p className="text-center font-bold text-black">TURN ON ALL NODES</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="max-h-52 overflow-y-auto pr-4">
              {license?.nodes?.map((node, i) => {
                const active = node.current_cycle_operation.status === 'running';
                const percentLoaded = (node.current_cycle_operation.uptime * 100) / 21600;
                return (
                  <div key={i} className="mt-4 flex w-full flex-row items-center gap-4">
                    <div
                      className={clsx(
                        'h-6 w-6 flex items-center justify-center rounded-full',
                        active ? 'bg-success/2' : ''
                      )}>
                      <div
                        className={clsx(
                          'rounded-full w-3 h-3',
                          active ? 'bg-success/8' : 'bg-gray/5'
                        )}
                      />
                    </div>
                    <NodeIcon className={clsx('h-4 w-4', active ? 'text-white' : 'text-gray/5')} />
                    <span className={clsx('w-40', active ? 'text-white' : 'text-gray/5')}>
                      {node?.id.split('-')[0]}
                    </span>
                    <div className="bg-base/2 h-2 w-1/2 rounded-[4px]">
                      {active && (
                        <div
                          className="bg-blue/6 h-2 rounded-[4px]"
                          style={{ width: `${percentLoaded < 100 ? percentLoaded : 100}%` }}
                        />
                      )}
                    </div>
                    <p className={clsx('text-right', active ? 'text-white' : 'text-gray/5')}>
                      {active
                        ? formatTimeSecond(node.current_cycle_operation.countdown, 'HH:mm:ss')
                        : '--:--:--'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-base/3 mt-6 w-full rounded-xl p-6 pb-12">
            <p className="text-base/9">Progress Toward Goal</p>
            <div className="mt-6 w-full">
              <SemiCircleBar
                percentage={license?.cycle?.progress_towards_goal || 0}
                showPercentValue
              />
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
                <div className="w-1/2 text-4xl font-semibold">
                  {formatTimeSecond(license?.cycle?.current_distribution)}
                </div>
                <div className="w-1/2 text-4xl font-semibold">
                  {formatTimeSecond(license?.cycle?.time_active)}
                </div>
              </div>
            </div>
          </div>
          {data?.length < NODE_LIMIT && (
            <div className="bg-base/3 shadow-dark-panel mt-6 w-full rounded-xl bg-[url('/images/nodes/dashboard/network-bg_op.png')] bg-cover bg-center p-6">
              <p className="text-brand-light-blue text-[20px] font-medium leading-[1.25]">
                <Trans>Maximise your network</Trans>
              </p>
              <button
                onClick={() => router.push('/nodes/purchase')}
                className="btn-lg btn-white mt-6">
                <Trans>GET MORE LICENSES</Trans>
              </button>
            </div>
          )}
        </div>
      </div>
    </NodeLayout>
  );
};

export default Dashboard;
