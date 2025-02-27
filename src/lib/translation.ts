import 'server-only';

import { Languages, Locale } from '@/i18n.config';

const dictionaries = {
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

const getTrans = async (locale: Locale) => {
  return locale === Languages.ARABIC ? dictionaries.ar() : dictionaries.en();
};

export default getTrans;