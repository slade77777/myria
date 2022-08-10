// Import components
import cn from 'classnames';

// Import Components
// import GasIcon from '../Icons/GasIcon';
// import PlayGameIcon from '../Icons/PlayGameIcon';
// import StakeIcon from '../Icons/StakeIcon';
import { ThreeDotsVerticalIcon, MyriaLogoIcon } from '../Icons';

// Import Redux

type Props = {
  modalShow: Boolean;
  closeModal: any;
};

// const steps = [
//   {
//     icon: <GasIcon className="" size={41} />,
//     title: 'GAS FREE TRANSACTIONS',
//     content:
//       'Vegan PBR&B listicle sriracha. Migas lomo helvetica, listicle paleo salvia sartorial.',
//   },
//   {
//     icon: <StakeIcon className="" size={41} />,
//     title: 'STAKE YOUR MYRIA TOKENS TO EARN',
//     content:
//       'Crucifix dreamcatcher try-hard ugh lyft. Intelligentsia whatever mlkshk salvia.',
//   },
//   {
//     icon: <PlayGameIcon className="" size={41} />,
//     title: 'PLAY AWESOME GAMES',
//     content:
//       'Uuthentic jianbing wolf coloring book echo park fam. Iceland cray occupy ennui, franzen tilde poke.',
//   },
// ];

export default function WelcomeMyriaModal({ modalShow, closeModal }: Props) {
  return (
    <div className={cn(modalShow ? 'block' : 'hidden')}>
      <div className="absolute -bottom-[30px] left-1/2 z-30 h-[20px] w-[20px] rotate-45 border-t border-l border-[#202230] bg-[#081824]" />
      <div className="absolute top-16 right-16 max-h-[80vh] w-[406px] overflow-auto rounded-[20px] border border-[#202230] bg-[#081824] py-6">
        <div className="flex items-center justify-end px-4">
          <ThreeDotsVerticalIcon className="text-[#A1AFBA]" size={32} />
        </div>
        <div className="pt-10">
          <div className="mt-[95px] flex justify-center">
            <MyriaLogoIcon size={102} className="text-white" />
          </div>

          <div className="mt-6 text-center text-[24px] font-bold text-white">
            You’re in!
          </div>

          <div className="mt-6 px-[20px] text-center text-[16px] text-white">
            <p>
              Your Myria wallet is now active. You can now trade NFTs on the
              Myria marketplace.
            </p>
          </div>

          <div className="mt-[182px] flex justify-center px-[32px]">
            <button
              onClick={closeModal}
              className="flex w-full items-center justify-center rounded-[8px] bg-[#F5B941] py-[9px] px-[26px] text-[14px] font-bold uppercase text-[#040B10]"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
