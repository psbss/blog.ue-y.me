// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { legacyMarkdown, externalLinks, imageSizes } from './src/lib/satteri-plugins.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.ue-y.me',
  trailingSlash: 'always',

  markdown: {
    processor: satteri({
      mdastPlugins: [legacyMarkdown],
      hastPlugins: [externalLinks, imageSizes],
    }),
    syntaxHighlight: 'prism',
  },

  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },

  integrations: [sitemap()],
});
