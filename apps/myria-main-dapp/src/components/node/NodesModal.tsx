import React, { FC, memo, useMemo } from 'react';
import useUserNodes from '../../hooks/useUserNodes';
import Modal from '../Modal';
import TreeIcon from '../icons/TreeIcon';
import { Trans } from '@lingui/macro';
import Button from '../core/Button';
import { useRouter } from 'next/router';

const NodesModal: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const router = useRouter();
  const { data } = useUserNodes();
  const successTrans = data?.filter((item) => item.purchaseStatus === 'SUCCESSFUL');

  const totalNode = useMemo(() => {
    let total = 0;
    successTrans.map((transactions) => {
      total += transactions.nodes.length;
    });
    return total;
  }, [successTrans]);

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content
        title={`You have ${totalNode} Founder’s Node Licenses`}
        className="z-20 shadow-[0_0_40px_10px_#0000004D]">
        <div className="p-8">
          <p className="text-base/9">
            This i sthe instruction to let user know Myria will help them run your nodes for a
            specific time before Nodes software is available. Met minim mollit non deserunt ullamco
            est sit aliqua dolor do amet sint.
            <span className="text-primary/6 cursor-pointer" onClick={() => {}}>
              {' '}
              Learn more
            </span>
          </p>
          <div className="bg-primary/6 my-8 w-fit cursor-pointer rounded-xl p-4" onClick={() => {}}>
            <p className="font-bold text-black">TURN ON ALL NODES</p>
          </div>
          <div className="bg-base/7 h-[1px] w-full" />
          <div className="my-6 max-h-56 overflow-y-auto">
            {successTrans.map((transaction) => (
              <>
                {transaction?.nodes?.map((node) => (
                  <div key={node.nodeId} className="mt-2 flex flex-row items-center gap-4">
                    <TreeIcon fill="#A1AFBA" width={20} height={20} />
                    <span>{node.nodeId}</span>
                  </div>
                ))}
              </>
            ))}
          </div>
          <div className="bg-base/7 h-[1px] w-full" />
          <p className="text-base/9 mt-6">Maximise your network?</p>
          <Button
            className="btn-lg bg-blue/7 mt-4 w-56 px-4 uppercase text-black"
            onClick={() => {}}>
            <Trans>GET MORE LICENSES</Trans>
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default memo(NodesModal);
