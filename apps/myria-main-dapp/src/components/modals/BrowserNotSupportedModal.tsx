import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import * as env from 'detect-browser';
import { MARKETPLACE } from 'src/configs';
import Modal from 'src/components/Modal';
import Link from 'next/link';

type Props = {};

const SessionTimeoutCountModal: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [showBrowserNotSupportedModal, setBrowserNotSupportedModal] = useState(false);
  const [nameBrowser, setNameBrowser] = React.useState<String>('');

  React.useEffect(() => {
    const { navigator } = window;
    const browser = env.detect();

    async function checkBrowser() {
      // @ts-ignore
      const isBraveBrowser = navigator.brave && (await navigator.brave.isBrave());
      const isBrowserSupport =
        browser?.name === 'chrome' ||
        browser?.name === 'edge-chromium' ||
        browser?.name === 'edge' ||
        isBraveBrowser;

      if (isBraveBrowser) setNameBrowser('Brave');

      if (router.pathname.includes(MARKETPLACE)) {
        setBrowserNotSupportedModal(Boolean(browser) && !isBrowserSupport);
      }

      if (!showBrowserNotSupportedModal && !isBraveBrowser) {
        // @ts-ignore
        setNameNotSupportedBrowser(browser?.name.replace('-', ' '));
      }
    }

    checkBrowser();
  });

  return (
    <Modal open={showBrowserNotSupportedModal}>
      <Modal.Content includingHeader={false}>
        <div className="relative isolate space-y-4 p-6 text-white md:px-[31px] md:pt-6 md:pb-[38px]">
          <h1 className="font-bold leading-[1.15] md:text-[24px]">
            <Trans>Browser not supported</Trans>
          </h1>
          <p className="text-base/9 text-sm leading-[150%]">
            Unfortunately we don't support the <span className="capitalize">{nameBrowser}</span>{' '}
            browser. Please visit us on Chrome, Brave or Edge browsers.
          </p>
          <Link href="/">
            <a className="align-center bg-brand-gold text-base/1 mt-4 flex w-full justify-center rounded-lg py-3 text-center font-bold uppercase leading-6">
              OK
            </a>
          </Link>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default SessionTimeoutCountModal;
