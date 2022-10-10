import React, { FC, memo, useMemo } from 'react';
import useUserNodes from '../../hooks/useUserNodes';
import Modal from '../Modal';
import TreeIcon from '../icons/TreeIcon';
import { Trans } from '@lingui/macro';
import Button from '../core/Button';
import { useRouter } from 'next/router';

const MyNodeModal: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
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
        title="Purchased Node Licenses"
        className="z-20 shadow-[0_0_40px_10px_#0000004D]">
        <div className="p-8">
          <p className="text-base/9">You have {totalNode} Founder’s Node Licenses</p>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {successTrans.map((transaction) => (
              <>
                {transaction?.nodes?.map((node) => (
                  <div key={node.nodeId} className="flex flex-row items-center gap-4 mt-2">
                    <TreeIcon fill="#81CA95" width={20} height={20} />
                    <span>{node.nodeId}</span>
                  </div>
                ))}
              </>
            ))}
          </div>
          <p className="text-base/9 mt-6">Maximise your network?</p>
          <Button
            className="btn-lg w-56 px-4 uppercase text-black bg-brand-gold mt-4"
            onClick={() => {
              router.push('/nodes/purchase');
            }}>
            <Trans>GET MORE LICENSES</Trans>
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default memo(MyNodeModal);
