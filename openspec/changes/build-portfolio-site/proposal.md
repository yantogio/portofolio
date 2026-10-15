## Why

Yanto (Muhammad Hariyanto Gionova) baru lulus S1 Teknik Informatika dan sudah 12 bulan magang sebagai Software Developer, tapi belum punya tempat publik yang menampilkan project, cara kerja, dan perjalanan kariernya. CV PDF tidak bisa menunjukkan *bagaimana* ia membangun software. Ia butuh portofolio online yang bisa dilihat siapa saja, juga setelah ia bekerja nanti, dan menegaskan positioning sebagai **AI-assisted developer yang disiplin**: AI mempercepat pekerjaannya, sementara spec dan test memastikan hasilnya benar.

## What Changes

- Situs portofolio statis baru (Astro + Tailwind CSS + TypeScript) tanpa backend dan tanpa CMS.
- Dua bahasa: Bahasa Indonesia (default, `/`) dan English (`/en`), dengan pengalih bahasa.
- Homepage yang bercerita: Hero dengan nama lengkap dan ringkasan profesional, Keahlian (empat bidang interaktif dengan bukti project), Pengalaman (garis waktu dari SMK hingga lulus, dengan project muncul di periode pembuatannya), Metode Kerja (spesifikasi → pengembangan → pengujian → rilis), Sertifikasi & Pendidikan, dan Kontak.
- Halaman case study per project (`/projects/<slug>`) untuk HMTI, Smart Wealth Monitor, Airline Voucher Seats, dan Vehicle Registry, serta pengalaman Denso yang ditampilkan lewat diagram arsitektur (tanpa screenshot internal).
- Halaman `/how-i-built-this` yang mendokumentasikan proses pembuatan situs ini sendiri.
- Konten dan media berbasis file dengan konvensi "nama file = fungsi": cukup taruh foto profil, foto per bab pengalaman, screenshot, PDF sertifikat, dan PDF CV di folder yang sudah ditentukan.
- Semua foto bisa diklik untuk dibuka besar di lightbox, dengan tautan ke ukuran asli.
- Navigasi yang tidak menutupi konten: header ikut tergulir, ditambah tombol menu bundar yang membuka menu layar penuh.
- Satu file konfigurasi profil, termasuk saklar status "open to work" yang mudah diubah.
- Satu tema visual tetap, gelap dan hangat (tanpa toggle dark/light), dirancang dengan alur skill design-taste-frontend → image-to-code → playwright-cli → web-design-guidelines, dengan aturan anti AI-slop. Arah pertama (terang, "gambar kerja") ditolak pemilik setelah review dan diganti; riwayatnya dicatat di design-direction.md dan halaman `/how-i-built-this`.
- Deploy gratis ke Vercel via GitHub, domain `yantogio.is-a.dev` (cadangan `*.vercel.app`), dan Vercel Web Analytics yang hanya terlihat di dashboard pemilik.

## Capabilities

### New Capabilities
- `site-i18n`: routing dua bahasa (ID default, EN), pengalih bahasa, dan string UI terjemahan.
- `profile-config`: satu sumber data profil (nama, headline, status open-to-work, link kontak, foto) beserta aturan privasi data pribadi.
- `project-showcase`: koleksi project berbasis folder, kartu project, halaman case study, galeri screenshot otomatis, fallback diagram tanpa cover, tombol tautan kondisional (GitHub, Live), dan lightbox foto.
- `home-page`: susunan dan isi section homepage (Hero, Keahlian, Pengalaman dengan project, Metode Kerja, Kredensial, Kontak), foto per bab, dan navigasi.
- `credentials`: daftar sertifikat dari folder PDF, ringkasan pendidikan, dan unduhan CV sesuai bahasa aktif.
- `build-log-page`: halaman `/how-i-built-this` yang menampilkan proses pembuatan situs.
- `design-quality`: satu tema tetap, aturan anti AI-slop, aksesibilitas, responsivitas, performa, dan verifikasi visual.
- `deployment`: build statis, hosting Vercel, domain gratis, dan analytics privat.

### Modified Capabilities
<!-- Belum ada spec sebelumnya; proyek baru. -->

## Impact

- Repo baru di `C:\Portofolio` (git init), lalu dipush ke GitHub `yantogio`.
- Dependensi: Astro, Tailwind CSS, TypeScript, `@vercel/analytics`, font Fontsource (Bricolage Grotesque, Hanken Grotesk, JetBrains Mono), ikon `@phosphor-icons/core`. Playwright CLI dipakai untuk verifikasi UI (global, bukan dependensi project).
- Canva (generate-image) dipakai untuk gambar referensi desain.
- Layanan eksternal: GitHub, Vercel (akun dibuat sendiri oleh Yanto lewat "Continue with GitHub"), is-a.dev (pendaftaran subdomain lewat pull request dari akun GitHub Yanto).
- Sumber konten: CV Yanto serta README dan folder `openspec/` di repo `github.com/yantogio/*`. Draft case study dan teks EN disusun Claude, lalu direview Yanto.
