## Why

Review eksternal atas situs yang sudah online menemukan lima hal yang melemahkan kesan pertama dan kepercayaan pembaca:

- link kanonis masih menunjuk alamat lama padahal domain sudah pindah,
- tombol unduh CV tidak pernah muncul,
- status magang baru terlihat di bagian bawah,
- beberapa istilah dan angka terlalu teknis untuk pembaca non-teknis,
- dua kategori keahlian berisi teknologi yang salah tempat.

Semuanya kecil, tapi justru hal-hal ini yang dinilai recruiter dalam beberapa detik pertama.

## What Changes

- **Domain final:** `https://yantogio.vercel.app`. Alamat lama sudah dialihkan Vercel (307). Setting `site` diperbarui, sehingga canonical, hreflang, dan Open Graph ikut benar. Rencana domain is-a.dev **dibatalkan**.
- **CV publik:** CV Bahasa Indonesia dibuat sebagai PDF dari isi CV pemilik, **tanpa** bagian Data Pribadi (tanggal lahir, jenis kelamin, agama, status), tanpa nomor HP dan alamat detail, serta tanpa klaim "masih digunakan aktif oleh HMTI" yang sudah tidak akurat. File ditaruh di `public/cv/CV-Gionova-ID.pdf`, sehingga tombol "Unduh CV" muncul. Situs English memakai CV yang sama dengan keterangan bahasa.
- **Pemeriksaan privasi** diperluas ke teks di dalam PDF CV.
- **Hero:** ringkasan menyebut "magang" secara eksplisit sejak kalimat pertama, dan istilah "pengembangan berbasis spesifikasi" diganti bahasa yang lebih membumi.
- **Bahasa ramah non-teknis di beranda:**
  - bukti "98 test, ±16.000 assertion" diganti "98 test, termasuk aturan kursi yang diuji 250 kali per tipe pesawat" (angka 16.000 tetap ada di halaman case study);
  - OpenSpec diberi penjelasan satu kalimat.
- **Keahlian disusun ulang menjadi 5 bidang mengikuti CV:** Backend, Frontend, Database, Testing & Tools, Data & Otomasi.
  - Prisma dan Eloquent pindah dari Testing ke Database.
  - SQL Server dan MySQL pindah dari Data & Otomasi ke Database.
  - Setiap bidang menunjuk project bukti yang berbeda.

## Capabilities

### New Capabilities
<!-- Tidak ada kapabilitas baru. -->

### Modified Capabilities
- `deployment`: requirement "Free domain" sekarang menetapkan `yantogio.vercel.app` sebagai domain final dan menghapus rencana is-a.dev.
- `home-page`:
  - "Hero leads with the owner's name": ringkasan wajib menyatakan status magang dan memakai bahasa non-teknis;
  - "Capabilities section": empat bidang menjadi lima, mengikuti CV, dengan pemetaan teknologi yang benar;
  - "How I Work section": bukti dan istilah di beranda wajib bisa dipahami pembaca non-teknis.
- `credentials`: tambahan requirement isi CV publik (tanpa data pribadi, tanpa klaim yang tidak akurat).
- `profile-config`: pemeriksaan privasi otomatis mencakup teks PDF CV.

## Impact

- **File:**
  - `astro.config.mjs`;
  - `src/content/home.ts`;
  - `public/cv/CV-Gionova-ID.pdf` (baru);
  - `scripts/check-privacy.mjs`;
  - sumber CV publik untuk dibuat ulang bila CV berubah (lokasi ditentukan di design).
- **Dependensi dev baru:** pustaka ekstraksi teks PDF untuk pemeriksaan privasi.
- **Tidak berubah:**
  - arsip `openspec/changes/archive/2026-10-15-build-portfolio-site/` (catatan sejarah);
  - tampilan dan struktur halaman;
  - isi halaman case study, kecuali bila ada istilah yang perlu diselaraskan.
