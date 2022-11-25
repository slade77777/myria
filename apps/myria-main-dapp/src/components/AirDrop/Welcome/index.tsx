import React, { useEffect, useState } from 'react';
import { useWalletContext } from 'src/context/wallet';
import { useAuthenticationContext } from 'src/context/authentication';
import MetaMaskIcon from 'src/components/icons/MetaMaskIcon';
import { useGA4 } from 'src/lib/ga';
import Button from 'src/components/core/Button';
import * as env from 'detect-browser';
import Link from 'next/link';
import { t, Trans } from '@lingui/macro';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { Step } from 'src/pages/airdrop';
import { callCampaignHealthCheck } from 'src/services/campaignService';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import LeftSectionWelcome from './LeftSectionWelcome';
import RightSectionWelcome from './RightSectionWelcome';
import clsx from 'clsx';

type Props = {
  onNext: () => void;
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>> | undefined;
  isAirDrop?: boolean;
};

const Welcome: React.FC<Props> = ({ onNext, setCurrentStep }) => {
  const { address } = useWalletContext();

  const { event } = useGA4();
  const [isSupportedBrowser, setIsSupportedBrowser] = React.useState<boolean>(true);
  const [installedWallet, setInstalledWallet] = useState<'PENDING' | boolean>('PENDING');
  const onboarding = React.useRef<MetaMaskOnboarding | null>(null);

  useEffect(() => {
    if (!!window.ethereum) {
      setInstalledWallet(true);
    } else {
      setInstalledWallet(false);
    }
  }, []);

  useEffect(() => {
    callCampaignHealthCheck()
      .then((statusResponse) => {
        console.log('Campaign status', statusResponse);
      })
      .catch((error) => {
        console.log(`Server is unavailable with error ${error}`);
      });
  }, []);

  // try to login via wallet
  // React.useEffect(() => {
  //     if (userProfileQuery.isFetching) {
  //         return;
  //     }
  //     if (isAirDrop) {
  //         if (nextChooseAlliance) {
  //             onNext();
  //             return;
  //         }
  //         if (setCurrentStep && isAirDrop && userCampaign && checkedInput) {
  //             // check Selected Alliance from user
  //             setCurrentStep(2); // set Step to federatiton
  //             return;
  //         }
  //     } else {
  //         if (user?.user_id) {
  //             onNext();
  //             return;
  //         }
  //     }
  // }, [address, user, onNext, userProfileQuery, nextChooseAlliance]);

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }

    const { navigator } = window;
    const browser = env.detect();
    async function checkBrowser() {
      // @ts-ignore
      const isBraveBrowser = (navigator.brave && (await navigator.brave.isBrave())) || false;
      setIsSupportedBrowser(
        Boolean(browser) &&
          (browser?.name === 'chrome' ||
            browser?.name === 'edge-chromium' ||
            browser?.name === 'edge' ||
            browser?.name === 'firefox' ||
            isBraveBrowser)
      );
    }

    checkBrowser();
  }, []);

  const content = (() => {
    if (!isSupportedBrowser) {
      return {
        title: t`Unsupported Browser`,
        message: t`Please view this experience on a supported browser like Chrome, Brave, Firefox or Edge`
      };
    }

    if (address) {
      return;
    } else if (!installedWallet) {
      return {
        title: t`Metamask wallet required`,
        message: (
          <span>
            <Trans>
              You need to have Metamask installed to continue,
              <br /> install it by clicking below
            </Trans>
          </span>
        )
      };
    }
  })();

  return (
    <div
      className={
        "relative h-screen min-h-[inherit] bg-[url('/images/nodes/airdrop/background_airdrop.png')] bg-cover bg-bottom bg-no-repeat"
      }>
      {content ? (
        <div className="mx-auto flex h-[50vh] max-w-[408px] flex-col justify-end pt-20 text-center">
          {content && <h1 className="text-[28px] font-bold leading-[1.2]">{content.title}</h1>}
          {(address || !isSupportedBrowser) && content && (
            <p className="text-light mt-8 text-[16px] leading-[1.5]">{content.message}</p>
          )}
          {!address && !installedWallet && isSupportedBrowser && (
            <p className="text-light mt-8 text-[16px] leading-[1.5]">
              <Trans>
                You need to have Metamask installed to continue,
                <br />
                install it by clicking below
              </Trans>
            </p>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-[1110px] px-6">
          <div className="m-auto flex h-[100vh] items-center justify-between">
            <LeftSectionWelcome
              address={address || ''}
              installedWallet={installedWallet}
              isSupportedBrowser={isSupportedBrowser}
              onNext={onNext}
              setCurrentStep={setCurrentStep}
            />
            <RightSectionWelcome />
          </div>
        </div>
      )}
      {installedWallet === false && isSupportedBrowser && (
        <a
          className="btn-lg btn-secondary mx-auto mt-10 flex h-[40px]  w-[194px] items-center justify-center space-x-2 p-0 text-[16px] normal-case"
          onClick={() => {
            if (onboarding.current) {
              onboarding.current.startOnboarding();
            }
            event('Install Metamask Clicked', {});
          }}>
          <i className="w-6">
            <MetaMaskIcon />
          </i>
          <span>
            <Trans>Install Metamask</Trans>
          </span>
        </a>
      )}
      {!isSupportedBrowser && (
        <Link href="/">
          <a className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
            <Trans>Go back</Trans>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Welcome;
