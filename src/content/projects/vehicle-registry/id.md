---
title: Vehicle Registry
summary: Aplikasi CRUD data kendaraan berbasis Spring Boot dengan arsitektur berlapis, validasi sisi server, dan penanganan error terpusat.
role: Pengembang tunggal
period: 2026
stack: [Java 17, Spring Boot 3.2, Spring Data JPA, Bean Validation, H2, Bootstrap 5, jQuery]
repo: https://github.com/yantogio/vehicle-registry
highlights: ["Controller → Service → Repository", "Error handler terpusat", "Validasi sisi server", "8 asumsi terdokumentasi"]
featured: true
order: 5
diagram:
  caption: Setiap lapisan punya satu tanggung jawab; error dari mana pun dikembalikan dalam format yang sama.
  nodes:
    - label: KendaraanController
      note: REST /api/vehicles
    - label: KendaraanService
      note: aturan bisnis, validasi tahun
    - label: KendaraanRepository
      note: Spring Data JPA
    - label: Entity Kendaraan
      note: H2 mode file, siap MySQL
---

## Masalah

Membangun aplikasi pendataan kendaraan bermotor (monitoring dengan pencarian dan pagination, form tambah/ubah/detail, dan penghapusan dengan konfirmasi) dari sebuah spesifikasi tertulis beserta mockup-nya.

## Struktur

Kode dipisah menjadi **Controller → Service → Repository → Entity**, dengan DTO request/response terpisah dan satu `@RestControllerAdvice` sebagai penangan error terpusat. Semua error (400 validasi, 404, 409 nomor registrasi ganda, dan 500) memakai struktur body yang sama, sehingga frontend cukup menangani satu bentuk.

- **Validasi di server**, bukan hanya atribut HTML. Batas atas tahun pembuatan mengikuti tahun berjalan; karena anotasi Bean Validation hanya menerima konstanta, batas itu diperiksa di service dan dilaporkan dalam format error yang sama persis.
- **PUT memakai nomor registrasi dari path**, bukan dari body, sehingga perubahan data tidak pernah membuat baris baru.
- **Urutan data deterministik.** Tanpa `ORDER BY` eksplisit, database tidak menjamin urutan, sehingga satu baris bisa muncul di dua halaman. Data diurutkan berdasarkan nomor registrasi.

## Saat spesifikasi bertentangan

Tabel requirement menyebut *Warna Kendaraan* sebagai teks dan *Bahan Bakar* sebagai dropdown berisi Merah, Hitam, Biru, Abu-Abu, sementara mockup menunjukkan kebalikannya. Saya mengikuti mockup, dengan tiga alasan tertulis: isi dropdown jelas nama warna, placeholder mockup menunjukkan pola dropdown, dan seed data yang diminta (Bahan Bakar = "Bensin") tidak akan bisa disimpan bila daftar itu dipasang di Bahan Bakar.

Delapan asumsi seperti ini didokumentasikan di README, termasuk apa yang sengaja **tidak** dikerjakan.
