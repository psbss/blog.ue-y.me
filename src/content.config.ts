import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.enum(['dev', 'life', 'other']),
    description: z.string().default(''),
    emoji: z.string().default('🐱'),
  }),
});

export const collections = { blog };
