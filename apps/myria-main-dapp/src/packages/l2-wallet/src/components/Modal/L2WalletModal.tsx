import React, { useState } from 'react';
import Link from 'next/link';

import Modal from '.';
import Checkbox from '../Checkbox';

type Props = {
  modalShow: Boolean;
  closeModal: any;
};

export default function DepositWalletModal({ modalShow, closeModal }: Props) {
  const [read, setIsRead] = useState<Boolean>(false);
  const handleChange = (param: Boolean) => {
    setIsRead(param);
  };

  return (
    <div>
      {modalShow && (
        <Modal
          closeModal={() => closeModal()}
          className="max-w-[576px] px-[40px] pt-[37px] pb-[32px]"
          width="576px"
        >
          <div>
            <div className="mt-[59px] h-[323px] overflow-y-auto ">
              <Link href="/terms-conditions">
                <div className="text-center text-[24px] font-bold text-black">
                  Terms of Service
                </div>
              </Link>
              <div className="mt-[39px] text-[12px] leading-[18px]">
                <p>
                  Vegan PBR&B listicle sriracha. Migas lomo helvetica, listicle
                  paleo salvia sartorial crucifix dreamcatcher try-hard ugh
                  lyft. Intelligentsia whatever mlkshk salvia, authentic
                  jianbing wolf coloring book echo park fam. Iceland cray occupy
                  ennui, franzen tilde poke. Poutine echo park meditation cliche
                  franzen, shaman messenger bag. Hot chicken umami adaptogen DIY
                  yuccie whatever subway tile, narwhal helvetica meggings
                  scenester twee iPhone tumblr lumbersexual.
                </p>
                <p className="mt-4">
                  Meditation ramps offal direct trade raclette disrupt vice.
                  Neutra kogi mixtape 3 wolf moon. Organic mustache chia vape,
                  la croix austin man bun small batch meh bushwick locavore.
                  Biodiesel shabby chic butcher franzen pork belly microdosing,
                  tattooed chambray twee meditation offal YOLO pour-over.
                </p>
                <p className="mt-4">
                  Leggings swag synth 8-bit master cleanse. Pitchfork affogato
                  semiotics raclette, adaptogen post-ironic cliche meggings
                  tousled paleo 90&lsquo;s next level.
                </p>
              </div>
            </div>
            <div>
              <Checkbox
                label="I have read, understood and agree to the terms of service"
                className="mt-[59px]"
                handleChange={handleChange}
              />
            </div>
            <div className="mt-[54px] flex justify-end">
              <button
                disabled={!read}
                onClick={() => {
                  closeModal();
                }}
                className="flex h-[48px] w-[194px] items-center justify-center rounded-[8px] bg-[#737373] text-[16px] font-bold text-white"
              >
                ACCEPT
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
