import 'video.js/dist/video-js.css';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import '../styles/globals.css';
import toastStyle from '../styles/toast.module.scss';

import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { WalletProvider } from 'src/context/wallet';
import { L2WalletProvider } from 'src/context/l2-wallet';
import { AuthenticationProvider } from 'src/context/authentication';
import Tooltip from 'src/components/Tooltip';
import LanguageProvider, { useLanguage } from 'src/context/language';
import { useGATrackPageview } from 'src/lib/ga';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { t } from '@lingui/macro';
import TabProvider from 'src/context/tabContext';
import { Provider } from 'react-redux';
import { store } from 'src/packages/l2-wallet/src/app/store';
import { WithfrawNFT } from 'src/context/withdraw-nft';

const WithLanguageStyle: React.FC<any> = ({ children }) => {
  const { language } = useLanguage();
  return <div className={language}>{children}</div>;
};

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  useGATrackPageview();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <DefaultSeo
          title={t`Connecting the world through play`}
          description={t`Myria is a blockchain gaming ecosystem powered by Myria’s Ethereum L2 scaling solution`}
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
            description: t`Myria is a blockchain gaming ecosystem powered by Myria’s Ethereum L2 scaling solution`,
            url: 'https://myria.com',
            site_name: 'Myria'
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image'
          }}
        />
        <ToastContainer hideProgressBar className={toastStyle.toast} />
        <WalletProvider>
          <L2WalletProvider>
            <WithfrawNFT>
              <AuthenticationProvider>
                <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
                  <WithLanguageStyle>
                    <TabProvider>
                      <>
                        <Provider store={store}>
                          <Component {...pageProps} />
                        </Provider>
                      </>
                    </TabProvider>
                  </WithLanguageStyle>
                </Tooltip.Provider>
              </AuthenticationProvider>
            </WithfrawNFT>
          </L2WalletProvider>
        </WalletProvider>
      </LanguageProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
