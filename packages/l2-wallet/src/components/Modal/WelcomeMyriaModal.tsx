// Import components
import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

// Import Components
// import GasIcon from '../Icons/GasIcon';
// import PlayGameIcon from '../Icons/PlayGameIcon';
// import StakeIcon from '../Icons/StakeIcon';
import { ThreeDotsVerticalIcon, MyriaLogoIcon } from '../Icons';

// Import Redux
import { RootState } from '../../app/store';

type Props = {
  modalShow: Boolean;
  closeModal: any;
  makeDepositHandler: any;
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

export default function WelcomeMyriaModal({
  modalShow,
  closeModal,
  makeDepositHandler,
}: Props) {
  const account = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );
  return (
    <div
      className={cn(
        'absolute top-[100px] right-[21px] bg-[#081824] w-[406px] border border-[#202230] rounded-[20px] py-6',
        modalShow ? 'block' : 'hidden',
      )}
    >
      <div className="flex justify-end items-center px-4">
        <div className="text-[#A1AFBA] text-[14px] mr-1">
          {account.substring(0, 4) +
            '...' +
            account.substring(account.length - 4, account.length)}
        </div>
        <ThreeDotsVerticalIcon className="text-[#A1AFBA]" size={32} />
      </div>

      <div className="relative w-[20px] h-[20px]">
        <div className="w-[20px] h-[20px] bg-[#081824] rotate-45 absolute top-[-66px] left-[250px] border-t border-l border-[#202230]" />
      </div>

      <div>
        <div className="flex justify-center mt-[47px]">
          <MyriaLogoIcon size={102} className="text-white" />
        </div>

        <div className="text-white text-center text-[24px] font-bold mt-6">
          You’re in!
        </div>

        <div className="text-[#A1AFBA] text-[14px] px-[20px] mt-6 text-center">
          <p>
            Your Myria wallet is now active. You can now trade NFTs on the Myria
            marketplace.
          </p>
        </div>

        <div className="flex justify-center px-[32px] mt-[182px]">
          <button
            onClick={makeDepositHandler}
            className="py-[9px] w-full px-[26px] flex justify-center items-center text-[#040B10] text-[14px] font-bold bg-[#F5B941] rounded-[8px] uppercase"
          >
            Make a deposit
          </button>
        </div>
      </div>
    </div>
  );
}
