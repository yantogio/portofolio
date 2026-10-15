import type { ImageMetadata } from 'astro';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Lang } from '@/config/profile';

/*
 * Media ditemukan otomatis dari folder — tidak perlu didaftarkan di mana pun.
 * Folder/file yang belum ada tidak membuat build gagal.
 */

type ImgModules = Record<string, { default: ImageMetadata }>;

const covers = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/projects/*/cover.{png,jpg,jpeg,webp,avif}',
  { eager: true },
) as ImgModules;

const screens = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/projects/*/screens/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
) as ImgModules;

const me = import.meta.glob<{ default: ImageMetadata }>('/src/assets/me/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
}) as ImgModules;

const journeyPhotos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/journey/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
) as ImgModules;

/** Foto opsional untuk bab perjalanan: src/assets/journey/<tahun>.jpg */
export function getJourneyPhoto(year: string): ImageMetadata | undefined {
  const key = Object.keys(journeyPhotos).find((p) => fileName(p).replace(/\.[^.]+$/, '') === year);
  return key ? journeyPhotos[key].default : undefined;
}

const certFiles =import.meta.glob<string>('/src/content/certificates/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
});

const certThumbs = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/certificates/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
) as ImgModules;

const fileName = (path: string) => path.split('/').pop() ?? path;

export function getCover(slug: string): ImageMetadata | undefined {
  const key = Object.keys(covers).find((p) => p.startsWith(`/src/content/projects/${slug}/cover.`));
  return key ? covers[key].default : undefined;
}

export interface Screen {
  src: ImageMetadata;
  file: string;
  /** "02-dca-simulator.png" → "Dca simulator" */
  label: string;
}

export function getScreens(slug: string): Screen[] {
  const prefix = `/src/content/projects/${slug}/screens/`;
  return Object.keys(screens)
    .filter((p) => p.startsWith(prefix))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((p) => {
      const file = fileName(p);
      const words = file
        .replace(/\.[^.]+$/, '')
        .replace(/^\d+[-_ ]*/, '')
        .replace(/[-_]+/g, ' ')
        .trim();
      return { src: screens[p].default, file, label: words.charAt(0).toUpperCase() + words.slice(1) };
    });
}

/** Foto diri: "portrait" (utama) atau "casual" (opsional). */
export function getPhoto(name: 'portrait' | 'casual'): ImageMetadata | undefined {
  const key = Object.keys(me).find((p) => fileName(p).replace(/\.[^.]+$/, '') === name);
  return key ? me[key].default : undefined;
}

export function getCertificateUrl(file?: string): string | undefined {
  return file ? certFiles[`/src/content/certificates/${file}`] : undefined;
}

export function getCertificateThumb(file?: string): ImageMetadata | undefined {
  return file ? certThumbs[`/src/content/certificates/${file}`]?.default : undefined;
}

/**
 * CV di public/cv/. Bila versi bahasa aktif tidak ada, pakai versi bahasa lain
 * dan beri tahu bahasanya. Mengembalikan undefined bila tidak ada CV sama sekali.
 */
export function getCv(lang: Lang): { href: string; lang: Lang } | undefined {
  const order: Lang[] = lang === 'en' ? ['en', 'id'] : ['id', 'en'];
  for (const l of order) {
    const name = `CV-Gionova-${l.toUpperCase()}.pdf`;
    if (existsSync(join(process.cwd(), 'public', 'cv', name))) {
      return { href: `/cv/${name}`, lang: l };
    }
  }
  return undefined;
}
