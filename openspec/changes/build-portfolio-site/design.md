## Context

`C:\Portofolio` masih kosong, hanya berisi setup OpenSpec dan skill Claude. Pemilik situs adalah Yanto (Muhammad Hariyanto Gionova), lulusan S1 TI dengan pengalaman magang di PT Denso. Sehari-hari ia memakai PHP/Laravel, Vue, NestJS, dan Java. Ia ingin portofolio yang:

- bisa dilihat publik dan tetap relevan setelah ia bekerja,
- mudah diubah sendiri cukup dengan menaruh file di folder, tanpa fitur rumit atau CMS,
- dua bahasa (ID default, EN),
- satu tema visual tetap,
- gratis untuk hosting dan domain,
- terasa dirancang manusia, bukan template AI.

Mesin lokal sudah punya Node 24 dan Git. Skill yang tersedia: `design-taste-frontend`, `image-to-code`, `playwright-cli`, `web-design-guidelines`. Keempat repo sumber di `github.com/yantogio` punya `README.md` dan folder `openspec/`, yang menjadi bahan case study.

## Goals / Non-Goals

**Goals:**
- Situs statis cepat (Lighthouse ≥ 90) dengan konten berbasis file.
- Menambah atau mengganti project, foto, sertifikat, dan CV cukup dengan mengubah file di folder yang jelas.
- Positioning "AI-assisted developer" yang didukung bukti (spec, test, CI), bukan klaim.
- Proses pembuatan situs terdokumentasi untuk halaman `/how-i-built-this`.

**Non-Goals:**
- Tidak ada CMS, admin panel, login, database, atau backend.
- Tidak ada form kontak, blog, komentar, atau newsletter.
- Tidak ada toggle dark/light.
- Tidak ada dashboard statistik publik.
- Tidak ada live demo project untuk saat ini (field `demo` disiapkan untuk nanti).

## Decisions

### 1. Astro (static output) + Tailwind CSS v4 + TypeScript
Astro menghasilkan HTML statis tanpa runtime JS secara default, punya Content Collections dengan validasi schema (zod), optimasi gambar bawaan (`astro:assets`), dan routing i18n bawaan. Tailwind v4 dipasang lewat `@tailwindcss/vite`, dengan token desain di blok `@theme`.
- *Alternatif:* Next.js (lebih berat, butuh runtime React untuk konten statis), HTML polos (konten mudah duplikat dan tidak ada validasi), PHP (hosting gratis buruk).
- Interaktivitas kecil (pengalih bahasa, menu mobile, lightbox galeri) ditulis dengan `<script>` Astro biasa. React hanya ditambahkan bila arah desain benar-benar membutuhkan komponen interaktif.

### 2. Struktur folder dengan konvensi "nama file = fungsi"
```
src/
├── config/profile.ts              ← nama, headline, openToWork, kontak (satu-satunya file identitas)
├── i18n/{id,en}.ts + index.ts     ← kamus string UI; tipe `en` = tipe `id` agar key wajib sama
├── content/home.ts                ← teks beranda ID/EN + penempatan project per bab
├── assets/me/portrait.jpg         ← foto profil (hero)
├── assets/journey/<tahun>.jpg     ← foto opsional per bab Pengalaman
├── content/
│   ├── projects/<slug>/
│   │   ├── id.md, en.md           ← frontmatter + isi case study
│   │   ├── cover.{png,jpg,webp}   ← opsional
│   │   └── screens/NN-nama.png    ← opsional, urut nama file
│   ├── certificates/
│   │   ├── certificates.yaml      ← metadata: title, issuer, date, file, thumb?
│   │   └── *.pdf, *.jpg           ← PDF + thumbnail opsional
│   └── build-log/NN-tahap.{id,en}.md + gambar
├── components/  layouts/  pages/  styles/
public/cv/CV-Gionova-ID.pdf, CV-Gionova-EN.pdf
```
- Koleksi `projects` memakai `glob` loader untuk `*/{id,en}.md`. Slug diambil dari nama folder, bahasa dari nama file.
- `cover` dan `screens/` ditemukan dengan `import.meta.glob` (eager) per slug, lalu dirender dengan `<Image>`/`<Picture>`. Folder tanpa file tidak menghasilkan error.
- PDF sertifikat di-import via `import.meta.glob('…/*.pdf', { query: '?url' })` supaya ikut ter-hash dan terdeteksi saat build. Entri yang PDF-nya belum ada tetap tampil tanpa link.
- CV di `public/` karena nama file-nya harus stabil untuk dibagikan.
- *Alternatif:* metadata dalam frontmatter tiap gambar (terlalu ribet untuk pemilik), atau semua media di `public/` (tanpa optimasi gambar).

