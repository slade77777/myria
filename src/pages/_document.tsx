import Document, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/seo/apple-touch-icon.png" />
          <link rel="icon" type="image/x-icon" href="/seo/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/seo/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/seo/favicon-16x16.png" />
          <link rel="manifest" href="/seo/site.webmanifest" />
          <link rel="mask-icon" href="/seo/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap"
            rel="stylesheet"
          />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', "${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}", {
              page_path: window.location.pathname,
            });
          `
            }}
          />
          {/* <!-- Meta Pixel Code --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
               fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');`
            }}
          />
          <noscript>
            <img
              alt=""
              height="1"
              width="1"
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
          {/* <!-- Meta Pixel Code --> */}

          {/* <!-- Reddit Pixel --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID}');rdt('track', 'PageVisit');`
            }}
          />
          {/* <!-- DO NOT MODIFY --> */}
          {/* <!-- End Reddit Pixel --> */}

          {/* <!-- Xandr Universal Pixel --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(e,i){if(!e.pixie){var n=e.pixie=function(e,i,a){n.actionQueue.push({action:e,actionValue:i,params:a})};n.actionQueue=[];var a=i.createElement("script");a.async=!0,a.src="//acdn.adnxs.com/dmp/up/pixie.js";var t=i.getElementsByTagName("head")[0];t.insertBefore(a,t.firstChild)}}(window,document);
              pixie('init', '${process.env.NEXT_PUBLIC_UNIVERSAL_PIXEL_ID}');
              pixie('event', 'PageView');`
            }}
          />
          <noscript>
            <img
              alt=""
              src={`https://ib.adnxs.com/pixie?pi=${process.env.NEXT_PUBLIC_UNIVERSAL_PIXEL_ID}&e=PageView&script=0`}
              width="1"
              height="1"
              style={{ display: 'none' }}
            />
          </noscript>
          {/* <!-- End Xandr Universal Pixel --> */}

          {/* <!-- Conversion Pixel --> */}
          <script
            async
            src={`https://secure.adnxs.com/px?id=${process.env.NEXT_PUBLIC_CONVERSION_PIXEL_ID}&t=1`}
            type="text/javascript"
          />
          {/* <!-- End Conversion Pixel --> */}

          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}

          {/* <!-- Google Tag Manager --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM}');`
            }}
          />
          {/* <!-- End Google Tag Manager --> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
