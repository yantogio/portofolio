import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * projects/<slug>/id.md & en.md
 * id entri = "<slug>/<lang>", mis. "smart-wealth-monitor/en".
 */
const projects = defineCollection({
  loader: glob({
    pattern: '*/{id,en}.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    period: z.coerce.string(),
    stack: z.array(z.string()).min(1),
    repo: z.url().optional(),
    demo: z.url().optional(),
    highlights: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    confidential: z.boolean().default(false),
    /** Diagram arsitektur: langkah berurutan dari kiri ke kanan / atas ke bawah. */
    diagram: z
      .object({
        caption: z.string().optional(),
        nodes: z.array(z.object({ label: z.string(), note: z.string().optional() })).min(2),
      })
      .optional(),
    /** Keterangan opsional untuk screenshot: { "01-dashboard.png": "Dashboard utama" } */
    captions: z.record(z.string(), z.string()).default({}),
  }),
});

/** certificates/certificates.yaml — daftar metadata; PDF & thumbnail di folder yang sama. */
const certificates = defineCollection({
  loader: file('./src/content/certificates/certificates.yaml'),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string().regex(/^\d{4}(-\d{2})?(-\d{2})?$/, 'Format tanggal: YYYY, YYYY-MM, atau YYYY-MM-DD'),
    file: z.string().optional(),
    thumb: z.string().optional(),
  }),
});

/** build-log/NN-tahap.id.md & .en.md */
const buildLog = defineCollection({
  loader: glob({
    pattern: '*.{id,en}.md',
    base: './src/content/build-log',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      stage: z.string(),
      order: z.number(),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { projects, certificates, 'build-log': buildLog };
