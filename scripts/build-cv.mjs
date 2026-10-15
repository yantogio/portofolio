// Buat public/cv/CV-Gionova-ID.pdf dari cv/CV-Gionova-ID.html memakai Chrome yang
// terpasang di komputer. Jalankan dengan: npm run cv
//
// Dijalankan lokal (bukan saat build Vercel, karena di sana tidak ada Chrome).
// Hasil PDF di-commit ke repo.
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const source = resolve('cv/CV-Gionova-ID.html');
const output = resolve('public/cv/CV-Gionova-ID.pdf');

let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
} catch (err) {
  console.error(
    'Chrome tidak ditemukan. Pasang Google Chrome, lalu jalankan ulang `npm run cv`.\n' +
      `Detail: ${err instanceof Error ? err.message.split('\n')[0] : err}`,
  );
  process.exit(1);
}

try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(source).href, { waitUntil: 'load' });
  mkdirSync(resolve('public/cv'), { recursive: true });
  await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log(`CV dibuat: ${output}`);
} finally {
  await browser.close();
}
