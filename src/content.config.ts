import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.enum(['dev', 'life', 'other']),
    description: z.string().default(''),
    emoji: z.string().default('🐱'),
    archived: z.boolean().default(false),
  }),
});

export const collections = { blog };
