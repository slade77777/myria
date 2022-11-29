/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const isProd = process.env.NODE_ENV === 'production';

const moduleExports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src']
  },
  trailingSlash: true,
  images: isProd
    ? {
        loader: 'imgix',
        path: 'https://frozen-temple-88132.herokuapp.com',
        domains: ['frozen-temple-88132.herokuapp.com']
      }
    : {
        loader: 'imgix',
        path: 'https://frozen-temple-88132.herokuapp.com',
        domains: ['assets-dev.nonprod-myria.com', 'frozen-temple-88132.herokuapp.com']
      },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po/,
      use: ['@lingui/loader']
    });

    return config;
  }
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
