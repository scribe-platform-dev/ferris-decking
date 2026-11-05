import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Loose on purpose: an editor adding a field in Scribe shouldn't fail the
// build before the template has had a chance to render it.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/services' }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      order: z.number().optional(),
    })
    .passthrough(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z
    .object({
      title: z.string(),
      location: z.string(),
      projectType: z.string(),
      size: z.string().optional(),
      order: z.number().optional(),
    })
    .passthrough(),
});

export const collections = { services, projects };
