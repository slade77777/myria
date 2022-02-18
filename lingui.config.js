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
    apiKey: 'b37400a1536547c981f5c827b86e847a'
  }
};
