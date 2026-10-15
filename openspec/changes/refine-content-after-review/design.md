## Context

Situs sudah online di `https://yantogio.vercel.app`. Alamat lama `portofolio-steel-beta-47.vercel.app` dialihkan Vercel (307), tapi `site` di `astro.config.mjs` masih alamat lama, sehingga canonical, hreflang, dan `og:url` menunjuk alamat yang dialihkan.

Komponen `CvButton` sudah siap dan akan muncul sendiri begitu ada file di `public/cv/`, tapi folder itu masih kosong. CV asli pemilik memuat bagian Data Pribadi dan nomor HP. Pemilik tidak keberatan data itu publik, tapi setuju untuk tidak menampilkannya.

Teks beranda ada di `src/content/home.ts`, dan perubahan konten di change ini terpusat di sana.

## Goals / Non-Goals

**Goals:**
- Canonical, hreflang, dan Open Graph menunjuk domain final.
- Tombol "Unduh CV" muncul dan mengunduh CV publik yang rapi, ramah ATS, dan bebas data pribadi.
- Status magang terlihat di kalimat pertama hero.
- Istilah dan angka di beranda dipahami pembaca non-teknis, sementara halaman case study tetap teknis.
- Kategori keahlian akurat dan konsisten dengan CV.

**Non-Goals:**
- Tidak mengubah desain, layout, atau komponen halaman.
- Tidak menambah label tingkat kemahiran pada keahlian (keputusan pemilik).
- Tidak membuat CV versi English. Situs EN memakai CV ID dengan keterangan bahasa, perilaku yang sudah ada.
- Tidak mengubah arsip `openspec/changes/archive/*`, yang merupakan catatan sejarah.
- Tidak mendaftarkan domain lain (is-a.dev dibatalkan).

## Decisions

### 1. Domain: cukup ubah `site`
Semua URL absolut (canonical, hreflang, `og:url`) sudah diturunkan dari `Astro.site` di `BaseLayout`. Jadi cukup satu baris di `astro.config.mjs`. Redirect alamat lama ditangani Vercel, bukan kode.
- *Alternatif ditolak:* cari-ganti di seluruh repo. Itu ikut mengubah arsip OpenSpec dan tidak memberi manfaat apa pun.

### 2. CV publik: HTML sumber + PDF yang di-commit
- **Sumber:** `cv/CV-Gionova-ID.html`, satu file HTML mandiri dengan CSS cetak (A4, satu kolom, teks asli tanpa gambar). Satu kolom dan teks yang bisa diseleksi membuatnya ramah ATS.
- **Generator:** `scripts/build-cv.mjs` memakai `playwright-core` dengan Chrome yang terpasang di sistem (`channel: 'chrome'`) untuk mencetak HTML ke `public/cv/CV-Gionova-ID.pdf`. Dijalankan dengan `npm run cv`.
- **PDF di-commit**, bukan dibuat saat build di Vercel, karena lingkungan build Vercel tidak menyediakan Chrome. CV juga jarang berubah.
- **Isi:** diambil dari CV pemilik, dengan perubahan:
  - kontak hanya email, LinkedIn, GitHub, dan "Bekasi, Indonesia";
  - bagian Data Pribadi dihapus;
  - "masih digunakan aktif oleh HMTI" diganti "di-deploy dan dipakai pengurus HMTI";
  - status magang Denso tetap seperti di CV asli.
- *Alternatif ditolak:* halaman `/cv` di Astro yang dicetak, karena menambah rute publik yang duplikat dengan beranda. Meminta pemilik mengekspor ulang dari Word juga ditolak, karena dua sumber berisiko berbeda isi dan tidak bisa diperiksa otomatis.

### 3. Pemeriksaan privasi untuk PDF
`scripts/check-privacy.mjs` juga mengekstrak teks dari `public/cv/*.pdf` dengan `unpdf` (dev dependency, murni JS, tanpa native binary, jalan di Vercel), lalu memeriksanya dengan pola yang sama seperti HTML.
- Hanya `public/cv/` yang diperiksa. PDF sertifikat adalah dokumen resmi dari penerbit dan tidak diubah.
- Polanya ditambah pola alamat tingkat kecamatan: label "Alamat:" atau "Lokasi:" yang diikuti lebih dari sekadar kota. Polanya umum dan tidak memuat data asli.

### 4. Bahasa beranda: dua lapis pembaca
Beranda ditulis untuk HR dan recruiter, sedangkan case study untuk engineer.
- **Hero (draf):**
  - ID: "Lulusan Teknik Informatika dengan 12 bulan magang sebagai Software Developer di PT Denso Manufacturing Indonesia. Membangun REST API dan aplikasi web yang teruji sejak awal."
  - EN: "Informatics Engineering graduate with a 12-month Software Developer internship at PT Denso Manufacturing Indonesia. I build REST APIs and web apps that are tested from the start."
  - Kalimat kedua sempat dipangkas karena versi awal memakan 4 baris di 1366×768.
- **Tahap Spesifikasi:** menyebut OpenSpec beserta penjelasannya, "kebutuhan ditulis dulu sebagai skenario yang bisa diuji, sebelum mulai coding".
- **Bukti tahap Pengujian:** "98 test, termasuk aturan kursi yang diuji 250 kali per tipe pesawat". Angka ±16.000 assertion tetap ada di case study Airline.
- **Bab 2026:** "(OpenSpec)" diganti penjelasan singkat yang sama.

### 5. Keahlian: lima bidang, satu project bukti berbeda per bidang
| Bidang | Teknologi | Bukti |
|---|---|---|
| Backend | PHP, Laravel, CodeIgniter 3, NestJS, Spring Boot, Python, REST API | Vehicle Registry (arsitektur berlapis, error handler terpusat) |
| Frontend | Vue 3, React, JavaScript, Tailwind CSS, Bootstrap | HMTI (SPA Vue 3, skripsi nilai A) |
| Database | SQL Server, MySQL, SQLite, Prisma, Eloquent | Airline Voucher Seats (unique constraint, aman dari race condition) |
| Testing & Tools | PHPUnit, GitHub Actions CI, OpenSpec, Git | Smart Wealth Monitor (39 test + CI) |
| Data & Otomasi | Power BI, Power Automate, Power Apps, Excel | PT Denso (magang 12 bulan) |

Setiap project muncul tepat sekali, sehingga tidak ada bukti yang berulang.

## Risks / Trade-offs

- **[CV di situs berbeda dari CV yang dikirim ke HR]** → Isi profesionalnya sama. Yang beda hanya kontak dan Data Pribadi. README menjelaskan cara memperbarui keduanya.
- **[PDF basi setelah CV berubah]** → `npm run cv` mudah dijalankan ulang. Task mencatat bahwa PDF harus dibuat ulang setiap kali sumber berubah.
- **[`playwright-core` tidak menemukan Chrome di mesin lain]** → Hanya dibutuhkan saat membuat CV secara lokal, bukan saat build. Script menampilkan pesan jelas bila Chrome tidak ditemukan.
- **[Ekstraksi teks PDF gagal di Vercel]** → `unpdf` murni JS. Bila tetap gagal, check melaporkan error dan build gagal, alih-alih diam-diam melewati PDF.
- **[Hero lebih dari tiga baris]** → Diverifikasi dengan Playwright di 1366×768. Copy dipangkas bila perlu.

## Migration Plan

Ubah `site` → push → verifikasi canonical di produksi. Tidak ada migrasi data. Rollback lewat "Promote" deployment sebelumnya di Vercel.
