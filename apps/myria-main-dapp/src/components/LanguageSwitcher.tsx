import clsx from 'clsx';
import React from 'react';
import { useLanguage } from '../context/language';
import { Language } from '../i18n';
import DropdownMenu from './DropdownMenu';
import ChevronDownIcon from './icons/ChevronDownIcon';
import LanguageIcon from './icons/LanguageIcon';

const languages: Record<Language, string> = {
  en: 'English',
  'zh-Hans': '中文',
  ja: '日文',
  es: 'Español',
  vi: 'Tiếng Việt',
  ko: '한국어',
  tr: 'Türk'
};

type Props = {
  isMobile?: boolean;
};

const LanguageSwitcher: React.FC<Props> = ({ isMobile }) => {
  const { language, changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        {isMobile ? (
          <button className="w-[30px] text-white focus:outline-none">
            <LanguageIcon />
          </button>
        ) : (
          <button className="caption flex items-center whitespace-nowrap font-medium focus:outline-none open:text-brand-gold">
            <span className="w-[30px] text-white focus:outline-none">
              <LanguageIcon />
            </span>
          </button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={16}
        align="end"
        className="!animate-none md:!dropdown-content">
        <div
          style={{
            boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
          }}
          className="grid min-w-[114px] gap-4 rounded-lg bg-brand-deep-blue p-6 text-white">
          {(Object.keys(languages) as Language[]).map((lang) => {
            return (
              <DropdownMenu.Item asChild key={lang}>
                <button
                  className={clsx(
                    'text-left text-sm font-medium focus:text-brand-gold focus:outline-none',
                    {
                      'text-brand-gold': language === lang
                    }
                  )}
                  onClick={() => {
                    changeLanguage(lang);
                  }}>
                  {languages[lang]}
                </button>
              </DropdownMenu.Item>
            );
          })}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
