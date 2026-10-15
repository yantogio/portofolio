## 1. Setup proyek

- [x] 1.1 `git init`, buat `.gitignore` (node_modules, dist, .astro, .env*, .vercel)
- [x] 1.2 Scaffold Astro (TypeScript strict) di root `C:\Portofolio` tanpa menimpa `openspec/` dan `.claude/`
- [x] 1.3 Pasang Tailwind CSS v4 via `@tailwindcss/vite` dan buat `src/styles/global.css` dengan blok `@theme` kosong untuk token
- [x] 1.4 Konfigurasi `astro.config` (output static, `site`, i18n `id` default tanpa prefix + `en`)
- [x] 1.5 Tambah script `dev`, `build`, `preview`, `check` (astro check) dan pastikan `npm run build` lolos

## 2. Data & konten dasar

- [x] 2.1 Buat `src/config/profile.ts` (nama, "Yanto", headline ID/EN, lokasi "Bekasi, Indonesia", email, LinkedIn, GitHub, `openToWork` + teks status ID/EN)
- [x] 2.2 Buat kamus `src/i18n/id.ts`, `en.ts`, helper `t()` dan `getAltPath()`; tipe `en` wajib sama dengan `id`
- [x] 2.3 Definisikan collection `projects` (glob `*/{id,en}.md`) dengan schema zod sesuai spec, termasuk `confidential` dan `diagram`
- [x] 2.4 Definisikan data sertifikat (`certificates.yaml` + glob PDF/thumbnail) dan isi 6 entri dari CV
- [x] 2.5 Definisikan collection `build-log` (`NN-tahap.{id,en}.md`)
- [x] 2.6 Buat folder `src/assets/me/`, `public/cv/`, `src/content/certificates/` dengan README singkat berisi cara mengisi tiap folder

## 3. Riset & penulisan case study

- [x] 3.1 Ambil README + `openspec/` dari Project-web-HMTI dan susun draft `id.md` (Masalah → Pendekatan → Arsitektur → Bukti → Pelajaran)
- [x] 3.2 Sama untuk smart-wealth-monitor (verifikasi angka 39 tests, 10 kapabilitas, CI)
- [x] 3.3 Sama untuk airline-voucher-seats (verifikasi 98 tests / ±16.000 assertions, 409 + unique constraint)
- [x] 3.4 Sama untuk vehicle-registry, tekankan diagram Controller → Service → Repository
- [x] 3.5 Susun case study Denso dari CV (`confidential: true`, diagram Forms → Power Automate → OneDrive → Python ETL → SQL Server → CI3, plus Power BI & Power Apps)
- [x] 3.6 Terjemahkan kelima case study ke `en.md`
- [x] 3.7 Tulis copy homepage ID + EN (hero, journey 6 langkah, cara kerja, kontak) tanpa frasa generik
- [ ] 3.8 Review oleh Yanto: koreksi fakta dan setujui teks ID & EN

## 4. Arah desain (design-taste-frontend)

- [x] 4.1 Jalankan skill design-taste-frontend dengan brief dari proposal + konten nyata; hasilkan arah visual (tipografi, warna, spasi, grid, motion, perlakuan foto)
- [x] 4.2 Catat di `design-direction.md` (folder change ini) beserta alasan, lalu konfirmasi dengan Yanto
- [x] 4.3 Terapkan token ke `@theme` dan pasang font via Fontsource
- [x] 4.4 Simpan ringkasan keputusan ke `src/content/build-log/` (tahap "design direction")

## 5. Mockup & komponen (image-to-code)

- [x] 5.1 Buat mockup per section (hero, selected work, journey, cara kerja, credentials, kontak, halaman project) dengan skill image-to-code atau fallback sesuai design.md
- [x] 5.2 Bangun layout dasar: `BaseLayout` (head, meta, hreflang, canonical, OG, skip link, `<Analytics />`), header dengan nav + pengalih bahasa, footer (link build-log, GitHub)
- [x] 5.3 Komponen `ProjectCard` (cover / fallback tipografi, highlights, tombol kondisional GitHub/Live/Detail)
- [x] 5.4 Komponen `FlowDiagram` (list terurut yang diberi gaya, aksesibel)
- [x] 5.5 Komponen `Gallery` (screens otomatis, urut nama file, lightbox ringan tanpa framework)
- [x] 5.6 Komponen `AvailabilityBadge` dari `profile.openToWork`
- [x] 5.7 Komponen `CertificateList` dan `CvButton` (fallback bahasa)

