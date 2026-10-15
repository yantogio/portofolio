# CV

| Nama file             | Dipakai di           |
|-----------------------|----------------------|
| `CV-Gionova-ID.pdf`   | Situs Bahasa Indonesia, dan situs English (dengan keterangan "in Indonesian") |
| `CV-Gionova-EN.pdf`   | Situs English (opsional; bila ada, dipakai menggantikan CV Indonesia) |

`CV-Gionova-ID.pdf` **dibuat otomatis** dari `cv/CV-Gionova-ID.html`. Jangan edit PDF-nya langsung.

Cara memperbarui CV:

1. Ubah isi `cv/CV-Gionova-ID.html` (teks biasa di dalam tag HTML).
2. Jalankan `npm run cv` (butuh Google Chrome di komputer).
3. Commit dan push. Situs akan memakai PDF baru.

CV ini versi publik: **tanpa** nomor HP, tanggal lahir, jenis kelamin, agama, status pernikahan, dan alamat detail. Build akan gagal bila data tersebut ditemukan di PDF. Versi lengkap tetap dikirim langsung ke HR.
