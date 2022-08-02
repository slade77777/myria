import { Trans } from '@lingui/macro';
import MetaMaskOnboarding from '@metamask/onboarding';
import * as React from 'react';
import useInstalledWallet from 'src/hooks/useInstalledWallet';
import MetaMaskIcon from './icons/MetaMaskIcon';

const MetamaskOnboarding: React.FC = ({ children }) => {
  const { installedWallet } = useInstalledWallet();
  const onboarding = React.useRef<MetaMaskOnboarding | null>(null);

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  return (
    <>
      {installedWallet === true && children}
      {installedWallet === false && (
        <a
          className="btn-lg btn-secondary mx-auto flex h-[40px]  w-[194px] items-center justify-center space-x-2 p-0 text-[16px] normal-case"
          onClick={() => {
            if (onboarding.current) {
              onboarding.current.startOnboarding();
            }
          }}>
          <i className="w-6">
            <MetaMaskIcon />
          </i>
          <span>
            <Trans>Install Metamask</Trans>
          </span>
        </a>
      )}
    </>
  );
};

export default MetamaskOnboarding;
