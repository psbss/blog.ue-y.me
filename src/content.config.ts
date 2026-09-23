import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  date: z.string(),
  category: z.enum(['dev', 'life', 'other']),
  description: z.string().default(''),
  emoji: z.string().default('🐱'),
});

/** Posts shown in the listings. */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: postSchema,
});

/** Posts kept online but unlinked from the listings. Reachable only from /archive/. */
const archive = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/archive' }),
  schema: postSchema,
});

export const collections = { posts, archive };
