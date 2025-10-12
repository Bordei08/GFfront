export const useTranslation = () => ({
  t: (key: string, defaultValue?: string) => defaultValue ?? key,
  i18n: { changeLanguage: jest.fn(), language: 'en' },
});

export const initReactI18next = {
  type: '3rdParty',
  init: jest.fn(),
};

export const Trans = ({ children }: any) => children;
