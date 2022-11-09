import React, { FC, memo, useMemo } from 'react';
import useUserNodes from '../../hooks/useUserNodes';
import Modal from '../Modal';
import TreeIcon from '../icons/TreeIcon';
import { Trans } from '@lingui/macro';
import Button from '../core/Button';
import { useRouter } from 'next/router';
import useNodeLicense from '../../hooks/useNodeLicense';

const MyNodeModal: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const router = useRouter();
  const { data } = useNodeLicense();

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content
        title="Purchased Node Licenses"
        className="z-20 shadow-[0_0_40px_10px_#0000004D]">
        <div className="p-8">
          <p className="text-base/9">You have {data?.length || 0} Founder’s Node Licenses</p>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {data?.map((node) => (
              <div key={node.nodeId} className="mt-2 flex flex-row items-center gap-4">
                <TreeIcon fill="#81CA95" width={20} height={20} />
                <span>{node.nodeId}</span>
              </div>
            ))}
          </div>
          <p className="text-base/9 mt-6">Maximise your network?</p>
          <Button
            className="btn-lg bg-brand-gold mt-4 w-56 px-4 uppercase text-black"
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
