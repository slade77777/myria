import 'video.js/dist/video-js.css';
import '../styles/globals.css';

import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import { useGA } from 'src/lib/ga';
import LanguageProvider from 'src/context/LanguageContext';

function App({ Component, pageProps }: AppProps) {
  useGA();
  return (
    <>
      <DefaultSeo
        title={'Connecting the world through play'}
        description="Myria is a blockchain gaming ecosystem powered by the Myria blockchain."
        titleTemplate={'Myria | %s'}
        openGraph={{
          type: 'website',
          locale: 'en',
          images: [
            {
              url: 'https://myria.com/seo/defaultImage.png',
              alt: 'Game NFT',
              type: 'image/png'
            }
          ],
          title: 'Myria | Connecting the world through play',
          description: 'Myria is a blockchain gaming ecosystem powered by the Myria blockchain.',
          url: 'https://myria.com',
          site_name: 'Myria'
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image'
        }}
      />

      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </>
  );
}

export default App;