### 3. i18n: rute ganda tipis, satu komponen halaman
`astro.config` memakai `i18n: { defaultLocale: 'id', locales: ['id','en'], routing: { prefixDefaultLocale: false } }`. Tiap halaman punya file rute tipis di `src/pages/…` dan `src/pages/en/…` yang memanggil komponen halaman bersama dengan prop `lang`. Helper `getAltPath(path, lang)` dipakai untuk pengalih bahasa dan `hreflang`. Tidak ada redirect berdasarkan bahasa browser.
- *Alternatif:* `[lang]/` dinamis (default locale jadi berprefiks atau perlu redirect, yang bertentangan dengan "ID di `/`").

### 4. Diagram arsitektur sebagai komponen HTML/CSS, bukan gambar atau Mermaid
Diagram (Denso, Vehicle Registry, HMTI, dan lainnya) didefinisikan di frontmatter sebagai daftar node dan relasi sederhana (`diagram: [{ label, note }]`), lalu dirender oleh komponen `<FlowDiagram>`. Hasilnya bisa diterjemahkan, mengikuti token tema, aksesibel (berupa list terurut), dan tanpa JS.
- *Alternatif:* Mermaid (butuh runtime JS besar), gambar statis (susah diubah dan tidak bisa diterjemahkan).

### 5. Proses desain dengan empat skill
```
 design-taste-frontend ──▶ image-to-code ──▶ implementasi ──▶ playwright-cli ──▶ web-design-guidelines
  (brief → arah visual,     (mockup per        (token +          (screenshot 390 &   (audit; perbaiki
   token, tipografi,         section → kode)    komponen)         1440, ID & EN)       temuan tinggi)
   perlakuan foto)                                   ▲                                      │
                                                     └──────────── iterasi ◀────────────────┘
```
Arah desain dicatat di `openspec/changes/build-portfolio-site/design-direction.md` sebelum halaman dibangun. Setiap tahap menyimpan artefak (kutipan keputusan, screenshot, temuan audit) ke `src/content/build-log/` sebagai bahan `/how-i-built-this`.

### 6. Font di-host sendiri
Font dipasang via Fontsource (paket npm), bukan Google Fonts CDN, supaya tidak ada request pihak ketiga dan performa tetap terjaga: Bricolage Grotesque (display, sumbu opsz), Hanken Grotesk (teks), dan JetBrains Mono (identifier kode di diagram). Font display di-preload.

### 6a. Beranda sebagai cerita, project ditempatkan per bab
Daftar project tidak berdiri sendiri. Setiap bab di `content/home.ts` punya `projects: [slug]`, dan project `featured` yang belum ditempatkan otomatis masuk bab terakhir. Pemilik cukup menambah folder project; tidak ada kode yang perlu diubah.
- *Alternatif ditolak:* grid "Karya Pilihan" terpisah ditambah garis waktu terpisah (versi pertama). Isinya berulang, dan pemilik menilainya kaku.

### 6b. Navigasi: header statis + tombol menu + `<dialog>`
Header ikut tergulir. Tombol menu bundar `fixed` muncul setelah header keluar dari viewport (IntersectionObserver, tanpa scroll listener) dan membuka `<dialog>` layar penuh. Memakai `<dialog>` memberi focus trap, Esc, dan top layer secara native.
- *Alternatif ditolak:* navigasi pill melayang. Pemilik menilainya menutupi konten.

### 6c. Lightbox global
Satu komponen `Lightbox` di layout menangani semua `a[data-lightbox]`. Komponen `Zoomable` membungkus gambar mana pun dan membuat versi besar (maks. 2400 px, webp) lewat `getImage`, sementara file asli ditautkan sebagai "Buka ukuran asli". Klik dengan Ctrl/Cmd tetap membuka tab baru.

