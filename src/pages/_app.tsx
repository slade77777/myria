import 'video.js/dist/video-js.css';
import '../styles/globals.css';

import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import { useGA } from 'src/lib/ga';
import LanguageProvider from 'src/context/LanguageContext';
import { t } from '@lingui/macro';
import { WalletProvider } from 'src/providers/useWallet';

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

      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </LanguageProvider>
  );
}

export default App;
