// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Ganti ke https://yantogio.is-a.dev setelah domain aktif.
  site: 'https://yantogio.vercel.app',
  output: 'static',
  trailingSlash: 'ignore',
  // CSS selalu file terpisah agar scripts/legacy-css.mjs bisa memprosesnya.
  build: { inlineStylesheets: 'never' },
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
