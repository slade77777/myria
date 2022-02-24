import type { I18n } from '@lingui/core';
import { en, vi, zh, ja, ko, tr, es } from 'make-plural/plurals';

export type Language = 'en' | 'zh-Hans' | 'ja' | 'ko' | 'es' | 'tr' | 'vi';

export const LANGUAGES: Language[] = ['en', 'zh-Hans', 'ja', 'ko', 'es', 'tr', 'vi'];
export const DEFAULT_LANGUAGE: Language = 'en';
export const LANG_KEY = 'lang';

export const validateLanguage = (language: Language): boolean => {
  if (LANGUAGES.includes(language)) {
    return true;
  }
  return false;
};

export const invalidateLanguage = (language: any): Language => {
  if (validateLanguage(language)) {
    return language;
  }
  return DEFAULT_LANGUAGE;
};

export const getLanguageFromLocalStorage = (): Language => {
  if (typeof localStorage != 'undefined') {
    return invalidateLanguage(localStorage.getItem(LANG_KEY));
  }
  return DEFAULT_LANGUAGE;
};

export const setLanguageToLocalStorage = (language: Language) => {
  if (typeof localStorage != 'undefined') {
    localStorage.setItem(LANG_KEY, language);
  }
};

export const loadMessages = async (locale: string) => {
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    return import(`./translations/locales/${locale}/messages`);
  } else {
    return import(`./translations/locales/${locale}/messages.po`);
  }
};

const plurals: { [language in Language]: any } = {
  en,
  vi,
  'zh-Hans': zh,
  ja,
  ko,
  es,
  tr
};

export const dynamicActivate = async (i18n: I18n, locale: string, messagesData?: any) => {
  let selectedMessages = messagesData?.messages;
  if (!selectedMessages) {
    selectedMessages = (await loadMessages(locale)).messages;
  }

  i18n.load(locale, selectedMessages);
  i18n.loadLocaleData(locale, { plurals: plurals[invalidateLanguage(locale)] });
  i18n.activate(locale);
};
