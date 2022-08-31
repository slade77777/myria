import React from 'react';
import { TwitterShareButton, TelegramShareButton, FacebookShareButton } from 'react-share';
import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CloseIcon from './icons/CloseIcon';
import DiscordIcon from './icons/DiscordIcon';
import FacebookIcon from './icons/FacebookIcon';
import TelegramIcon from './icons/TelegramIcon';
import TwitterIcon from './icons/TwitterIcon';
import Modal from './Modal';

import { copyTextToClipboard } from 'src/utils';

type Props = {
  open: boolean;
  onClose: () => void;
  onShowMessageCopied: () => void;
};

const ShareAssetDetailModal: React.FC<Props> = ({ open, onClose, onShowMessageCopied }) => {
  return (
    <Modal open={open}>
      <Modal.Content includingHeader={false}>
        <div className="relative isolate space-y-8 p-6 text-white md:px-[31px] md:pt-8 md:pb-[38px]">
          <div>
            <h1 className="text-2xl font-bold leading-[1.15] text-white">
              <Trans>Share this item</Trans>
            </h1>
            <button
              onClick={onClose}
              className="absolute top-5 right-6 w-[32px] text-white/50 focus:outline-none md:top-6">
              <CloseIcon />
            </button>
          </div>
          <div className="space-y-2">
            <p className=" text-base/9 text-base font-light leading-[150%]">Share Link</p>
            <div className="bg-base/4 flex items-center justify-between rounded-lg py-[13px] pl-[14px] pr-2">
              <p>{location.href}</p>
              <button
                onClick={() => {
                  copyTextToClipboard(location.href);
                  onShowMessageCopied();
                }}
                className="flex-none rounded-lg border border-[rgba(255,255,255,0.4)] px-4 py-[5px] text-center font-bold leading-5 text-white">
                Copy Link
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <p className=" text-base/9 text-base font-light leading-[150%]">Share On</p>
            <div className="flex space-x-6">
              <TwitterShareButton url={window.location.href}>
                <div className="w-10 h-10">
                  <TwitterIcon />
                </div>
              </TwitterShareButton>
              <div className="w-10 h-10">
                <DiscordIcon />
              </div>
              <TelegramShareButton url={window.location.href}>
                <div className="w-10 h-10">
                  <TelegramIcon />
                </div>
              </TelegramShareButton>
              <FacebookShareButton url={window.location.href}>
                <div className="w-10 h-10">
                  <FacebookIcon />
                </div>
              </FacebookShareButton>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ShareAssetDetailModal;
