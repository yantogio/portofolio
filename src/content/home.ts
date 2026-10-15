/**
 * Teks beranda (dua bahasa). Ubah teks di sini; struktur halaman tidak perlu disentuh.
 */
type L = { id: string; en: string };

export const hero = {
  /** Tiap baris tampil terpisah. Bagian `accent` berwarna amber. */
  lines: [
    { id: 'Muhammad Hariyanto', en: 'Muhammad Hariyanto' },
    { id: 'Gionova.', en: 'Gionova.', accent: { id: '.', en: '.' } },
  ] as (L & { accent?: L })[],
  lede: {
    id: 'Lulusan Teknik Informatika dengan 12 bulan magang sebagai Software Developer di PT Denso Manufacturing Indonesia. Membangun REST API dan aplikasi web yang teruji sejak awal.',
    en: 'Informatics Engineering graduate with a 12-month Software Developer internship at PT Denso Manufacturing Indonesia. I build REST APIs and web apps that are tested from the start.',
  } as L,
  cta: { id: 'Lihat pengalaman', en: 'View Experience' } as L,
};

/**
 * Keahlian: tiap bidang tampil sebagai baris besar; arahkan kursor untuk melihat stack
 * dan project yang membuktikannya. `proof.href` mengarah ke halaman project.
 */
export const capabilities = {
  title: { id: 'Keahlian', en: 'Capabilities' } as L,
  areas: [
    {
      name: { id: 'Backend', en: 'Backend' } as L,
      stack: ['PHP', 'Laravel', 'CodeIgniter 3', 'NestJS', 'Spring Boot', 'Python', 'REST API'],
      proof: { label: 'Vehicle Registry', note: { id: 'arsitektur berlapis', en: 'layered architecture' } as L, href: '/projects/vehicle-registry' },
    },
    {
      name: { id: 'Frontend', en: 'Frontend' } as L,
      stack: ['Vue 3', 'React', 'JavaScript', 'Tailwind CSS', 'Bootstrap'],
      proof: { label: 'HMTI Organisation System', note: { id: 'skripsi, nilai A', en: 'thesis, graded A' } as L, href: '/projects/hmti-organisation-system' },
    },
    {
      name: { id: 'Database', en: 'Database' } as L,
      stack: ['SQL Server', 'MySQL', 'SQLite', 'Prisma', 'Eloquent'],
      proof: { label: 'Airline Voucher Seats', note: { id: 'tanpa voucher ganda', en: 'no duplicate vouchers' } as L, href: '/projects/airline-voucher-seats' },
    },
    {
      name: { id: 'Testing & Tools', en: 'Testing & Tools' } as L,
      stack: ['PHPUnit', 'GitHub Actions CI', 'OpenSpec', 'Git'],
      proof: { label: 'Smart Wealth Monitor', note: { id: '39 test + CI', en: '39 tests + CI' } as L, href: '/projects/smart-wealth-monitor' },
    },
    {
      name: { id: 'Data & Otomasi', en: 'Data & Automation' } as L,
      stack: ['Power BI', 'Power Automate', 'Power Apps', 'Excel'],
      proof: { label: 'PT Denso', note: { id: 'magang 12 bulan', en: '12-month internship' } as L, href: '/projects/denso-facility-reporting' },
    },
  ],
};

export const journey = {
  title: { id: 'Pengalaman', en: 'Experience' } as L,
  intro: {
    id: 'Riwayat pendidikan dan pekerjaan, beserta project yang dikerjakan pada setiap periode.',
    en: 'Education and work history, alongside the projects completed in each period.',
  } as L,
  /**
   * `projects`: slug folder project yang tampil di bab ini.
   * Project `featured` yang belum disebut di bab mana pun otomatis masuk ke bab terakhir.
   * `icon`: nama ikon Phosphor. Foto opsional: src/assets/journey/<year>.jpg
   */
  steps: [
    {
      year: '2015',
      range: '2015-2018',
      icon: 'wrench',
      title: { id: 'SMK Teknik Pemesinan', en: 'Vocational School, Machining' } as L,
      place: 'SMK Saraswati Salatiga',
      takeaway: {
        id: 'Pendidikan kejuruan teknik pemesinan: membaca gambar teknik dan mengoperasikan mesin bubut dengan toleransi ukuran yang presisi.',
        en: 'Vocational training in mechanical machining: reading technical drawings and operating lathes to precise tolerances.',
      } as L,
    },
    {
      year: '2018',
      range: '2018-2020',
      icon: 'package',
      title: { id: 'Staf Logistik', en: 'Logistics Staff' } as L,
      place: 'PT Karya Insan Sehati',
      takeaway: {
        id: 'Mengatur pengiriman sesuai jadwal distribusi, memantau stok barang, dan menyusun laporan distribusi harian.',
        en: 'Scheduled deliveries, monitored stock levels, and prepared daily distribution reports.',
      } as L,
    },
    {
      year: '2020',
      range: '2020-2022',
      icon: 'storefront',
      title: { id: 'Sales Marketing', en: 'Sales Marketing' } as L,
      place: 'Telkom IndiHome',
      takeaway: {
        id: 'Memasarkan layanan internet kepada pelanggan baru dan existing melalui presentasi produk dan kunjungan langsung.',
        en: 'Marketed internet services to new and existing customers through product presentations and direct visits.',
      } as L,
    },
    {
      year: '2022',
      range: '2022-2026',
      icon: 'student',
      title: { id: 'Kuliah Teknik Informatika', en: 'Informatics Engineering Degree' } as L,
      place: 'Universitas Bani Saleh',
      takeaway: {
        id: 'IPK 3,58. Bendahara Himpunan Mahasiswa Teknik Informatika selama satu periode, bertanggung jawab atas pengelolaan dan pelaporan keuangan.',
        en: 'GPA 3.58. Treasurer of the Informatics Student Association for one term, responsible for financial management and reporting.',
      } as L,
    },
    {
      year: '2025',
      range: 'Jan-Des 2025',
      icon: 'factory',
      title: { id: 'Software Developer Intern', en: 'Software Developer Intern' } as L,
      place: 'PT Denso Manufacturing Indonesia',
      takeaway: {
        id: 'Membangun sistem pelaporan keluhan fasilitas end-to-end, dasbor Power BI untuk daily check sheet, dan aplikasi pemindai barcode berbasis Power Apps.',
        en: 'Built an end-to-end facility complaint reporting system, a Power BI dashboard for daily check sheets, and a Power Apps barcode scanner.',
      } as L,
      projects: ['denso-facility-reporting'],
    },
    {
      year: '2026',
      range: '2026',
      icon: 'graduation-cap',
      title: { id: 'Lulus, skripsi nilai A', en: 'Graduated, thesis graded A' } as L,
      place: 'Universitas Bani Saleh · IPK 3,58',
      takeaway: {
        id: 'Lulus sidang skripsi dengan nilai A. Project berikut dikerjakan dengan kebutuhan yang ditulis lebih dulu sebagai skenario yang bisa diuji, lalu dibuktikan dengan automated test.',
        en: 'Passed the thesis defence with an A. The projects below were built by writing requirements first as testable scenarios, then proving them with automated tests.',
      } as L,
      projects: ['hmti-organisation-system', 'airline-voucher-seats', 'smart-wealth-monitor', 'vehicle-registry'],
    },
  ] as {
    year: string;
    range: string;
    icon: string;
    title: L;
    place: string;
    takeaway: L;
    projects?: string[];
  }[],
};

