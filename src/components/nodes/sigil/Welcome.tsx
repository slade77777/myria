import React from 'react';
import { useWalletContext } from 'src/context/wallet';
import { useAuthenticationContext } from 'src/context/authentication';
import MetaMaskIcon from 'src/components/icons/MetaMaskIcon';
import { soundService, SUPPORT_SOUND } from 'src/sound';

type Props = {
  onNext: () => void;
};

const Welcome: React.FC<Props> = ({ onNext }) => {
  const { address, onConnect } = useWalletContext();
  const { login } = useAuthenticationContext();

  const installedWallet = typeof window != 'undefined' && !!window.ethereum;

  React.useEffect(() => {
    const bgSound = soundService.playSound(SUPPORT_SOUND.SIGIL_DASHBOARD_BG);

    return () => {
      bgSound.pause();
    }
  }, []);

  return (
    <div
      className={
        "relative h-screen min-h-[791px] bg-[url('/images/nodes/sigil/header-bg.png')] bg-cover bg-center bg-no-repeat"
      }>
      <div className="mx-auto max-w-[408px] pt-[213px] text-center">
        <h1 className="text-[28px] font-bold leading-[1.2]">Welcome to the Myriaverse</h1>
        <p className="mt-8 text-[16px] leading-[1.5] text-light">
          Shoreditch hell of viral, blog echo park flexitarian tbh seitan cronut taxidermy
          mumblecore hot chicken.
        </p>
        {address ? (
          <>
            <button
              onClick={onNext}
              className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
              JOIN NOW
            </button>
            <button
              className="btn-sm btn-secondary mt-4 min-w-[171px] rounded-lg px-4 py-3"
              onClick={login}>
              Sign in
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onConnect}
              className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[194px] items-center justify-center p-0">
              CONNECT WALLET
            </button>
            {!installedWallet && (
              <a
                href="https://metamask.io/"
                target="_blank"
                className="btn-lg btn-secondary mx-auto mt-4 flex h-[40px]  w-[194px] items-center justify-center space-x-2 p-0 text-[16px] normal-case"
                rel="noreferrer">
                <i className="w-6">
                  <MetaMaskIcon />
                </i>
                <span>Install Metamask</span>
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
