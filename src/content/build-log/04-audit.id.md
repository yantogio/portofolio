---
title: Diaudit terhadap pedoman antarmuka
stage: Audit
order: 4
image: ./v2-project.png
imageAlt: "Halaman studi kasus di versi kedua, dengan diagram arsitektur dari data."
---

Kode antarmuka diaudit terhadap Web Interface Guidelines dari Vercel. Tidak ada temuan berat. Temuan yang diperbaiki:

- format bulan sertifikat kini memakai `Intl.DateTimeFormat`, bukan nama bulan yang ditulis manual,
- nama teknologi dan identifier kode diberi `translate="no"` agar tidak rusak saat diterjemahkan otomatis oleh browser,
- font utama di-preload untuk mengurangi pergeseran teks saat halaman dimuat,
- token kode yang panjang bisa patah baris di layar ponsel,
- animasi penanda status berhenti setelah beberapa kali berdenyut,
- label tombol berbahasa Inggris memakai Title Case.

Pemeriksaan anti-slop terakhir menyisir hasil build: tidak ada em-dash, tidak ada frasa generik, dan setiap angka berasal dari repositori atau CV.
