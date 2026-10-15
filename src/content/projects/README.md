# Project

Satu project = satu folder. Nama folder = alamat halaman (`/projects/<nama-folder>`).

```
nama-project/
├── id.md            ← teks Bahasa Indonesia (wajib)
├── en.md            ← teks English (wajib)
├── cover.png        ← gambar kartu (opsional; tanpa ini kartu memakai tampilan tipografi)
└── screens/         ← screenshot (opsional), tampil sebagai galeri
    ├── 01-dashboard.png      ← urutan mengikuti angka di depan
    └── 02-laporan.png        ← nama file jadi keterangan: "Laporan"
```

Cara menambah project: salin folder project yang sudah ada, ganti teks & gambarnya, lalu push.

Field penting di bagian atas `id.md` / `en.md`:

- `repo:` link GitHub → tombol **GitHub** muncul.
- `demo:` link situs live → tombol **Live** muncul. Kosongkan/hapus bila belum ada.
- `featured: true` → tampil di beranda. `order:` angka kecil tampil lebih dulu.
- `confidential: true` → untuk sistem internal: galeri & link repo disembunyikan.
- `diagram:` daftar langkah arsitektur (lihat contoh di project lain).
