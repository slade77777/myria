import React, { useEffect, useState } from 'react';
import { useWalletContext } from 'src/context/wallet';
import { useAuthenticationContext } from 'src/context/authentication';
import MetaMaskIcon from 'src/components/icons/MetaMaskIcon';
import { useGA4 } from 'src/lib/ga';
import Button from 'src/components/core/Button';
import * as env from 'detect-browser';
import Link from 'next/link';

type Props = {
  onNext: () => void;
};

const Welcome: React.FC<Props> = ({ onNext }) => {
  const { address, onConnect } = useWalletContext();
  const { user, registerByWalletMutation, loginByWalletMutation, userProfileQuery } =
    useAuthenticationContext();
  const { event } = useGA4();
  const [isSupportedBrowser, setIsSupportedBrowser] = React.useState<boolean>(true);
  const [installedWallet, setInstalledWallet] = useState<'PENDING' | boolean>('PENDING');

  useEffect(() => {
    if (!!window.ethereum) {
      setInstalledWallet(true);
    } else {
      setInstalledWallet(false);
    }
  }, []);

  const handleRegisterByWallet = async () => {
    // try login first
    try {
      const user = await loginByWalletMutation.mutateAsync().catch(() => null);
      if (!user) {
        await registerByWalletMutation.mutateAsync();
        loginByWalletMutation.mutate();
      }
    } catch (e) {
      // TODO toast here
      console.log('Register error');
    }
  };

  // try to login via wallet
  React.useEffect(() => {
    if (userProfileQuery.isFetching) {
      return;
    }
    if (user?.user_id) {
      onNext();
    }
    if (
      address &&
      !user?.user_id &&
      !loginByWalletMutation.isLoading &&
      !loginByWalletMutation.isError &&
      userProfileQuery.isFetched &&
      !userProfileQuery.data
    ) {
      loginByWalletMutation.mutate();
    }
  }, [address, user, loginByWalletMutation, onNext, userProfileQuery]);

  React.useEffect(() => {
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
        title: 'Unsupported Browser',
        message:
          'Please view this experience on a supported browser like Chrome, Brave, Firefox or Edge'
      };
    }

    if (address) {
      return {
        title: 'Welcome to the Myriaverse',
        message: (
          <span>
            Which side of the battlelines will you stand on? <br /> Choose your Alliance and claim
            your free Sigil NFT.
          </span>
        )
      };
    }

    return { title: 'Connect to your wallet to enter the Myriaverse' };
  })();

  return (
    <div
      className={
        "relative h-screen min-h-[inherit] bg-[url('/images/nodes/sigil/header-bg.jpeg')] bg-cover bg-bottom bg-no-repeat"
      }>
      <div className="mx-auto max-w-[408px] pt-[213px] text-center">
        <h1 className="text-[28px] font-bold leading-[1.2]">{content.title}</h1>
        {(address || !isSupportedBrowser) && (
          <p className="mt-8 text-[16px] leading-[1.5] text-light">{content.message}</p>
        )}
        {!address && !installedWallet && isSupportedBrowser && (
          <p className="mt-8 text-[16px] leading-[1.5] text-light">
            Don&apos;t have a wallet yet? <br />
            Install Metamask below.
          </p>
        )}
        {address && isSupportedBrowser ? (
          <>
            <Button
              loading={registerByWalletMutation.isLoading || loginByWalletMutation.isLoading}
              onClick={() => {
                handleRegisterByWallet();
                event('Join Now Selected', { campaign: 'Sigil' });
              }}
              className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
              {loginByWalletMutation.isLoading ? 'LOGING IN' : 'JOIN NOW'}
            </Button>
          </>
        ) : (
          <>
            {installedWallet === true && isSupportedBrowser && (
              <button
                onClick={() => {
                  onConnect();
                  event('Connect Wallet Selected', { campaign: 'Sigil' });
                }}
                className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[194px] items-center justify-center p-0">
                CONNECT WALLET
              </button>
            )}
            {installedWallet === false && isSupportedBrowser && (
              <a
                href="https://metamask.io/"
                target="_blank"
                className="btn-lg btn-secondary mx-auto mt-10 flex h-[40px]  w-[194px] items-center justify-center space-x-2 p-0 text-[16px] normal-case"
                rel="noreferrer"
                onClick={() => {
                  event('Install Metamask Clicked', {});
                }}>
                <i className="w-6">
                  <MetaMaskIcon />
                </i>
                <span>Install Metamask</span>
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
        )}
        {!isSupportedBrowser && (
          <Link href="/">
            <a className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
              Go back
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Welcome;
