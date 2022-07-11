import React, { useState } from 'react';
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
          className="max-w-[576px] pt-[37px] pb-[32px] px-[40px]"
          width="576px"
        >
          <div>
            <div className="h-[323px] mt-[59px] overflow-y-auto ">
              <div className="text-black font-bold text-[24px] text-center">
                Terms of Service
              </div>
              <div className="text-[12px] leading-[18px] mt-[39px]">
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
            <div className="flex justify-end mt-[54px]">
              <button
                disabled={!read}
                onClick={() => {
                  closeModal();
                }}
                className="w-[194px] h-[48px] flex justify-center items-center text-white text-[16px] font-bold bg-[#737373] rounded-[8px]"
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