### 7. Deploy: GitHub → Vercel Hobby, domain is-a.dev
- Repo publik `yantogio/portfolio` (nama final ditentukan saat setup). Vercel mendeteksi Astro otomatis, tanpa adapter karena output statis.
- `@vercel/analytics` (komponen Astro `<Analytics />`) di layout. Tanpa cookie dan tanpa UI publik. Data hanya ada di tab Analytics dashboard Vercel.
- Domain: PR ke repo `is-a-dev/register` berisi `domains/yantogio.json` dengan record CNAME ke target yang diberikan Vercel. Sambil menunggu approval, situs hidup di `*.vercel.app`.
- Semua akun dibuat sendiri oleh Yanto ("Continue with GitHub"). Claude hanya memandu dan tidak pernah menerima kredensial.

### 8. Konten case study dari repo
Claude membaca README dan `openspec/` tiap repo (via GitHub API atau clone ke direktori sementara), menyusun draft ID terlebih dahulu, lalu draft EN. Struktur tiap case study: Masalah → Pendekatan (termasuk spec/AI) → Arsitektur → Bukti (test, CI) → Yang dipelajari. Angka dikutip apa adanya dari sumber. Yanto mereview sebelum rilis. Denso disusun dari CV, berupa diagram dan teks saja (`confidential: true`).

## Risks / Trade-offs

- **[Skill image-to-code mengasumsikan bisa membuat gambar mockup sendiri]** → Terjadi: di versi pertama tidak ada alat generasi gambar, sehingga desain langsung dikodekan. Di versi kedua, Canva generate-image tersedia dan menghasilkan 4 dari 7 gambar section sebelum kuota kredit habis. Pratinjau yang dikembalikan hanya 199×112 px, jadi yang diekstrak adalah komposisi, palet, dan hierarki. Tiga section sisanya dirancang mengikuti sistem yang sama.
- **[Data pribadi tertulis literal di dokumen repo]** → Ditemukan saat revisi: scenario privasi dan task 7.4 sempat memuat data CV secara literal. Keduanya diganti dengan deskripsi pola, dan riwayat git dibersihkan sebelum push pertama. `check-privacy.mjs` sengaja hanya memakai pola umum.
- **[Approval is-a.dev bisa lama atau ditolak]** → Situs tetap jalan di `*.vercel.app`. Domain bisa diganti nanti tanpa mengubah kode (cukup `site` di `astro.config`).
- **[Isi case study keliru karena Yanto lupa detail]** → Semua klaim diambil dari repo. Yanto mereview, dan klaim yang tidak bisa diverifikasi dihapus.
- **[Data pribadi bocor ke HTML]** → Profil hanya memuat field yang boleh publik. Ada pemeriksaan otomatis (grep build output) untuk nomor HP, tanggal lahir, dan data sensitif lain sebelum deploy.
- **[Screenshot sistem internal Denso]** → Project bertanda `confidential` tidak merender galeri maupun link repo.
- **[Kuota Vercel Hobby/Analytics]** → Situs portofolio jauh di bawah batas gratis. Bila batas analytics tercapai, data berhenti dikumpulkan tapi situs tetap jalan.
- **[Satu tema tanpa dark mode]** → Pilihan sadar dari pemilik. Kontras tetap diaudit WCAG AA.
- **[Foto belum tersedia saat build]** → Placeholder netral dipakai sampai `portrait.jpg` ditaruh. Build tidak boleh gagal.

## Migration Plan

Proyek baru, tidak ada migrasi. Urutan rilis: build lokal → push GitHub → import ke Vercel (preview) → review Yanto → production di `*.vercel.app` → PR is-a.dev → tambah domain di Vercel. Rollback dilakukan dengan "Promote" deployment sebelumnya di dashboard Vercel.

## Open Questions

- ~~Nama repo~~ → `portfolio`.
- ~~Cara menampilkan foto~~ → bingkai 24px di hero, bisa diklik ke lightbox; foto per bab opsional.
- ~~CV versi EN~~ → belum dibutuhkan; situs EN otomatis memakai CV ID dengan keterangan bahasa.
- Foto profil dan PDF sertifikat/CV belum ditaruh pemilik (task 9.2).
