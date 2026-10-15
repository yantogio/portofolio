/**
 * Data identitas: satu-satunya file yang perlu diubah untuk nama, headline,
 * status kerja, dan link kontak. JANGAN tambahkan data pribadi sensitif
 * (nomor HP, tanggal lahir, agama, status pernikahan, alamat detail).
 */
export const profile = {
  fullName: 'Muhammad Hariyanto Gionova',
  shortName: 'Yanto',
  location: 'Bekasi, Indonesia',

  headline: {
    id: 'Software Developer: REST API, automated test, dan pengembangan berbasis spesifikasi.',
    en: 'Software Developer: REST APIs, automated testing, and specification-driven development.',
  },

  /**
   * Status kerja.
   * - `openToWork: true`  → tampil penanda "terbuka untuk kerja" dengan teks `available`.
   * - `openToWork: false` → tampil teks `current` (mis. "Software Developer di PT X").
   *   Kosongkan `current` bila tidak ingin menampilkan apa pun.
   */
  openToWork: true,
  status: {
    available: {
      id: 'Terbuka untuk peran Software Developer · Bekasi / Remote',
      en: 'Open to Software Developer roles · Bekasi / Remote',
    },
    current: {
      id: '',
      en: '',
    },
  },

  contact: {
    email: 'muhhariyantogionova@gmail.com',
    linkedin: 'https://linkedin.com/in/muhammad-hariyanto-gionova-586298422',
    github: 'https://github.com/yantogio',
  },
} as const;

export type Lang = 'id' | 'en';
