import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CloseIcon from 'src/components/icons/CloseIcon';
import Modal from 'src/components/Modal';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import { useGA4 } from 'src/lib/ga';
import { forceGAStringParam } from 'src/lib/ga/use-ga/event';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { hexifyKey } from 'src/utils';
import Button from '../core/Button';
import CircleCheckIcon from '../icons/CircleCheckIcon';
import LoaderIcon from '../icons/LoaderIcon';
import { useInventoryQuery } from './useInventoryQuery';

const ReadyToMint: React.FC<{ onMintSuccess: () => void }> = ({ onMintSuccess }) => {
  const { mintRewardMutation } = useInventoryQuery();
  const mintReward = () => {
    return mintRewardMutation.mutate(undefined, {
      onSuccess: onMintSuccess,
      onError: (err: any) => {
        toast(err.message, { type: 'error' });
      }
    });
  };

  return (
    <div className="mt-[95px] flex h-full flex-col items-center">
      {mintRewardMutation.isError ? (
        <img src="/images/inventory/fail.svg" alt="" width={64} height={64} />
      ) : (
        <img src="/images/inventory/myria.svg" alt="" width={82} height={32} />
      )}
      <h1 className="mt-6 text-2xl font-bold">
        {mintRewardMutation.isError ? (
          <Trans>Sorry, minting failed</Trans>
        ) : (
          <Trans>Ready to mint</Trans>
        )}
      </h1>
      <p className="mt-6 max-w-[314px] text-center">
        {mintRewardMutation.isError ? (
          <Trans>We couldn’t mint your NFTs due to an error. Please try again.</Trans>
        ) : (
          <Trans>Your Myria wallet is now active. Click below to mint your rewards.</Trans>
        )}
      </p>
      <Button
        onClick={mintReward}
        disabled={mintRewardMutation.isLoading}
        className={clsx('btn-sm btn-primary mt-[182px] h-10 w-full !p-0', {
          'bg-gray-400 text-center text-gray-600 hover:bg-gray-400 hover:text-center hover:text-gray-600':
            mintRewardMutation.isLoading,
          '!mt-[150px]': mintRewardMutation.isError
        })}>
        {mintRewardMutation.isLoading && <LoaderIcon className="mr-2" />}
        <span className="!m-0 text-sm">
          {mintRewardMutation.isError ? <Trans>TRY AGAIN</Trans> : <Trans>MINT NOW</Trans>}
        </span>
      </Button>
    </div>
  );
};

const MintComplete: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <div className="mt-[40px] flex h-full flex-col items-center">
      <div className="!text-success/8">
        <CircleCheckIcon className="h-12 w-12 " />
      </div>
      <h1 className="mt-6 text-2xl font-bold">
        <Trans>Minting complete!</Trans>
      </h1>
      <p className="text-base/9 mt-6 max-w-[327px] text-center">
        <Trans>
          Your rewards have been minted and are now in your Myria L2 Wallet. Click below to view
          your items in your Myria inventory
        </Trans>
      </p>
      <Button className="btn-sm btn-primary mt-[182px] h-10 w-full !p-0" onClick={onContinue}>
        <span className="!m-0 text-sm">
          <Trans>Continue</Trans>
        </span>
      </Button>
    </div>
  );
};

const MintRewardModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isMintSuccess, setIsMintSuccess] = React.useState<boolean>(false);
  const router = useRouter();
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const { address } = useWalletContext();
  const { user } = useAuthenticationContext();
  const { event } = useGA4();

  const onCompleteMint = () => {
    onClose();
    event('Minting Completed', {
      campaign: 'Sigil Minting',
      wallet_address: forceGAStringParam(address),
      l2_wallet_address: forceGAStringParam(hexifyKey(starkKeyUser)),
      myria_username: user?.user_name || '',
      myria_id: user?.user_id || '',
      user_email: user?.email || ''
    });
    router.push('/marketplace/inventory/');
  };

  const handleStartMintClick = () => {
    setIsMintSuccess(true);
    event('Mint Now Selected', {
      campaign: 'Sigil Minting',
      wallet_address: forceGAStringParam(address),
      l2_wallet_address: forceGAStringParam(hexifyKey(starkKeyUser)),
      myria_username: user?.user_name || '',
      myria_id: user?.user_id || '',
      user_email: user?.email || ''
    });
  };
  return (
    <Modal open overlayClassName="bg-[rgba(5,14,21,0.7)]">
      <Modal.Content
        includingHeader={false}
        className="absolute top-20 right-6 h-[565px] max-w-[406px]">
        <div className="relative h-full overflow-hidden rounded-lg py-6 px-6">
          <Modal.Close asChild className="flex justify-end">
            <button className="mr-0 ml-auto h-8 w-8 text-white" onClick={onClose}>
              <CloseIcon />
            </button>
          </Modal.Close>
          <div className={`bg-brand-deep-blue mt-6 h-full`}>
            {!isMintSuccess ? (
              <ReadyToMint onMintSuccess={handleStartMintClick} />
            ) : (
              <MintComplete onContinue={onCompleteMint} />
            )}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default MintRewardModal;
