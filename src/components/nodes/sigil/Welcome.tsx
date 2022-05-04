import React from 'react';
import { useWalletContext } from 'src/context/wallet';
import { useAuthenticationContext } from 'src/context/authentication';
import MetaMaskIcon from 'src/components/icons/MetaMaskIcon';
import { useGA4 } from 'src/lib/ga';
import Button from 'src/components/core/Button';

type Props = {
  onNext: () => void;
};

const Welcome: React.FC<Props> = ({ onNext }) => {
  const { address, onConnect } = useWalletContext();
  const { login, registerByWalletMutation } = useAuthenticationContext();
  const { event } = useGA4();

  const installedWallet = typeof window != 'undefined' && !!window.ethereum;

  const handleRegisterByWallet = async () => {
    await registerByWalletMutation.mutateAsync();
    onNext();
  }

  return (
    <div
      className={
        "relative h-screen bg-[url('/images/nodes/sigil/header-bg.jpeg')] bg-cover bg-bottom bg-no-repeat"
      }>
      <div className="mx-auto max-w-[408px] pt-[213px] text-center">
        <h1 className="text-[28px] font-bold leading-[1.2]">
          {address ? 'Welcome to the Myriaverse' : 'Connect to your wallet to enter the Myriaverse'}
        </h1>
        {address && (
          <p className="mt-8 text-[16px] leading-[1.5] text-light">
            Which side of the battlelines will you stand on? <br /> Choose your Alliance and claim
            your free Sigil NFT.
          </p>
        )}
        {!address && !installedWallet && (
          <p className="mt-8 text-[16px] leading-[1.5] text-light">
            Don&apos;t have a wallet yet? <br />
            Install Metamask below.
          </p>
        )}
        {address ? (
          <>
            <Button
              loading={registerByWalletMutation.isLoading}
              onClick={() => {
                handleRegisterByWallet();
                event('Join Now Selected', { campaign: 'Sigil' })
              }}
              className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
              JOIN NOW
            </Button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                onConnect();
                event('Connect Wallet Selected', { campaign: 'Sigil' })
              }}
              className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[194px] items-center justify-center p-0">
              CONNECT WALLET
            </button>
            {!installedWallet && (
              <a
                href="https://metamask.io/"
                target="_blank"
                className="btn-lg btn-secondary mx-auto mt-4 flex h-[40px]  w-[194px] items-center justify-center space-x-2 p-0 text-[16px] normal-case"
                rel="noreferrer"
                onClick={() => {
                  event('Install Metamask Clicked', {})
                }}
              >
                <i className="w-6">
                  <MetaMaskIcon />
                </i>
                <span>Install Metamask</span>
              </a>
            )}
            <button
              className="btn-sm btn-secondary mt-4  h-[40px] w-[194px] rounded-lg px-4 py-3"
              onClick={() => {
                login();
                event('Sign In Selected', { campaign: 'Sigil' })
              }}>
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
