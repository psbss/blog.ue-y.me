// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import legacyMarkdown from './src/lib/legacy-markdown.mjs';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.ue-y.me',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkGfm, legacyMarkdown],
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }],
    ],
    syntaxHighlight: 'prism',
  },
  integrations: [sitemap()],
});
