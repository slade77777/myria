import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  keyDerivation,
  // @ts-ignore
} from '@starkware-industries/starkware-crypto-utils';
import { setStarkPublicKey } from '../../app/slices/accountSlice';

// Import Components
import Modal from '.';
import { RootState } from '../../app/store';

type Props = {
  modalShow: Boolean;
  closeModal: any;
  className?: string;
};

const steps = [
  {
    id: 1,
    title: 'Get exclusive rewards',
    description:
      'Vegan PBR&B listicle sriracha. Migas lomo helvetica, listicle paleo salvia sartorial.',
  },
  {
    id: 2,
    title: 'Be the first to play our new games',
    description:
      'Intelligentsia whatever mlkshk salvia, authentic jianbing wolf coloring book echo park fam.',
  },
  {
    id: 3,
    title: 'Stay up to date',
    description:
      'Migas lomo helvetica, listicle paleo salvia sartorial crucifix dream catcher try-hard ugh lyft.',
  },
];

declare let window: any;

export default function CreateMyriaAccountModal({
  modalShow,
  closeModal,
  className,
}: Props) {
  const dispatch = useDispatch();

  const account = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );

  const registerAccount = () => {
    onRequestSignature();
  };

  const onRequestSignature = async () => {
    if (!account) {
      console.error('Please connect wallet first.');
      return;
    }
    const message = 'Message request signature: ';
    const fromWalletAddress = account;
    if (window.web3) {
      const wSignature = await window.web3.eth.personal.sign(
        message,
        fromWalletAddress,
      );

      const privateKeyFromSignature =
        keyDerivation.getPrivateKeyFromEthSignature(wSignature);
      const starkPublicKeyFromPrivateKey = keyDerivation.privateToStarkKey(
        privateKeyFromSignature,
      );

      dispatch(setStarkPublicKey(starkPublicKeyFromPrivateKey));
    }
  };
  return (
    <div>
      {modalShow && (
        <Modal
          closeModal={() => closeModal()}
          title="Create a Myria Account"
          className={cn('max-w-[576px]', className)}
          width="576px"
          cannotCloseFromOutside
        >
          <div>
            <div className="mt-[59px]">
              <div className="mt-2 text-[14px]">
                Vegan PBR&B listicle sriracha. Migas lomo helvetica, listicle
                paleo salvia sartorial crucifix dreamcatcher try-hard ugh lyft.
                Intelligentsia whatever salvia, authentic jianbing wolf coloring
                book echo park fam.
              </div>
              <div className="mt-[44px]">
                {steps.map((item: any, index: number) => (
                  <div
                    key={`${index}${JSON.stringify(item)}`}
                    className="mt-[16px] flex"
                  >
                    <div className="mr-4 flex h-[40px] w-[40px] flex-none items-center justify-center rounded-full bg-[#C4C4C4] text-[14px] font-bold text-white">
                      {item.id}
                    </div>
                    <div>
                      <div className="text-[14px] font-bold">{item.title}</div>
                      <div className="mt-2 text-[14px]">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-[80px] flex justify-between">
              <div className="flex h-[48px] w-[194px] cursor-pointer items-center justify-center text-[16px] text-[#777777]">
                I’LL DO THIS LATER
              </div>
              <button
                onClick={() => {
                  registerAccount();
                }}
                className="flex h-[48px] w-[194px] items-center justify-center rounded-[8px] bg-[#737373] text-[16px] font-bold text-white"
              >
                REGISTER
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

CreateMyriaAccountModal.defaultProps = {
  className: '',
};
