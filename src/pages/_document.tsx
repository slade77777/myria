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
          <link rel="apple-touch-icon" sizes="180x180" href="/seo/apple-touch-icon.png" />
          <link rel="icon" type="image/x-icon" href="/seo/favicon.ico"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/seo/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/seo/favicon-16x16.png" />
          <link rel="manifest" href="/seo/site.webmanifest" />
          <link rel="mask-icon" href="/seo/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
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
