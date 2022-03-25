import { Trans } from '@lingui/macro';
import Image from 'next/image';
import React from 'react';
import { socialLinks } from 'src/configs';
import { ga } from 'src/lib/ga';
import CloseIcon from './icons/CloseIcon';
import DiscordIcon from './icons/DiscordIcon';
import TwitterIcon from './icons/TwitterIcon';
import Modal from './Modal';

type Props = {
  open: boolean;
  onClose: () => void;
};

const FirstTimeVisitModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal open={open}>
      <Modal.Content includingHeader={false} className="md:w-[576px]">
        <div className="relative isolate p-6 text-white md:px-[31px] md:pt-[34px] md:pb-[38px]">
          <div className="absolute bottom-0 right-[-43px] z-[-1] flex">
            <Image src="/images/character-with-glasses.png" alt="" width={331} height={331} />
          </div>
          <button
            onClick={onClose}
            className="absolute top-5 right-6 w-[32px] text-white/50 focus:outline-none md:top-3">
            <CloseIcon />
          </button>
          <h1 className="text-[24px] font-extrabold leading-[1.15] md:text-[32px]">
            Join our community!
          </h1>
          <p className="mt-5 text-[18px] leading-[1.5] text-light md:max-w-[295px]">
            Stay update to date with our project announcements and updates!
          </p>
          <div className="mt-[30px] md:mt-8">
            <a
              href='https://discord.gg/u5UaRHnHHP'
              onClick={() => {
                ga.event('Click', {
                  event_category: 'Button',
                  event_label: 'Discord Link',
                  value: 'Pop-up'
                })
              }}
              target="_blank"
              className="btn-icon inline-flex w-full items-center justify-center bg-white px-3 text-dark md:w-[251px]"
              rel="noreferrer">
              <span className="w-[30px]">
                <DiscordIcon />
              </span>
              <span className="ml-2">
                <Trans>JOIN DISCORD</Trans>
              </span>
            </a>
          </div>
          <div className="mt-4">
            <a
              href={socialLinks.twitter}
              target="_blank"
              className="btn-icon inline-flex w-full items-center justify-center bg-brand-light-blue px-3 text-dark md:w-[251px]"
              rel="noreferrer">
              <span className="w-[30px]">
                <TwitterIcon />
              </span>
              <span className="ml-2">
                <Trans>FOLLOW US ON TWITTER</Trans>
              </span>
            </a>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default FirstTimeVisitModal;
