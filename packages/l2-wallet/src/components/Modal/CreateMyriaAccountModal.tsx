import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  keyDerivation,
  // @ts-ignore
} from '@starkware-industries/starkware-crypto-utils';
import {
  setStarkPublicKey,
} from '../../app/slices/accountSlice';

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

      // const client: IMyriaClient = {
      //   provider: window.web3.currentProvider,
      //   networkId: 5,
      //   web3: window.web3,
      // };

      // const myriaClient = new MyriaClient(client);

      const privateKeyFromSignature =
        keyDerivation.getPrivateKeyFromEthSignature(wSignature);
      const starkPublicKeyFromPrivateKey = keyDerivation.privateToStarkKey(
        privateKeyFromSignature,
      );

      dispatch(setStarkPublicKey(starkPublicKeyFromPrivateKey));

      // const msgHashData = pedersen([
      //   privateKeyFromSignature,
      //   starkPublicKeyFromPrivateKey,
      // ]);

      // const keyPair = ec.keyFromPrivate(privateKeyFromSignature, 'hex');

      // const msgStarkSignature = sign(keyPair, msgHashData);

      // const keyPairPub = ec.keyFromPublic(keyPair.getPublic(), 'BN');

      // const verifyStarkSignature = verify(
      //   keyPairPub,
      //   msgHashData.toString(),
      //   msgStarkSignature,
      // );
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
              <div className="text-[14px] mt-2">
                Vegan PBR&B listicle sriracha. Migas lomo helvetica, listicle
                paleo salvia sartorial crucifix dreamcatcher try-hard ugh lyft.
                Intelligentsia whatever salvia, authentic jianbing wolf coloring
                book echo park fam.
              </div>
              <div className="mt-[44px]">
                {steps.map((item: any, index: number) => (
                  <div className="flex mt-[16px]">
                    <div className="w-[40px] flex-none h-[40px] bg-[#C4C4C4] flex justify-center items-center rounded-full font-bold text-[14px] text-white mr-4">
                      {item.id}
                    </div>
                    <div>
                      <div className="font-bold text-[14px]">{item.title}</div>
                      <div className="text-[14px] mt-2">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-[80px]">
              <div className="w-[194px] h-[48px] items-center flex justify-center text-[#777777] text-[16px] cursor-pointer">
                I’LL DO THIS LATER
              </div>
              <button
                onClick={() => {
                  registerAccount();
                }}
                className="w-[194px] h-[48px] flex justify-center items-center text-white text-[16px] font-bold bg-[#737373] rounded-[8px]"
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
