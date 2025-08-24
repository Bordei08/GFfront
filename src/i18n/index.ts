import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// importă-ți fișierele reale de traduceri
import en from './locales/en/common.json';
import ro from './locales/ro/common.json';

const sys = RNLocalize.getLocales()[0]?.languageCode?.toLowerCase();
const fallback = sys === 'ro' ? 'ro' : 'en';

i18n
  .use(initReactI18next)
  .init({
    // poți omite compatibilitatea sau setezi 'v4'
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en }, 
      ro: { translation: ro },
    },
    lng: fallback,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
