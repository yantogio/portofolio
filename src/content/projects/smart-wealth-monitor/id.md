---
title: Smart Wealth Monitor
summary: Dasbor investasi saham IDX dan emas yang menandai aset di bawah harga tertinggi 30 harinya dan mensimulasikan hasil strategi DCA.
role: Pengembang tunggal
period: 2026
stack: [Laravel 13, PHP 8.3, Blade, Tailwind CSS 4, Chart.js, SQLite]
repo: https://github.com/yantogio/smart-wealth-monitor
highlights: ["39 automated test", "CI GitHub Actions", "10 kapabilitas ber-spec", "Jalan offline dalam 1 menit"]
featured: true
order: 3
diagram:
  caption: Logika perhitungan ada di service, bukan di controller atau view.
  nodes:
    - label: Yahoo Finance · metalpriceapi
      note: saham IDX dan emas
    - label: API client
      note: gagal → dicatat, tidak melempar error
    - label: sync:prices
      note: hanya mengambil hari yang belum ada
    - label: historical_prices
      note: unique(asset, date)
    - label: Momentum, DCA, SMA
      note: service perhitungan
    - label: Dasbor Blade
---

## Masalah

Saya ingin tahu kapan aset yang memang ingin saya miliki sedang "turun harga" dibanding beberapa minggu terakhir, tanpa membuka beberapa aplikasi dan menghitung manual.

## Apa yang dikerjakan aplikasi

- **Deteksi diskon.** Setiap aset dibandingkan dengan harga tertinggi 30 hari terakhirnya. Bila harga penutupan terbaru lebih dari 5% di bawahnya, aset ditandai *Potensi Diskon*.
- **Simulator DCA.** Pilih aset, nominal bulanan, dan bulan mulai. Simulator membeli di harga penutupan pertama tiap bulan dan melaporkan modal, unit, nilai saat ini, serta berapa bulan yang benar-benar punya data. Celah data ditampilkan, bukan disembunyikan.
- **Sinkronisasi dua sumber.** Saham dari Yahoo Finance, emas dari metalpriceapi. Sinkronisasi bersifat *catch-up*: hanya hari yang belum tersimpan yang diambil, jadi aman dijalankan berulang.

## Cara saya membangunnya

Proyek ini dibangun spec-first dengan OpenSpec: sepuluh kapabilitas punya spec tertulis berisi skenario `WHEN … THEN` sebelum kodenya ditulis, dan skenario itu diterjemahkan langsung menjadi test.

- **39 test** mencakup perhitungan momentum dan DCA, kedua API client, perintah sync dan backfill, seeding data demo, dan render setiap halaman. Test berjalan di SQLite in-memory tanpa jaringan, sehingga CI tidak butuh service tambahan.
- **CI GitHub Actions** menjalankan seluruh test di setiap push.
- **Data demo nyata.** Repositori membawa sekitar setahun harga penutupan asli; `composer setup` menghasilkan dasbor terisi tanpa API key dan tanpa server database. Tanggal digeser agar jendela 30 hari tidak kosong, tetapi harganya tidak diubah.

## Batasan yang disengaja

Watchlist dibatasi empat aset (BBCA, BBRI, TLKM, emas) dan aplikasi tidak punya autentikasi. Ini alat lokal untuk satu pengguna, dan README menyatakannya dengan jelas. Tujuannya alat yang fokus dan ber-spec baik, bukan yang serba ada.
