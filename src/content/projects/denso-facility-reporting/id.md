---
title: Sistem Pelaporan Keluhan Fasilitas
summary: Saluran pelaporan keluhan fasilitas untuk seluruh karyawan PT Denso Manufacturing Indonesia, dibangun sepenuhnya di atas layanan yang sudah diizinkan kebijakan TI perusahaan.
role: Software Developer Intern
period: Jan-Des 2025
stack: [Microsoft Forms, Power Automate, OneDrive, Python, SQL Server, PHP CodeIgniter 3, Power BI, Power Apps]
highlights: ["Magang 12 bulan", "End-to-end, dari form ke dasbor", "Di dalam kebijakan TI korporat"]
featured: true
order: 4
confidential: true
diagram:
  caption: Alur data laporan keluhan, dari karyawan sampai tim Facility.
  nodes:
    - label: Microsoft Forms
      note: diisi karyawan
    - label: Power Automate
      note: memicu alur saat ada laporan
    - label: OneDrive
      note: penampung data mentah
    - label: Skrip Python (ETL)
      note: membersihkan & memuat data
    - label: SQL Server
    - label: Web monitoring CodeIgniter 3
      note: dipakai tim Facility
---

## Masalah

Karyawan butuh cara yang mudah untuk melaporkan keluhan fasilitas, dan tim Facility butuh satu tempat untuk memantau serta menindaklanjutinya. Tantangannya: kebijakan keamanan TI perusahaan sangat ketat, sehingga layanan atau server baru tidak bisa begitu saja dipasang.

## Pendekatan

Alih-alih meminta pengecualian kebijakan, saya merancang integrasi di atas layanan Microsoft 365 yang **sudah diizinkan**, dijalankan lewat akun karyawan penanggung jawab proyek yang menyetujui implementasinya. Alurnya: Microsoft Forms → Power Automate → OneDrive → skrip Python (ETL) → SQL Server → aplikasi web monitoring PHP CodeIgniter 3.

Saya terlibat di seluruh siklus pengembangan: mengumpulkan kebutuhan dari pengguna, merancang, membangun, hingga deployment.

## Pekerjaan lain selama magang

- **Dasbor Power BI** untuk memantau daily check sheet tim Facility. Data mengalir otomatis Microsoft Forms → Power Automate → Excel, sehingga hasil inspeksi harian langsung tersaji tanpa rekap manual.
- **Aplikasi pemindai barcode** berbasis Power Apps dengan penyimpanan data di Excel Microsoft 365.

## Catatan

Ini sistem internal perusahaan, sehingga tidak ada tangkapan layar maupun kode sumber yang ditampilkan. Hanya arsitektur dan peran saya.
