module.exports = {
  locales: ['en', 'zh-Hans', 'ja', 'ko', 'es', 'tr', 'vi'],
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en'
  },
  catalogs: [
    {
      path: '<rootDir>/src/translations/locales/{locale}/messages',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**']
    }
  ],
  format: 'po',
  service: {
    name: 'TranslationIO',
    apiKey: '0ad7a5c4adb64a7084896b0027569865'
  }
};
