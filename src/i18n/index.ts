import { id, type Dict } from './id';
import { en } from './en';
import type { Lang } from '@/config/profile';

const dicts: Record<Lang, Dict> = { id, en };

export const langs: Lang[] = ['id', 'en'];

export function t(lang: Lang, key: keyof Dict): string {
  return dicts[lang][key];
}

/** Bahasa dari URL: `/en/...` → en, selain itu id. */
export function getLang(url: URL): Lang {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'id';
}

/** Path tanpa prefix bahasa, selalu diawali `/`. */
export function stripLang(pathname: string): string {
  const p = pathname.replace(/^\/en(?=\/|$)/, '');
  return p === '' ? '/' : p;
}

/** Path yang sama dalam bahasa tertentu. */
export function localizePath(path: string, lang: Lang): string {
  const base = stripLang(path);
  if (lang === 'id') return base;
  return base === '/' ? '/en' : `/en${base}`;
}

/** Path padanan di bahasa lain (untuk pengalih bahasa). */
export function getAltPath(pathname: string, lang: Lang): string {
  return localizePath(pathname, lang === 'id' ? 'en' : 'id');
}

/** Pilih teks bilingual `{ id, en }`. */
export function pick<T>(value: { id: T; en: T }, lang: Lang): T {
  return value[lang];
}
