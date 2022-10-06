import React from 'react';
import CloseIcon from 'src/components/icons/CloseIcon';
import CopyLinkIcon from 'src/components/icons/CopyLinkIcon';
import FacebookIcon from 'src/components/icons/FacebookIcon';
import TelegramIcon from 'src/components/icons/TelegramIcon';
import TwitterIcon from 'src/components/icons/TwitterIcon';
import { TwitterShareButton, TelegramShareButton, FacebookShareButton } from 'react-share';
import { copyTextToClipboard } from 'src/utils';
type Props = {
  onCloseModal: any;
};

const ShareMobile = ({ onCloseModal }: Props) => {
  return (
    <div className="relative">
      <div className="bg-base/3 text-base/10 py-6">
        <div
          className="flex items-center p-4"
          onClick={() => {
            copyTextToClipboard(location.href);
            onCloseModal();
          }}>
          <div className="h-6 w-6 mr-5">
            <CopyLinkIcon />
          </div>
          <span className="font-medium text-base">Copy Link</span>
        </div>
        <TwitterShareButton url={window.location.href}>
          <div className="flex items-center p-4">
            <div className="h-6 w-6 mr-5">
              <TwitterIcon />
            </div>
            <span className="font-medium text-base">Share on Twitter</span>
          </div>
        </TwitterShareButton>
        <FacebookShareButton url={window.location.href}>
          <div className="flex items-center p-4">
            <div className="h-6 w-6 mr-5">
              <FacebookIcon />
            </div>
            <span className="font-medium text-base">Share on Facebook</span>
          </div>
        </FacebookShareButton>
        <TelegramShareButton url={window.location.href}>
          <div className="flex items-center p-4">
            <div className="h-6 w-6 mr-5">
              <TelegramIcon />
            </div>
            <span className="font-medium text-base">Share on Telegram</span>
          </div>
        </TelegramShareButton>
      </div>
      <button
        className="absolute right-0 top-5 h-6 w-6 text-base/9 hover:cursor-pointer focus:outline-none"
        onClick={() => onCloseModal()}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default ShareMobile;
function onShowMessageCopied() {
  throw new Error('Function not implemented.');
}
