import { Trans } from '@lingui/macro';
import React from 'react';
import { toast } from 'react-toastify';
import Button from 'src/components/core/Button';
import CloseIcon from 'src/components/icons/CloseIcon';
import InfoIcon from 'src/components/icons/InfoIcon';
import Modal from 'src/components/Modal';
import { useGA4 } from 'src/lib/ga';
import { AllianceName } from 'src/types/sigil';
import { usePickSigilQuery } from './useChooseAllianceQuery';

type Props = {
  open: boolean;
  onClose: () => void;
  onJoinSuccess: () => void;
  sigilName?: string;
  sigilDesc?: JSX.Element | string;
  sigilId?: AllianceName;
  selectModalBgImg?: string;
};

const AllianceModal: React.FC<Props> = ({
  open,
  onClose,
  onJoinSuccess,
  sigilDesc,
  sigilName,
  sigilId,
  selectModalBgImg
}) => {
  const { event } = useGA4();
  const { pickSigilMutation } = usePickSigilQuery({
    onPickSigilSuccess: onJoinSuccess,
    onPickSigilError: () => {
      toast('Sorry, can not join the alliance.', { type: 'error' });
    }
  });
  const { mutate: handleJoin, isLoading } = pickSigilMutation;

  return (
    <Modal
      open={open}
      onOpenChange={onClose}
      overlayClassName="bg-[rgba(5,14,21,0.7)] backdrop-blur-[10px]">
      <Modal.Content includingHeader={false} className="h-[497px] max-w-[616px]">
        <div className="relative h-full overflow-hidden rounded-lg">
          <Modal.Close asChild>
            <button className="absolute top-6 right-6 w-6 text-white">
              <CloseIcon />
            </button>
          </Modal.Close>
          <div
            className={`flex h-full flex-row bg-brand-deep-blue bg-cover`}
            style={{ backgroundImage: `url('${selectModalBgImg}')` }}>
            <div className="flex flex-col items-start justify-between py-12 px-12">
              <div className="flex flex-1 flex-col items-start justify-center">
                <p className="mb-1 text-[14px] font-medium leading-[1.5] text-brand-light-blue">
                  <Trans>You are joining...</Trans>
                </p>
                <p className="mb-6 text-[32px] font-bold leading-[1.2]">{sigilName || ''}</p>
                <p className="mb-6 text-[14px] font-normal leading-[1.5] text-white">{sigilDesc}</p>
                <Button
                  className="btn-md btn-primary uppercase"
                  onClick={() => {
                    sigilId && handleJoin(sigilId);
                    sigilName &&
                      event('Alliance Joined', { campaign: 'Sigil', alliance_name: sigilName });
                  }}
                  loading={isLoading}>
                  <Trans>JOIN {sigilName}</Trans>
                </Button>
              </div>

              <div className="flex flex-col items-start text-[14px] leading-[1.2] text-brand-orange">
                <div className="mb-1 flex items-center space-x-[5px]">
                  <span className="w-4">
                    <InfoIcon />
                  </span>
                  <p className="font-bold">
                    <Trans>Choose Wisely!</Trans>
                  </p>
                </div>
                <p className="mx-auto font-normal">
                  <Trans>
                    This decision is permanent. Once you choose your alliance you cannot change it!
                  </Trans>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default AllianceModal;
