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

          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          {/* {
            process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
              <>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></script>
                <script dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`
                }} />
              </>
            )
          } */}
          {/* <!-- End Global site tag (gtag.js) - Google Analytics --> */}

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

          {process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION && (
            <meta name="facebook-domain-verification" content={process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION} />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID && (
            <script
              defer
              type="text/javascript"
              src={`//static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID}`}
            />
          )}
        </body>
      </Html>
    );
  }
}

export default AppDocument;
