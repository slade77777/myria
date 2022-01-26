
/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const moduleExports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src']
  },
  images: {
    loader: 'imgix',
    path: 'https://sony.imgix.net',
  }
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);