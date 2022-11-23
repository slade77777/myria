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

type Props = {
  onNext: () => void;
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>> | undefined;
  isAirDrop?: boolean;
};

const Welcome: React.FC<Props> = ({ onNext, setCurrentStep, isAirDrop = false }) => {
  const { address, onConnectCompaign, disconnect } = useWalletContext();
  const { connectL2Wallet } = useL2WalletContext();
  const {
    user,
    loginByWalletMutation,
    userCampaign,
    loginCampaignByWalletMutation,
    userProfileQuery,
    nextChooseAlliance
  } = useAuthenticationContext();
  const [walletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');

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
  React.useEffect(() => {
    if (userProfileQuery.isFetching) {
      return;
    }
    if (isAirDrop) {
      if (nextChooseAlliance) {
        onNext();
        return;
      }
      if (setCurrentStep && isAirDrop && userCampaign) {
        // check Selected Alliance from user
        setCurrentStep(3); // set Step to federatiton
        return;
      }
    } else {
      if (user?.user_id) {
        onNext();
        return;
      }
    }
  }, [address, user, onNext, userProfileQuery, nextChooseAlliance]);

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
      return {
        title: t`Welcome to the Myriaverse`,
        message: (
          <span>
            <Trans>
              Which side of the battlelines will you stand on? <br /> Choose your Alliance and claim
              your free Sigil NFT.
            </Trans>
          </span>
        )
      };
    }

    if (isAirDrop) {
      return {
        title: (
          <span>
            {t`Connect to your wallet to`} <br /> {t` enter the Myriaverse`}
          </span>
        )
      };
    }

    return { title: t`Connect to your wallet to enter the Myriaverse` };
  })();

  React.useEffect(() => {
    if (loginByWalletMutation && loginByWalletMutation.isError) {
      disconnect();
    }
  }, [loginByWalletMutation?.isError]);

  const handleClick = async () => {
    try {
      await onConnectCompaign('AirDrop');
      connectL2Wallet();
      event('Connect Wallet Selected', { campaign: 'Sigil' });
      if (isAirDrop) {
        loginCampaignByWalletMutation.mutate();
      } else {
        loginByWalletMutation.mutate();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isLoadingLogin = () => {
    if (isAirDrop) {
      return (
        loginByWalletMutation.isLoading ||
        loginCampaignByWalletMutation.isLoading ||
        (loginCampaignByWalletMutation.isSuccess && !walletAddress) ||
        (!userProfileQuery.data && loginCampaignByWalletMutation.isLoading) ||
        userProfileQuery.isFetching
      );
    } else {
      return loginByWalletMutation.isLoading;
    }
  };

  return (
    <div
      className={
        "relative h-screen min-h-[inherit] bg-[url('/images/nodes/airdrop/background_airdrop.png')] bg-cover bg-bottom bg-no-repeat"
      }>
      <div className="mx-auto max-w-[408px] pt-[213px] text-center">
        <h1 className="text-[28px] font-bold leading-[1.2]">{content.title}</h1>
        {(address || !isSupportedBrowser) && (
          <p className="text-light mt-8 text-[16px] leading-[1.5]">{content.message}</p>
        )}
        {!address && !installedWallet && isSupportedBrowser && (
          <p className="text-light mt-8 text-[16px] leading-[1.5]">
            <Trans>
              Don&apos;t have a wallet yet? <br />
              Install Metamask below.
            </Trans>
          </p>
        )}

        <>
          {installedWallet === true && isSupportedBrowser && (
            <Button
              loading={isLoadingLogin()}
              disabled={isLoadingLogin()}
              onClick={handleClick}
              className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[194px] items-center justify-center p-0">
              {address ? <Trans>LOGGING IN</Trans> : <Trans>CONNECT WALLET</Trans>}
            </Button>
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
          {/* <button
              className="btn-sm btn-secondary mt-4  h-[40px] w-[194px] rounded-lg px-4 py-3"
              onClick={() => {
                login();
                event('Sign In Selected', { campaign: 'Sigil' })
              }}>
              Sign in
            </button> */}
        </>
        {!isSupportedBrowser && (
          <Link href="/">
            <a className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
              <Trans>Go back</Trans>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Welcome;
