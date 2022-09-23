import { Trans } from '@lingui/macro';
import React from 'react';
import Countdown from 'react-countdown';
import { useGA4 } from 'src/lib/ga';
import CloseIcon from './icons/CloseIcon';
import Modal from './Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  successClose: () => void;
  cancel: () => void;
};

const COUNT_SECONDS = 1000 * 60 * 5;

const SessionTimeoutCountModal: React.FC<Props> = ({ open, onClose, successClose, cancel }) => {
  const { event } = useGA4();

  const renderer = (props: any) => {
    if (props.completed) {
      successClose();
      return <div>0</div>;
    } else {
      // Render a countdown
      return (
        <span>
          {props.hours}:{props.minutes}:{props.seconds}
        </span>
      );
    }
  };

  return (
    <Modal open={open}>
      <Modal.Content includingHeader={false}>
        <div className="relative isolate space-y-4 p-6 text-white md:px-[31px] md:pt-6 md:pb-[38px]">
          <button
            onClick={cancel}
            className="absolute top-5 right-6 w-[32px] text-white/50 focus:outline-none md:top-6">
            <CloseIcon />
          </button>
          <h1 className="font-bold leading-[1.15] md:text-[24px]">
            <Trans>Session timeout in 5 minutes</Trans>
          </h1>
          <p className="text-base/9 text-sm leading-[150%]">
            You are about to be logged out because you have been inactive for more than 20 minutes.
          </p>
          <button
            onClick={cancel}
            className="bg-brand-gold text-base/1 mt-4 w-full rounded-lg py-3 text-center font-bold uppercase leading-6">
            I AM STILL HERE
          </button>
          <div className="hidden">
            <Countdown date={Date.now() + COUNT_SECONDS} renderer={renderer} />
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default SessionTimeoutCountModal;
