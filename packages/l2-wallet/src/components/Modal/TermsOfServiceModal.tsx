import React, { useState } from 'react';
import cn from 'classnames';
import Modal from '.';
import Checkbox from '../Checkbox';
// import CreateMyriaWalletModal from './CreateMyriaWalletModal';

type Props = {
  modalShow: Boolean;
  onAccept: () => void;
  closeModal: any;
};

export default function TermsOfServiceModal({
  modalShow,
  closeModal,
  onAccept,
}: Props) {
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
          title="Terms of Service"
          width="576px"
        >
          <div>
            <div className="h-[323px] mt-[59px] overflow-y-auto ">
              {/* <div className="text-black font-bold text-[24px] text-center">
                Terms of Service
              </div> */}
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
                txtClassName="text-white"
                handleChange={handleChange}
              />
            </div>
            <div className="flex justify-end mt-[54px]">
              <button
                disabled={!read}
                onClick={onAccept}
                className={cn(
                  'w-[194px] h-[48px] flex justify-center items-center text-[16px] font-bold rounded-[8px]',
                  read
                    ? 'bg-primary6 text-black'
                    : 'bg-[#4B5563] text-[#9CA3AF]',
                )}
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
