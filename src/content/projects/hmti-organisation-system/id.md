---
title: Sistem Informasi Organisasi HMTI
summary: "Aplikasi web yang menggantikan spreadsheet dan folder Drive pribadi pengurus himpunan: anggota, iuran, dokumentasi, dan halaman publik dalam satu tempat."
role: Pengembang tunggal (skripsi)
period: 2026
stack: [Vue 3, Pinia, NestJS, Prisma, SQLite, Google Drive API, Passport JWT]
repo: https://github.com/yantogio/Project-web-HMTI
highlights: ["Nilai A sidang skripsi", "UAT 84,47%", "16 change OpenSpec", "Pernah di-deploy ke VPS"]
featured: true
order: 1
diagram:
  caption: Alur unggah dan unduh dokumen. File tidak pernah disimpan di server aplikasi.
  nodes:
    - label: Vue 3 SPA
      note: Pinia, role admin / anggota
    - label: NestJS API
      note: JWT + Google OAuth, rate limit 100/menit
    - label: Prisma + SQLite
      note: metadata, indeks pada driveFileId
    - label: Google Drive API
      note: file dialirkan per 64 KB, retry saat 429
---

## Masalah

Data himpunan tersebar di spreadsheet dan folder Google Drive milik pengurus yang berbeda-beda. Setiap pergantian pengurus, sebagian arsip ikut hilang; rekap iuran dikerjakan manual dan tunggakan sulit dilacak. Sebagai bendahara HMTI, saya merasakan masalah ini langsung.

## Pendekatan

Saya membangun satu Single Page Application dengan lima modul (**Anggota, Keuangan, Dokumentasi, Showcase, Profil**) ditambah landing page publik yang bisa dibuka tanpa login.

Pengembangan memakai alur spec-first: setiap perubahan ditulis dulu sebagai proposal OpenSpec (16 change terarsip, 25 spec), lalu diimplementasikan dengan bantuan AI dan diverifikasi terhadap skenario di spec.

## Keputusan teknis yang penting

- **File dialirkan, bukan ditampung.** Dokumen dan video disimpan di Google Drive. API meneruskannya dalam potongan 64 KB, sehingga video 100 MB hanya memakan memori sekitar satu potongan per permintaan.
- **Tahan terhadap batas kuota Drive.** Respons 429 dicoba ulang dengan exponential backoff (1, 2, 4 detik, maksimal lima kali). Respons 403/404 tidak dicoba ulang, karena file yang hilang tidak akan muncul sendiri.
- **Iuran otomatis.** Aturan iuran bisa dikonfigurasi; tagihan bulanan dan denda keterlambatan dibuat otomatis, dengan laporan tunggakan per anggota.
- **Impor massal.** Anggota bisa diimpor dari template Excel yang bisa diunduh dari aplikasi.
- **Siap produksi.** Rate limiting per IP, pencatatan memori berkala, dan graceful shutdown yang menutup stream ketika klien terputus di tengah unduhan.

## Hasil

- Lulus uji black-box dan User Acceptance Testing dengan tingkat penerimaan **84,47%**.
- Dipertahankan pada sidang skripsi dengan **nilai A**.
- Di-deploy ke VPS dan dipakai pengurus HMTI selama masa skripsi. Kodenya tetap terbuka di GitHub.

## Yang saya pelajari

Masalah terbesar justru muncul setelah deploy: konfigurasi URL API, JWT di produksi, dan performa di jaringan seluler. Setiap perbaikan itu tercatat sebagai change tersendiri. Riwayatnya bisa dibaca di folder `openspec/` repositori.
