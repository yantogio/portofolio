---
title: Airline Voucher Seat Assignment
summary: REST API dan antarmuka untuk membagikan tiga kursi acak per voucher penerbangan, tanpa kursi ganda dan tanpa voucher ganda, bahkan saat permintaan datang bersamaan.
role: Pengembang tunggal
period: 2026
stack: [Laravel 13, React 19, Vite, SQLite, Eloquent]
repo: https://github.com/yantogio/airline-voucher-seats
highlights: ["98 test", "Diuji 250× per tipe pesawat", "Tanpa voucher ganda", "4 change OpenSpec"]
featured: true
order: 2
diagram:
  caption: Jaminan “satu voucher per penerbangan per tanggal” ada di database, bukan di kode aplikasi.
  nodes:
    - label: React 19
      note: tanggal dikirim apa adanya (YYYY-MM-DD)
    - label: Form Request
      note: validasi → 422
    - label: SeatGeneratorService
      note: ambil 3 dari kumpulan kursi valid
    - label: SQLite
      note: unique(flight_number, flight_date)
    - label: Respons
      note: 201 dibuat · 409 sudah ada
---

## Masalah

Kru memasukkan data penerbangan, menekan **Generate Vouchers**, dan sistem harus memberi tiga kursi acak yang valid untuk tipe pesawatnya, serta menolak membuat voucher kedua untuk penerbangan dan tanggal yang sama.

## Keputusan teknis

- **Pencegahan duplikat di database.** Tabel `vouchers` punya unique constraint pada `(flight_number, flight_date)`. Endpoint `/api/check` hanya membantu UI; dua permintaan bersamaan bisa sama-sama lolos pengecekan, dan hanya constraint yang menghentikan penulisan kedua. Pelanggaran constraint ditangkap secara sempit dan dikembalikan sebagai **409**. Error database lain tetap dilempar, dan ada test yang memastikannya.
- **409, bukan 422.** Input yang valid tapi sudah ada bukan kesalahan validasi. Kode status yang berbeda membuat UI bisa bercabang tanpa membaca isi pesan.
- **Kursi diambil dari kumpulan yang sudah valid.** Service menyusun semua kursi yang ada di tipe pesawat itu, lalu mengambil tiga tanpa pengembalian. ATR tidak punya kolom B dan E, jadi kursi `5B` mustahil muncul: benar karena konstruksinya, bukan karena validasi yang harus diingat.
- **Format tanggal dikunci ISO.** Karena constraint membandingkan string, menerima beberapa format akan membuat `2025-07-12` dan `12/07/2025` dianggap dua penerbangan berbeda. Frontend juga tidak pernah membuat objek `Date` untuk tanggal yang dikirim, agar zona waktu tidak menggeser hari.

## Bukti

**98 test dengan sekitar 16.000 assertion.** Kursi diacak, jadi satu kali percobaan bisa saja lolos karena kebetulan. Setiap aturan pembuatan kursi diuji 250 kali per tipe pesawat. Test juga mencakup seluruh matriks validasi, pencegahan duplikat, contoh payload dari spesifikasi, dan CORS (kerusakan CORS tidak terlihat oleh test lain, hanya di browser).
