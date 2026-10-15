## 1. Domain final

- [x] 1.1 Ubah `site` di `astro.config.mjs` menjadi `https://yantogio.vercel.app`
- [x] 1.2 Build dan pastikan canonical, hreflang, dan `og:url` di `dist/` memakai domain baru, dan tidak ada sisa alamat lama di `src/` maupun `astro.config.mjs`

## 2. CV publik

- [x] 2.1 Tambah dev dependency `playwright-core` dan `unpdf`
- [x] 2.2 Tulis `cv/CV-Gionova-ID.html` dari isi CV pemilik: satu kolom A4, kontak hanya email/LinkedIn/GitHub/"Bekasi, Indonesia", tanpa Data Pribadi, klaim HMTI disesuaikan
- [x] 2.3 Tulis `scripts/build-cv.mjs` (Chrome sistem → `public/cv/CV-Gionova-ID.pdf`) dan script `npm run cv`, dengan pesan jelas bila Chrome tidak ada
- [x] 2.4 Jalankan `npm run cv`, periksa PDF (2 halaman atau kurang, teks bisa diseleksi), dan pastikan tombol "Unduh CV" muncul di hero dan kontak (ID) serta berlabel bahasa di `/en`
- [x] 2.5 Perbarui `public/cv/README.md` dan `README.md`: cara mengubah sumber CV dan membuat ulang PDF

## 3. Pemeriksaan privasi untuk PDF

- [x] 3.1 Perluas `scripts/check-privacy.mjs`: ekstrak teks `public/cv/*.pdf` dengan `unpdf` dan periksa dengan pola yang sama, ditambah pola alamat berlabel
- [x] 3.2 Uji negatif: PDF uji yang berisi nomor HP palsu membuat check gagal; PDF CV asli lolos

## 4. Copy beranda

- [x] 4.1 Hero (ID & EN): kalimat pertama menyebut magang 12 bulan sebagai Software Developer di PT Denso, dengan metode kerja dalam bahasa awam
- [x] 4.2 Tahap Spesifikasi: OpenSpec beserta penjelasan satu kalimat; bab 2026 tanpa "(OpenSpec)" telanjang
- [x] 4.3 Bukti tahap Pengujian: "98 test, termasuk aturan kursi yang diuji 250 kali per tipe pesawat" (ID & EN); pastikan beranda tidak lagi memuat kata "assertion", sementara case study Airline masih memuatnya

## 5. Keahlian

- [x] 5.1 Susun ulang `capabilities` di `src/content/home.ts` menjadi 5 bidang (Backend, Frontend, Database, Testing & Tools, Data & Otomasi) dengan teknologi dan project bukti sesuai design
- [x] 5.2 Pastikan Prisma/Eloquent hanya ada di Database dan SQL Server/MySQL tidak ada di Data & Otomasi

## 6. Verifikasi & rilis

- [x] 6.1 `astro check` dan `npm run build` (termasuk legacy CSS dan privasi) lolos
- [x] 6.2 Playwright: hero maksimal 3 baris di 1366×768 (ID & EN), lima baris Keahlian membuka saat hover dan terbuka di 390px, tidak ada scroll horizontal di 360/1440
- [ ] 6.3 Commit, push, lalu verifikasi di `https://yantogio.vercel.app`: canonical benar, CV terunduh, alamat lama dialihkan
- [x] 6.4 Tambah catatan revisi ini ke halaman `/how-i-built-this` (ID & EN)
