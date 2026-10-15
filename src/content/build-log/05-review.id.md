---
title: Direvisi setelah review eksternal
stage: Review
order: 5
---

Setelah online, situs ini saya minta untuk direview oleh AI lain. Lima temuannya saya cek satu per satu terhadap kode sebelum diperbaiki, lalu dicatat sebagai change OpenSpec baru (`refine-content-after-review`):

- **Alamat kanonis** masih menunjuk alamat Vercel lama setelah domain pindah ke `yantogio.vercel.app`. Perbaikannya cukup satu baris konfigurasi.
- **Tombol unduh CV** belum pernah muncul. Sekarang ada CV publik yang dibuat dari sumber HTML di repo, tanpa nomor HP dan data pribadi. Pemeriksaan privasi otomatis kini juga membaca isi PDF-nya.
- **Status magang** di PT Denso kini disebut di kalimat pertama, bukan baru terlihat di bagian bawah.
- **Istilah teknis di beranda** diganti bahasa yang lebih mudah dipahami. Angka seperti jumlah assertion tetap ada di halaman case study untuk pembaca teknis.
- **Kategori keahlian** disusun ulang mengikuti CV menjadi lima bidang. ORM tidak lagi tercampur dengan alat testing.

Satu saran tidak saya ambil: membedakan keahlian "sehari-hari" dan "pernah dipakai". Label kemahiran yang dinilai sendiri mudah menjadi bumerang di wawancara. Setiap bidang tetap menunjuk satu project sebagai bukti.
