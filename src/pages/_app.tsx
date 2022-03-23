import 'video.js/dist/video-js.css';
import '../styles/globals.css';

import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import { useGA } from 'src/lib/ga';
import { WalletProvider } from 'src/context/wallet';
import { AuthenticationProvider } from 'src/context/authentication';
import LanguageProvider, { useLanguage } from 'src/context/language';
import { t } from '@lingui/macro';
import TabProvider from 'src/context/tabContext';

const WithLanguageStyle: React.FC<any> = ({ children }) => {
  const { language } = useLanguage();
  return <div className={language}>{children}</div>;
};

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
          <WithLanguageStyle>
            <TabProvider>
              <Component {...pageProps} />
            </TabProvider>
          </WithLanguageStyle>
        </WalletProvider>
      </AuthenticationProvider>
    </LanguageProvider>
  );
}

export default App;
