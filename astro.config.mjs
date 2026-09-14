// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { legacyMarkdown, externalLinks } from './src/lib/satteri-plugins.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.ue-y.me',
  trailingSlash: 'always',
  markdown: {
    processor: satteri({
      mdastPlugins: [legacyMarkdown],
      hastPlugins: [externalLinks],
    }),
    syntaxHighlight: 'prism',
  },
  integrations: [sitemap()],
});