## 6. Halaman

- [x] 6.1 Homepage ID (`/`) dan EN (`/en`) dengan section berurutan + anchor
- [x] 6.2 Halaman detail project `/projects/[slug]` dan `/en/projects/[slug]` (sembunyikan galeri & repo bila `confidential`)
- [x] 6.3 Halaman `/how-i-built-this` dan `/en/how-i-built-this` dari collection build-log
- [x] 6.4 Halaman 404 dua bahasa
- [x] 6.5 Placeholder netral bila `portrait.jpg` belum ada; build tetap lolos

## 7. Verifikasi (playwright-cli) & audit (web-design-guidelines)

- [x] 7.1 Screenshot semua halaman ID & EN pada 390px dan 1440px; cek juga 360px dan 1366×768 (hero di atas lipatan)
- [x] 7.2 Uji: pengalih bahasa menjaga halaman, tombol Live tidak muncul tanpa `demo`, tidak ada scroll horizontal, fokus keyboard terlihat, reduced-motion mematikan animasi
- [x] 7.3 Audit dengan skill web-design-guidelines; perbaiki semua temuan tinggi, catat sisanya
- [x] 7.4 Pemeriksaan privasi otomatis (`scripts/check-privacy.mjs`, jalan di `postbuild`): pola nomor HP dan field data pribadi → harus kosong
- [x] 7.5 Review anti-slop terhadap daftar di spec design-quality
- [x] 7.6 Simpan screenshot before/after + temuan audit ke build-log

## 8. Deploy

- [ ] 8.1 Pandu Yanto membuat repo GitHub dan push (cek tidak ada secret di repo)
- [ ] 8.2 Pandu Yanto daftar Vercel ("Continue with GitHub"), import repo, deploy preview
- [ ] 8.3 Aktifkan Web Analytics di dashboard Vercel; pastikan tidak ada UI statistik di situs
- [ ] 8.4 Jalankan Lighthouse mobile di URL produksi; semua kategori ≥ 90
- [ ] 8.5 Siapkan file `domains/yantogio.json` dan pandu Yanto membuat PR ke `is-a-dev/register`
- [ ] 8.6 Setelah PR di-merge, tambahkan domain di Vercel, update `site` di `astro.config`, verifikasi HTTPS

## 9. Serah terima

- [x] 9.1 Tulis `README.md` repo: cara menambah project, mengganti foto, menambah sertifikat, mengganti CV, dan mengubah status open-to-work (dalam Bahasa Indonesia)
- [ ] 9.2 Yanto menaruh foto, PDF sertifikat, dan PDF CV; rebuild dan cek akhir

## 10. Revisi desain v2 (setelah review pemilik)

- [x] 10.1 Hapus link demo hmti.my.id (VPS tidak aktif) dan klaim "masih dipakai"
- [x] 10.2 Tentukan arah baru dengan design-taste-frontend: cerita perjalanan, tema gelap hangat, Bricolage + Hanken
- [x] 10.3 Generate referensi section dengan image-to-code via Canva (4 dari 7 berhasil, kuota habis) dan analisis komposisinya
- [x] 10.4 Ganti token warna di seluruh kode (`paper/ink/signal` → `bg/fg/accent`) dan tulis ulang `global.css`
- [x] 10.5 Bangun ulang beranda: hero, garis waktu dengan tahun sticky dan project per bab, kartu metode kerja yang menumpuk, kredensial berbentuk baris, kontak
- [x] 10.6 Tulis ulang copy dengan nada profesional berbasis CV (hero dengan nama lengkap, deskripsi bab yang faktual)
- [x] 10.7 Ganti paragraf profil dengan section Keahlian interaktif (hover/fokus membuka, selalu terbuka di HP)
- [x] 10.8 Ganti navigasi pill melayang dengan header statis + tombol menu + `<dialog>` layar penuh
- [x] 10.9 Tambah folder `src/assets/journey/` untuk foto per bab, beserta README
- [x] 10.10 Tambah lightbox global (`Lightbox` + `Zoomable`) untuk semua foto
- [x] 10.11 Verifikasi ulang dengan Playwright: overflow 360-1440px, hero 1366×768, menu, lightbox, pengalih bahasa, fokus keyboard
- [x] 10.12 Perbarui proposal, specs, design.md, design-direction.md, dan build-log agar sesuai v2
- [x] 10.13 Hapus data pribadi literal dari specs/tasks dan bersihkan riwayat git sebelum push pertama
