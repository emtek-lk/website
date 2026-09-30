import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { services } from './data/services';

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

// One Markdown file per case study in src/content/projects/. Files starting with "_" are ignored.
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/[^_]*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      industry: z.string(),
      summary: z.string().max(200),
      services: z.array(z.enum(serviceSlugs)).min(1),
      technologies: z.array(z.string()).default([]),
      year: z.number().int(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Lower numbers are listed first */
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
