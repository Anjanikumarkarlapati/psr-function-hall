import { useLanguage } from './LanguageProvider';
import { en } from './en';
import { te } from './te';
import type { TranslationDictionary, Locale } from './types';

const dictionaries: Record<Locale, TranslationDictionary> = { en, te };

export function useTranslation() {
  const { locale, toggleLanguage } = useLanguage();
  const t = dictionaries[locale] ?? dictionaries['en'];
  return { t, locale, toggleLanguage };
}
