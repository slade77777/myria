import React from 'react';
import CloseIcon from 'src/components/icons/CloseIcon';
import InfoIcon from 'src/components/icons/InfoIcon';
import Modal from 'src/components/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onJoin: () => void;
  sigilName?: string;
  sigilDesc?: string;
  sigilId?: string;
};

const AllianceModal: React.FC<Props> = ({ open, onClose, onJoin, sigilDesc, sigilName, sigilId }) => {
  const backgroundImg = React.useMemo(() => {
    if (sigilId === 'a') {
      return "bg-[url('/images/nodes/insignia/sigilA_modal_bg.png')]";
    } else if (sigilId === 'b') {
      return "bg-[url('/images/nodes/insignia/sigilB_modal_bg.png')]";
    } else {
      return "bg-[url('/images/nodes/insignia/sigilC_modal_bg.png')]";
    }
  }, [sigilId]);

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
          <div className={`flex h-full flex-row bg-brand-deep-blue ${backgroundImg} bg-cover`}>
            <div className="flex flex-col items-start justify-between py-12 px-12">
              <div className='flex flex-1 flex-col items-start justify-center'>
                <p className="mb-1 text-[14px] font-medium leading-[1.5] text-brand-light-blue">
                  You are joining...
                </p>
                <p className="mb-6 text-[32px] font-bold leading-[1.2]">{sigilName || ''}</p>
                <p className="mb-6 text-[14px] font-normal leading-[1.5] text-white">
                  {sigilDesc}
                </p>
                <button className="btn-md btn-primary uppercase" onClick={onJoin}>
                  JOIN the {sigilName}
                </button>
              </div>

              <div className="flex flex-col items-start text-[14px] leading-[1.2] text-brand-orange">
                <div className="mb-1 flex items-center space-x-[5px]">
                  <span className="w-4">
                    <InfoIcon />
                  </span>
                  <p className="font-bold">Choose Wisely!</p>
                </div>
                <p className="mx-auto font-normal">
                  This decision is permanent. Once you choose your alliance you cannot change it!
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
