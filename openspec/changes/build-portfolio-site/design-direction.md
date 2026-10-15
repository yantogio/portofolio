# Design Direction (v2)

> v1 ("gambar kerja": terang, tajam, mono, oranye industri) ditolak pemilik setelah review karena terasa kaku, industrial, dan masih seperti buatan AI. Dokumen ini menggantikannya.

**Design read:** portofolio developer untuk recruiter dan publik, dengan bahasa visual editorial yang hangat dan premium, disusun sebagai satu cerita perjalanan. Implementasi memakai native CSS + Tailwind v4, display grotesk yang berkarakter, dan motion scroll yang bertujuan.

**Dials:** DESIGN_VARIANCE 8 · MOTION_INTENSITY 6 · VISUAL_DENSITY 3.

## Proses (5 skill)

1. **design-taste-frontend** memilih arah, token, dan aturan anti-slop.
2. **image-to-code** menghasilkan referensi visual per section lewat Canva generate-image: hero, pernyataan, perjalanan awal, dan perjalanan 2026 dengan kartu project. Tiga section lainnya (cara kerja, kredensial, kontak) gagal dibuat karena kuota kredit Canva habis, sehingga dirancang mengikuti sistem yang sama. Pratinjau yang dikembalikan hanya 199×112 px, jadi yang diekstrak adalah komposisi, palet, dan hierarki, bukan detail piksel.
3. Implementasi di Astro.
4. **playwright-cli** untuk screenshot dan uji perilaku.
5. **web-design-guidelines** untuk audit.

## Struktur beranda

1. **Hero:** split editorial 7/5. Penanda ketersediaan, nama lengkap sebagai headline dua baris dengan titik amber, ringkasan profesional dari CV, tombol pill amber "Lihat pengalaman" dan Unduh CV. Foto portrait di bingkai 24px, sedikit turun dari garis atas, dengan nama dan lokasi di atas gradasi bawah.
2. **Keahlian** (menggantikan paragraf profil, yang ditolak pemilik karena terasa mengganggu): empat bidang sebagai baris display besar. Saat disorot, baris lain meredup dan baris aktif membuka untuk menampilkan stack teknologi serta satu project sebagai bukti. Di layar sentuh dan HP, semuanya selalu terbuka.
3. **Perjalanan:** enam bab. Tahun raksasa bergaris luar menempel di kolom kiri; di kanan ada ikon, judul, tempat, dan satu kalimat pelajaran. Project muncul di bab tahunnya: Denso di 2025, sementara HMTI, Airline, Smart Wealth, dan Vehicle di 2026. Kartu pertama dan kartu ganjil terakhir dibuat lebar.
4. **Cara kerja:** judul dan pernyataan menempel di kiri; empat kartu besar di kanan menumpuk saat digulir (sticky, offset 1.5rem). Kartu pertama berwarna tulang.
5. **Kredensial:** pendidikan di kiri, sertifikat di kanan sebagai baris dengan garis tipis.
6. **Kontak:** headline display "Terbuka untuk / peluang baru.", email berukuran display, lalu tombol LinkedIn, GitHub, dan CV.

## Token

| Token | Nilai | Pakai |
|---|---|---|
| `bg` | `#0f1411` | latar (hitam kehijauan) |
| `surface` / `surface-2` | `#161d19` / `#1d2621` | kartu, node diagram |
| `fg` | `#ece6da` | teks utama (tulang) |
| `fg-2` | `#a8a69c` | teks sekunder |
| `fg-3` | `#6c7068` | kata yang belum menyala, angka dekoratif |
| `line` | `rgb(236 230 218 / .12)` | garis tipis |
| `accent` | `#e9a23b` | satu aksen amber; teks di atasnya memakai `bg` |

Satu tema, tanpa toggle. Butiran film halus dipasang sebagai lapisan tetap (`pointer-events: none`).

## Tipografi

- **Bricolage Grotesque Variable** (opsz) untuk display, weight 600, tracking -0.03em.
- **Hanken Grotesk Variable** untuk teks.
- **JetBrains Mono** hanya untuk identifier kode di diagram.

## Bentuk

Radius: kartu dan gambar 24px, node diagram 12px, tombol dan chip selalu pill. Bayangan hanya pada tombol menu.

## Navigasi

Navigasi pill melayang (v2 awal) ditolak pemilik karena menutupi konten. Penggantinya: header biasa di atas halaman yang ikut tergulir hilang, ditambah tombol menu bundar warna tulang di pojok kanan atas. Tombol ini selalu ada di HP, dan di desktop baru muncul setelah header tidak terlihat (IntersectionObserver). Tombol membuka `<dialog>` layar penuh berisi link display besar yang muncul berurutan, email, dan pengalih bahasa. Esc menutup menu dan fokus kembali ke tombol.

## Motion

- Headline naik dari balik masker, berurutan.
- Foto masuk dengan skala 1.06 → 1.
- Baris keahlian membuka dengan transisi `grid-template-rows`.
- Foto bab: bila lebih dari satu, ditumpuk miring (±5°) dan bergantian tiap 5 detik dengan transisi transform. Rotasi berhenti saat disorot, di luar layar, atau tab tidak aktif.
- Reveal saat masuk viewport lewat IntersectionObserver.
- Kartu project terangkat 4px saat hover dan ikon panahnya berubah amber.
- Semua dimatikan saat `prefers-reduced-motion: reduce`.

## Anti-slop

Tanpa em-dash, tanpa gradien ungu, tanpa glassmorphism (navigasi memakai blur ringan di atas latar solid 90%), tanpa skill bar, tanpa grid logo, tanpa eyebrow bernomor, dan setiap angka berasal dari repo atau CV.
