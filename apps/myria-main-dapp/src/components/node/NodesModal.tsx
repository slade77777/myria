import React, { FC, memo, useMemo } from 'react';
import useUserNodes from '../../hooks/useUserNodes';
import Modal from '../Modal';
import TreeIcon from '../icons/TreeIcon';
import { Trans } from '@lingui/macro';
import Button from '../core/Button';
import { useRouter } from 'next/router';
import useNodeLicense from '../../hooks/useNodeLicense';
import nodes from '../../pages/nodes/dashboard/nodes';
import { NODE_LIMIT } from '../../configs';

const NodesModal: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const router = useRouter();
  const { data } = useNodeLicense();

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content
        title={`You have ${data?.length} Founder’s Node Licenses`}
        className="z-20 shadow-[0_0_40px_10px_#0000004D]">
        <div className="p-8">
          <p className="text-base/9">
            By clicking <span className="font-semibold text-white">Turn On All Nodes</span> you’ll
            be able to begin the operation of all your Myria Node license/s. your Node license will
            continue to operate indefinitely (even if the tab, browser closes or device is
            shutdown). The only action that will switch off your node operation would be to interact
            with the node operation button on myria.com to Turn Off All Nodes.
          </p>
          <div className="bg-primary/6 my-8 w-fit cursor-pointer rounded-xl p-4" onClick={() => {}}>
            <p className="font-bold text-black">TURN ON ALL NODES</p>
          </div>
          <div className="bg-base/7 h-[1px] w-full" />
          <div className="my-6 max-h-56 overflow-y-auto">
            {data?.map((node) => (
              <div key={node.nodeId} className="mt-2 flex flex-row items-center gap-4">
                <TreeIcon fill="#A1AFBA" width={20} height={20} />
                <span>{node.nodeId}</span>
              </div>
            ))}
          </div>

          {nodes?.length < NODE_LIMIT && (
            <div>
              <div className="bg-base/7 h-[1px] w-full" />
              <p className="text-base/9 mt-6">Maximise your network?</p>
              <Button
                className="btn-lg bg-blue/7 mt-4 w-56 px-4 uppercase text-black"
                onClick={() => router.push('nodes/purchase')}>
                <Trans>GET MORE LICENSES</Trans>
              </Button>
            </div>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default memo(NodesModal);