export const process = {
  title: { id: 'Metode kerja', en: 'How I Work' } as L,
  intro: {
    id: 'AI mempercepat pengembangan. Spesifikasi dan test menjaga kualitasnya.',
    en: 'AI accelerates development. Specifications and tests safeguard its quality.',
  } as L,
  steps: [
    {
      title: { id: 'Spesifikasi', en: 'Specification' } as L,
      body: {
        id: 'Kebutuhan ditulis dulu sebagai skenario yang bisa diuji, sebelum mulai coding. Saya memakai OpenSpec untuk ini, sehingga pengembangan berbantuan AI tetap terarah.',
        en: 'Requirements are written first as testable scenarios, before any coding starts. I use OpenSpec for this, which keeps AI-assisted development on course.',
      } as L,
      evidence: { id: '16 change terarsip di skripsi HMTI', en: '16 archived changes in the HMTI thesis' } as L,
      href: '/projects/hmti-organisation-system',
    },
    {
      title: { id: 'Pengembangan', en: 'Development' } as L,
      body: {
        id: 'AI membantu menyusun kode, sementara saya mengarahkan dan meninjau setiap perubahan. Keputusan arsitektur, seperti letak aturan bisnis dan jaminan di level database, tetap saya tentukan.',
        en: 'AI helps draft the code while I direct and review every change. Architectural decisions, such as where business rules live and what the database guarantees, remain mine.',
      } as L,
      evidence: { id: 'Proses pembuatan situs ini', en: 'How this site was built' } as L,
      href: '/how-i-built-this',
    },
    {
      title: { id: 'Pengujian', en: 'Testing' } as L,
      body: {
        id: 'Setiap skenario di spesifikasi diterjemahkan menjadi test otomatis, sehingga setiap perubahan bisa diperiksa ulang dalam hitungan detik.',
        en: 'Every scenario in the specification becomes an automated test, so every change can be checked again in seconds.',
      } as L,
      evidence: { id: '98 test, termasuk aturan kursi yang diuji 250 kali per tipe pesawat', en: '98 tests, including seat rules tested 250 times per aircraft type' } as L,
      href: '/projects/airline-voucher-seats',
    },
    {
      title: { id: 'Rilis', en: 'Release' } as L,
      body: {
        id: 'CI menjalankan seluruh test pada setiap push. Perubahan baru dirilis setelah semuanya lolos.',
        en: 'CI runs the full suite on every push. Changes are released only once everything passes.',
      } as L,
      evidence: { id: 'CI GitHub Actions di setiap push', en: 'GitHub Actions CI on every push' } as L,
      href: '/projects/smart-wealth-monitor',
    },
  ],
};

export const education = [
  {
    years: '2022-2026',
    title: { id: 'S1 Teknik Informatika', en: 'BSc Informatics Engineering' } as L,
    place: 'Universitas Bani Saleh, Bekasi',
    detail: {
      id: 'IPK 3,58 / 4,00. Skripsi nilai A (Juli 2026).',
      en: 'GPA 3.58 / 4.00. Thesis graded A (July 2026).',
    } as L,
  },
  {
    years: '2015-2018',
    title: { id: 'SMK Teknik Pemesinan', en: 'Vocational High School, Machining' } as L,
    place: 'SMK Saraswati Salatiga',
    detail: { id: '', en: '' } as L,
  },
];

export const contact = {
  lines: [
    { id: 'Terbuka untuk', en: 'Open to' },
    { id: 'peluang baru.', en: 'new opportunities.', accent: { id: '.', en: '.' } },
  ] as (L & { accent?: L })[],
  body: {
    id: 'Untuk peran Software Developer, Web Developer, Backend, Full-stack, maupun Data Analyst. Silakan hubungi saya melalui email.',
    en: 'For Software Developer, Web Developer, Backend, Full-stack, or Data Analyst roles. Please get in touch by email.',
  } as L,
};
