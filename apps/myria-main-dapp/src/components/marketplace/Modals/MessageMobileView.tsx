import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
import Modal from 'src/components/Modal';
interface IProp {
  isShow: boolean;
  handleClose?: () => void;
}

const MessageMobileView: React.FC<IProp> = ({ isShow, handleClose }) => {
  return (
    <Modal open={isShow} onOpenChange={handleClose}>
      <Modal.Content
        title={'Notification'}
        titleClassName="text-[22px] flex item-center"
        className="mt-0 shadow-[0_0_40px_10px_#0000004D]"
        isIcon>
        <div className="p-8 text-white pt-6">
          Sorry, mobile is not currently supported. Visit us on your desktop browser.
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default MessageMobileView;
