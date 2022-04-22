import Image from 'next/image';
import React, { useState } from 'react';
import LinkIcon from 'src/components/icons/LinkIcon';
import TwitterIcon from 'src/components/icons/TwitterIcon';
import Modal from 'src/components/Modal';

const ShareTwitter: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal open={show} onOpenChange={() => setShow(false)}>
        <Modal.Content title="Share this on Twitter">
          <div className="p-8">
            <div
              style={{
                boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
              }}
              className="overflow-hidden rounded-b-2xl">
              <div>
                <Image
                  src="/images/nodes/dashboard/myria_op.png"
                  width={1534}
                  height={803}
                  layout="responsive"
                  alt=""
                />
              </div>
              <div className="space-y-1 p-4 text-[16px] leading-[1.47]">
                <p className="font-medium">MYRIA Founders Nodes</p>
                <p className="text-light">
                  I am now a $MYRIA node owner! Join us to earn rewards, govern and build the future
                  of virtual worlds! @MyriaGames
                </p>
                <p className="flex items-center space-x-1 text-light">
                  <span className="w-[16px] text-light">
                    <LinkIcon />
                  </span>
                  <span>myria.com</span>
                </p>
              </div>
            </div>
            <button className="btn-lg btn-primary mt-4 w-full">Share now</button>
          </div>
        </Modal.Content>
      </Modal>
      <button
        onClick={() => setShow(true)}
        className="flex w-full items-stretch space-x-0.5 overflow-hidden rounded-lg">
        <div className="flex items-center justify-center bg-brand-deep-blue px-6 py-4">
          <span className="w-[32px] text-white">
            <TwitterIcon />
          </span>
        </div>
        <p className="flex flex-grow items-center justify-center bg-brand-deep-blue text-[20px] leading-[1.15]">
          Share this on Twitter
        </p>
      </button>
    </>
  );
};

export default ShareTwitter;
