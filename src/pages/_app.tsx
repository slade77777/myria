import 'video.js/dist/video-js.css';
import '../styles/globals.css';

import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import { useGA } from 'src/lib/ga';
import LanguageProvider from 'src/context/language';
import { t } from '@lingui/macro';
import { WalletProvider } from 'src/context/wallet';
import { AuthenticationProvider } from 'src/context/authentication';
import Tooltip from 'src/components/Tooltip';

function App({ Component, pageProps }: AppProps) {
  useGA();
  return (
    <LanguageProvider>
      <DefaultSeo
        title={t`Connecting the world through play`}
        description={t`Myria is a blockchain gaming ecosystem powered by the Myria blockchain.`}
        titleTemplate={t`Myria | Connecting the world through play`}
        openGraph={{
          type: 'website',
          locale: 'en',
          images: [
            {
              url: 'https://myria.com/seo/defaultImage.png',
              alt: t`Game NFT`,
              type: 'image/png'
            }
          ],
          title: t`Myria | Connecting the world through play`,
          description: t`Myria is a blockchain gaming ecosystem powered by the Myria blockchain.`,
          url: 'https://myria.com',
          site_name: 'Myria'
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image'
        }}
      />

      <AuthenticationProvider>
        <WalletProvider>
          <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
            <Component {...pageProps} />
          </Tooltip.Provider>
        </WalletProvider>
      </AuthenticationProvider>
    </LanguageProvider>
  );
}

export default App;
