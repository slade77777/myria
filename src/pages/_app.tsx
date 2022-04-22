import 'video.js/dist/video-js.css';
import '../styles/globals.css';

import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import { WalletProvider } from 'src/context/wallet';
import { AuthenticationProvider } from 'src/context/authentication';
import Tooltip from 'src/components/Tooltip';
import LanguageProvider, { useLanguage } from 'src/context/language';
import { useGATrackPageview } from 'src/lib/ga';
import { QueryClient, QueryClientProvider } from 'react-query'
import { t } from '@lingui/macro';
import TabProvider from 'src/context/tabContext';

const WithLanguageStyle: React.FC<any> = ({ children }) => {
  const { language } = useLanguage();
  return <div className={language}>{children}</div>;
};

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  useGATrackPageview();
  return (
    <QueryClientProvider client={queryClient}>
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
              <WithLanguageStyle>
                <TabProvider>
                  <Component {...pageProps} />
                </TabProvider>
              </WithLanguageStyle>
            </Tooltip.Provider>
          </WalletProvider>
        </AuthenticationProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
