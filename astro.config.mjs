// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Ganti ke https://yantogio.is-a.dev setelah domain aktif.
  site: 'https://portfolio-yantogio.vercel.app',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
