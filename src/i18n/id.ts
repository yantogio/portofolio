export const id = {
  'meta.title': 'Yanto, Software Developer',
  'meta.description':
    'Portofolio Muhammad Hariyanto Gionova (Yanto), software developer di Bekasi: Laravel, Vue, NestJS, Spring Boot. Dibangun dengan bantuan AI, dibuktikan dengan spec dan test.',

  'nav.work': 'Karya',
  'nav.capabilities': 'Keahlian',
  'nav.journey': 'Pengalaman',
  'nav.process': 'Metode Kerja',
  'nav.credentials': 'Kredensial',
  'nav.contact': 'Kontak',
  'nav.skip': 'Lewati ke konten',
  'nav.menu': 'Menu',
  'nav.home': 'Beranda',

  'lang.switch': 'English',
  'lang.switchLabel': 'Baca dalam bahasa Inggris',

  'hero.viewWork': 'Lihat karya',
  'hero.downloadCv': 'Unduh CV',
  'hero.photoAlt': 'Foto Muhammad Hariyanto Gionova (Yanto)',

  'section.work': 'Karya Pilihan',
  'section.journey': 'Perjalanan',
  'section.process': 'Cara Kerja',
  'section.credentials': 'Sertifikasi & Pendidikan',
  'section.contact': 'Kontak',

  'project.github': 'GitHub',
  'project.live': 'Live',
  'project.detail': 'Detail',
  'project.external': '(membuka tab baru)',
  'project.stack': 'Teknologi',
  'project.role': 'Peran',
  'project.period': 'Periode',
  'project.architecture': 'Arsitektur',
  'project.gallery': 'Tangkapan layar',
  'project.confidential': 'Sistem internal perusahaan, ditampilkan sebagai diagram, tanpa tangkapan layar.',
  'project.allRepos': 'Semua repositori di GitHub',
  'project.back': 'Kembali ke pengalaman',
  'project.screenshot': 'Tangkapan layar',
  'project.close': 'Tutup',
  'lightbox.zoom': 'Perbesar foto',
  'lightbox.original': 'Buka ukuran asli',

  'credentials.certificates': 'Sertifikasi',
  'credentials.education': 'Pendidikan',
  'credentials.viewPdf': 'Lihat PDF',

  'cv.download': 'Unduh CV',
  'cv.inLanguage': '',

  'contact.email': 'Email',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',

  'footer.buildLog': 'Bagaimana situs ini dibuat',
  'footer.source': 'Kode sumber',

  'buildlog.title': 'Bagaimana situs ini dibuat',
  'buildlog.description': 'Proses pembuatan portofolio ini: dari spec, arah desain, pembangunan, verifikasi, hingga audit.',

  'notfound.title': 'Halaman tidak ditemukan',
  'notfound.body': 'Alamat ini tidak ada. Mungkin tautannya sudah berubah.',
  'notfound.back': 'Kembali ke beranda',
} as const;

export type Dict = { [K in keyof typeof id]: string };
