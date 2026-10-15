# Portofolio Yanto

Situs portofolio Muhammad Hariyanto Gionova. Dibangun dengan [Astro](https://astro.build) dan Tailwind CSS, berupa situs statis tanpa backend dan tanpa database.

- Bahasa Indonesia di `/`, English di `/en`
- Proses pembuatannya bisa dibaca di halaman `/how-i-built-this`
- Spec dan keputusan desain ada di [`openspec/changes/build-portfolio-site/`](openspec/changes/build-portfolio-site/)

## Menjalankan di komputer sendiri

Butuh Node.js 22 atau lebih baru.

```bash
npm install
npm run dev       # buka http://localhost:4321
npm run build     # build ke folder dist/ + pemeriksaan privasi otomatis
```

Setiap `git push` ke branch `main` otomatis meng-update situs online (lewat Vercel).

---

## Panduan mengubah isi

Semua isi cukup diubah lewat file. Tidak ada kode yang perlu disentuh.

### Ganti foto

Taruh foto di `src/assets/me/` dengan nama:

| Nama file      | Wajib? | Dipakai di          |
|----------------|--------|---------------------|
| `portrait.jpg` | Ya     | Foto utama (hero)   |

Format `.jpg`, `.png`, atau `.webp` boleh, dan ukuran asli bebas karena situs mengompres otomatis. Untuk mengganti foto, timpa saja file dengan nama yang sama.

Foto opsional untuk tiap bab Pengalaman: `src/assets/journey/2015.jpg`, `2018.jpg`, `2020.jpg`, `2022.jpg`, `2025.jpg`, `2026.jpg` (nama file = tahun bab).

### Ubah status "terbuka untuk kerja"

Buka `src/config/profile.ts`:

```ts
openToWork: true,   // ubah ke false setelah kamu bekerja
status: {
  available: { id: 'Terbuka untuk peran ...', en: 'Open to ... roles' },
  current:   { id: 'Software Developer di PT ...', en: 'Software Developer at PT ...' },
},
```

- `openToWork: true` menampilkan teks `available` dengan titik oranye.
- `openToWork: false` menampilkan teks `current`. Kosongkan bila tidak ingin menampilkan apa pun.

File yang sama juga berisi nama, headline, email, LinkedIn, dan GitHub.

### Tambah atau ubah project

Satu project = satu folder di `src/content/projects/`. Nama folder menjadi alamat halaman (`/projects/nama-folder`).

```
src/content/projects/nama-project/
├── id.md            ← teks Bahasa Indonesia (wajib)
├── en.md            ← teks English (wajib)
├── cover.png        ← gambar kartu (opsional; tanpa ini kartu menampilkan diagram)
└── screens/         ← screenshot (opsional), otomatis jadi galeri
    ├── 01-dashboard.png      ← urutan mengikuti angka di depan
    └── 02-laporan.png        ← nama file jadi keterangan: "Laporan"
```

Cara paling mudah adalah menyalin folder project yang sudah ada, lalu mengganti isinya. Field penting di bagian atas `id.md` / `en.md`:

| Field          | Fungsi |
|----------------|--------|
| `repo`         | link GitHub, memunculkan tombol **GitHub** |
| `demo`         | link situs live, memunculkan tombol **Live**. Hapus bila belum ada |
| `featured`     | `true` = tampil di beranda |
| `order`        | urutan; angka kecil tampil lebih dulu |
| `confidential` | `true` untuk sistem internal; galeri dan link repo disembunyikan |
| `diagram`      | daftar langkah arsitektur (lihat contoh di project lain) |

Bila ada kesalahan (misalnya link `repo` tidak valid), `npm run build` akan menyebut file dan field yang salah.

### Tambah sertifikat

1. Taruh PDF di `src/content/certificates/` dengan nama yang tertulis di `certificates.yaml`.
2. Untuk sertifikat baru, tambahkan juga satu entri di `certificates.yaml`.

Sertifikat yang PDF-nya belum ditaruh tetap tampil, hanya tanpa tombol "Lihat PDF".

### Ganti CV

Taruh di `public/cv/`:

- `CV-Gionova-ID.pdf` untuk situs Bahasa Indonesia
- `CV-Gionova-EN.pdf` untuk situs English (opsional; tanpa file ini, situs English memakai CV Indonesia)

Tombol "Unduh CV" muncul otomatis setelah file ada.

### Ubah teks beranda

Teks hero, keahlian, pengalaman, metode kerja, pendidikan, dan kontak ada di `src/content/home.ts`. Teks tombol dan menu ada di `src/i18n/id.ts` dan `src/i18n/en.ts`.

---

## Privasi

`npm run build` menjalankan `scripts/check-privacy.mjs`. Build **gagal** bila ada halaman yang memuat pola nomor HP, tanggal lahir, agama, status pernikahan, atau jenis kelamin. Jangan menambahkan data pribadi tersebut ke situs.

## Statistik pengunjung

Memakai Vercel Web Analytics, tanpa cookie. Statistik hanya bisa dilihat di dashboard Vercel (tab **Analytics**) dan tidak pernah tampil di situs.
