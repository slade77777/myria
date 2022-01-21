import 'video.js/dist/video-js.css';
import '../styles/globals.css';

import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
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
              url: 'https://myria.com/seo/metarush.png',
              alt: 'Metarush',
              type: 'image/png'
            },
            {
              url: 'https://myria.com/seo/block_royale.png',
              alt: 'Block royale',
              type: 'image/png'
            },
            { url: 'https://myria.com/seo/metakart.png', alt: 'Metakart', type: 'image/png' },
            { url: 'https://myria.com/seo/startstrike.png', alt: 'Startstrike', type: 'image/png' }
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
     
      <Component {...pageProps} />
    </>
  );
}

export default App;
