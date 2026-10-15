// Gagal-kan build bila hasil HTML memuat pola data pribadi yang tidak boleh publik.
// Sengaja memakai pola umum (bukan data asli) agar data pribadi tidak tersimpan di repo.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const patterns = [
  { name: 'nomor HP Indonesia', re: /(\+62|\b0)8\d{2}[-\s.]?\d{3,4}[-\s.]?\d{3,5}\b/ },
  { name: 'tanggal lahir', re: /(tanggal lahir|date of birth)\s*[:=]|\d{1,2}\s+(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(19|20)\d{2}/i },
  { name: 'agama', re: /\b(agama|religion)\s*[:=]/i },
  { name: 'status pernikahan', re: /(belum|sudah) menikah|marital status\s*[:=]/i },
  { name: 'jenis kelamin', re: /(jenis kelamin|gender)\s*[:=]/i },
];

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
};
walk('dist');

const hits = [];
for (const f of files) {
  const text = readFileSync(f, 'utf8').replace(/<[^>]+>/g, ' ');
  for (const { name, re } of patterns) if (re.test(text)) hits.push(`${f}: ${name}`);
}

if (hits.length) {
  console.error('Pemeriksaan privasi GAGAL:\n' + hits.join('\n'));
  process.exit(1);
}
console.log(`Pemeriksaan privasi lolos (${files.length} halaman).`);
