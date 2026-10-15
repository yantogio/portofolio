// Gagal-kan build bila hasil HTML atau PDF CV memuat pola data pribadi yang tidak boleh publik.
// Sengaja memakai pola umum (bukan data asli) agar data pribadi tidak tersimpan di repo.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { extractText, getDocumentProxy } from 'unpdf';

const patterns = [
  { name: 'nomor HP Indonesia', re: /(\+62|\b0)8\d{2}[-\s.]?\d{3,4}[-\s.]?\d{3,5}\b/ },
  { name: 'tanggal lahir', re: /(tanggal lahir|date of birth)\s*[:=]|\d{1,2}\s+(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(19|20)\d{2}/i },
  { name: 'agama', re: /\b(agama|religion)\s*[:=]/i },
  { name: 'status pernikahan', re: /(belum|sudah) menikah|marital status\s*[:=]/i },
  { name: 'jenis kelamin', re: /(jenis kelamin|gender)\s*[:=]/i },
  { name: 'alamat detail', re: /\b(alamat|address)\s*[:=]|\bkec(amatan)?\.?\s+[a-z]|\bRT\s*\d+\s*\/\s*RW\b/i },
];

const html = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) html.push(p);
  }
};
walk('dist');

const hits = [];
const scan = (label, text) => {
  for (const { name, re } of patterns) if (re.test(text)) hits.push(`${label}: ${name}`);
};

for (const f of html) scan(f, readFileSync(f, 'utf8').replace(/<[^>]+>/g, ' '));

// PDF CV yang disajikan situs (public/cv/ disalin ke dist/cv/).
const cvDir = join('dist', 'cv');
const pdfs = existsSync(cvDir) ? readdirSync(cvDir).filter((n) => n.toLowerCase().endsWith('.pdf')) : [];
for (const name of pdfs) {
  const path = join(cvDir, name);
  // Bila teks gagal diekstrak, build ikut gagal: lebih baik berhenti daripada diam-diam melewati PDF.
  const pdf = await getDocumentProxy(new Uint8Array(readFileSync(path)));
  const { text } = await extractText(pdf, { mergePages: true });
  scan(path, text);
}

if (hits.length) {
  console.error('Pemeriksaan privasi GAGAL:\n' + hits.join('\n'));
  process.exit(1);
}
console.log(`Pemeriksaan privasi lolos (${html.length} halaman, ${pdfs.length} PDF CV).`);
