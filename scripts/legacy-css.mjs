// Ubah CSS hasil build agar juga tampil di browser lama (mis. Chrome Android < 99)
// yang belum mengenal `@layer` atau sintaks media query `(width>=...)`. Tanpa ini, browser tersebut mengabaikan semua gaya
// Tailwind dan halaman tampil sebagai HTML polos.
//
// @csstools/postcss-cascade-layers menghapus `@layer` dan menjaga urutan prioritas
// gaya dengan menyesuaikan specificity selector, jadi tampilan di browser modern tetap sama.
//
// Karena isi file berubah, nama file (yang memuat hash) ikut diganti dan semua rujukan
// diperbarui. Tanpa itu, browser yang sudah menyimpan versi lama di cache tidak akan
// pernah mengambil versi baru (file /_astro/ di-cache selama setahun).
import { readdirSync, readFileSync, writeFileSync, renameSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { createHash } from 'node:crypto';
import postcss from 'postcss';
import cascadeLayers from '@csstools/postcss-cascade-layers';
import mediaMinMax from '@csstools/postcss-media-minmax';

const all = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else all.push(p);
  }
};
walk('dist');

// mediaMinMax: `(width>=768px)` -> `(min-width:768px)` untuk browser sebelum Chrome 104.
const processor = postcss([
  cascadeLayers({ onRevertLayerKeyword: false, onConditionalRulesChangingLayerOrder: false }),
  mediaMinMax(),
]);
const renames = new Map(); // nama lama -> nama baru
const cssFiles = all.filter((p) => p.endsWith('.css'));

// Urutan layer di seluruh situs (dari Tailwind: properties, theme, base, components, utilities).
// Setiap file diberi deklarasi urutan yang sama sebelum diproses. Tanpa ini, file berisi gaya
// komponen yang tidak memakai @layer (mis. gaya diagram) tidak mendapat bobot "unlayered"
// dan kalah oleh reset Tailwind dari file lain, padahal seharusnya menang.
const layerOrder = [];
for (const file of cssFiles) {
  for (const m of readFileSync(file, 'utf8').matchAll(/@layer\s+([\w-]+(?:\s*,\s*[\w-]+)*)\s*[{;]/g)) {
    for (const name of m[1].split(',').map((s) => s.trim())) if (!layerOrder.includes(name)) layerOrder.push(name);
  }
}
const preamble = layerOrder.length ? `@layer ${layerOrder.join(', ')};\n` : '';

for (const file of cssFiles) {
  const css = preamble + readFileSync(file, 'utf8');
  const out = (await processor.process(css, { from: file, to: file })).css;
  const hash = createHash('sha256').update(out).digest('base64url').slice(0, 8);
  const oldName = basename(file);
  // "BaseLayout.CWhOWwVW.css" -> "BaseLayout.<hash-baru>.css"
  const newName = oldName.replace(/\.[^.]+\.css$/, `.${hash}.css`);
  writeFileSync(file, out);
  if (newName !== oldName) {
    renameSync(file, join(file, '..', newName));
    renames.set(oldName, newName);
  }
}

// Perbarui rujukan di HTML/JS/CSS.
for (const file of all.filter((p) => /\.(html|js|css)$/.test(p) && !renames.has(basename(p)))) {
  let text = readFileSync(file, 'utf8');
  let changed = false;
  for (const [from, to] of renames) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
    }
  }
  if (changed) writeFileSync(file, text);
}

console.log(`CSS kompatibel browser lama: ${renames.size} file diproses.`);
