import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Language,
  DEFAULT_LANGUAGE,
  dynamicActivate,
  getLanguageFromLocalStorage,
  setLanguageToLocalStorage
} from 'src/i18n';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';

// Import the default language
// Due to not able to import dynamic, hard code for now
import messages from 'src/translations/locales/en/messages';

type Context = {
  language: Language;
  changeLanguage: (language: Language) => void;
};

const LanguageContext = React.createContext<Context>({} as any);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

dynamicActivate(i18n, DEFAULT_LANGUAGE, messages);

const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLang] = useState(DEFAULT_LANGUAGE);

  const [ready, setReady] = useState(false);
  const readyRef = useRef(ready);
  readyRef.current = ready;

  useEffect(() => {
    setLang(getLanguageFromLocalStorage());
  }, []);

  useEffect(() => {
    (async () => {
      await dynamicActivate(i18n, language);
      if (language === getLanguageFromLocalStorage() && !readyRef.current) {
        setReady(true);
      }
    })();
  }, [language]);

  const handleChangeLanguage = useCallback((language: Language) => {
    setLanguageToLocalStorage(language);
    setLang(language);
  }, []);

  const value = useMemo(
    () => ({ language, changeLanguage: handleChangeLanguage }),
    [language, handleChangeLanguage]
  );

  if (!ready && typeof window != 'undefined') {
    return null;
  }

  return (
    <I18nProvider i18n={i18n}>
      <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
    </I18nProvider>
  );
};

export default LanguageProvider;
