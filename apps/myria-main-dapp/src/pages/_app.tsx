import 'video.js/dist/video-js.css';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import '../styles/globals.css';
import toastStyle from '../styles/toast.module.scss';

import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { WalletProvider } from 'src/context/wallet';
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
import { WithdrawNFT } from 'src/context/withdraw-nft';
import { DepositProvider } from 'src/context/deposit-context';
import { L2WalletProvider } from 'src/context/l2-wallet';
import { FilterSortProvider } from 'src/context/filter-sort-context';
import { CampaignProvider } from 'src/context/campaignContext';

const WithLanguageStyle: React.FC<any> = ({ children }) => {
  const { language } = useLanguage();
  return <div className={language}>{children}</div>;
};

export const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  useGATrackPageview();
  const router = useRouter();
  const isAirDrop = router.route === '/airdrop'

  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;

    const prevPath: any = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath);

    storage.setItem('currentPath', globalThis.location.pathname);
  }

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
          dangerouslySetAllPagesToNoIndex={process.env.NEXT_PUBLIC_DISABLE_SEO === 'true'}
          dangerouslySetAllPagesToNoFollow={process.env.NEXT_PUBLIC_DISABLE_SEO === 'true'}
        />
        <ToastContainer hideProgressBar className={toastStyle.toast} />
        <WalletProvider>
          <WithdrawNFT>
            <DepositProvider>
              <CampaignProvider isAirDrop={isAirDrop}>
                <AuthenticationProvider isAirDrop={isAirDrop}>
                  <FilterSortProvider>
                    <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
                      <WithLanguageStyle>
                        <TabProvider>
                          <>
                            <Provider store={store}>
                              <L2WalletProvider>
                                <Component {...pageProps} />
                              </L2WalletProvider>
                            </Provider>
                          </>
                        </TabProvider>
                      </WithLanguageStyle>
                    </Tooltip.Provider>
                  </FilterSortProvider>
                </AuthenticationProvider>
              </CampaignProvider>

            </DepositProvider>
          </WithdrawNFT>
        </WalletProvider>
      </LanguageProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
