---
title: Diperiksa di browser sungguhan
stage: Verifikasi
order: 3
image: ./v2-hero.png
imageAlt: "Versi kedua di layar 1440 px: headline dua baris, tombol utama terlihat tanpa scroll."
---

Setiap halaman dibuka dengan Playwright dalam dua bahasa, di lebar 360, 390, 1366, dan 1440 px. Yang diperiksa:

- **Tidak ada scroll horizontal** di semua lebar layar.
- **Hero muat di layar laptop kecil** (1366×768): tombol utama berakhir di 620 px dari 768 px.
- **Pengalih bahasa** membawa pengunjung ke halaman yang sama, bukan kembali ke beranda.
- **Tombol Live** hanya muncul di project yang benar-benar online.
- **Fokus keyboard** terlihat di setiap elemen yang bisa diklik.
- **Reduced motion:** saat perangkat meminta animasi dikurangi, semua konten langsung terlihat.

Pemeriksaan ini menemukan masalah nyata di kedua versi. Di versi pertama, headline hero terpecah jadi tiga baris. Di versi kedua, saat mode animasi dikurangi, dua baris headline sempat menyatu, dan diagram enam langkah terlalu sempit di dalam kartu. Semuanya diperbaiki lalu diperiksa ulang.

Ada juga pemeriksaan privasi otomatis yang berjalan di setiap build. Build gagal bila halaman memuat pola nomor HP atau data pribadi lain.
