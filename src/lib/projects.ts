import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/config/profile';

export type Project = CollectionEntry<'projects'> & { slug: string; lang: Lang };

function withMeta(entry: CollectionEntry<'projects'>): Project {
  const [slug, lang] = entry.id.split('/');
  return Object.assign(entry, { slug, lang: lang as Lang });
}

/** Semua project dalam satu bahasa, urut `order`. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const all = (await getCollection('projects')).map(withMeta);
  return all.filter((p) => p.lang === lang).sort((a, b) => a.data.order - b.data.order);
}

/** Slug yang punya versi id DAN en — dipakai untuk membuat halaman. */
export async function getProjectSlugs(): Promise<string[]> {
  const all = (await getCollection('projects')).map(withMeta);
  const slugs = new Set(all.map((p) => p.slug));
  return [...slugs].filter((s) => all.some((p) => p.slug === s && p.lang === 'id') && all.some((p) => p.slug === s && p.lang === 'en'));
}

export async function getProject(slug: string, lang: Lang): Promise<Project | undefined> {
  return (await getProjects(lang)).find((p) => p.slug === slug);
}
