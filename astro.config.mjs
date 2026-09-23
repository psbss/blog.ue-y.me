// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { legacyMarkdown, externalLinks, imageSizes } from './src/lib/satteri-plugins.mjs';
import { getArchivedSlugs } from './src/lib/archived-slugs.mjs';
import { twemojiAssets } from './src/integrations/twemoji.mjs';

const archivedSlugs = getArchivedSlugs();

/** Keep archived posts and the archive index itself out of the sitemap. */
function isIndexablePage(page) {
  const path = new URL(page).pathname.replace(/^\/|\/$/g, '');
  return path !== 'archive' && !archivedSlugs.has(path);
}

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

  integrations: [sitemap({ filter: isIndexablePage }), twemojiAssets()],
});
