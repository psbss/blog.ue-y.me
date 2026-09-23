// @ts-check
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import twemoji from '@twemoji/api';

const SVG_PATH_PATTERN = /\/twemoji\/svg\/([0-9a-f-]+)\.svg/g;
const CONCURRENCY = 8;

/** Recursively list every .html file under `dir`. */
async function listHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return listHtmlFiles(path);
      return entry.name.endsWith('.html') ? [path] : [];
    }),
  );
  return files.flat();
}

/** Collect the unique twemoji ids referenced by the generated HTML. */
async function collectEmojiIds(dir) {
  const ids = new Set();
  for (const file of await listHtmlFiles(dir)) {
    const html = await readFile(file, 'utf-8');
    for (const match of html.matchAll(SVG_PATH_PATTERN)) {
      ids.add(match[1]);
    }
  }
  return [...ids].sort();
}

async function fetchSvg(id) {
  const url = `${twemoji.base}svg/${id}.svg`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

/** Run `task` over `items` with at most `limit` in flight; fails fast on the first error. */
async function mapWithLimit(items, limit, task) {
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const item = items[next++];
      await task(item);
    }
  });
  await Promise.all(workers);
}

/**
 * Downloads the Twemoji SVGs referenced by the built HTML into `dist/twemoji/svg/`
 * so that the site does not depend on the jsDelivr CDN at runtime.
 * @returns {import('astro').AstroIntegration}
 */
export function twemojiAssets() {
  return {
    name: 'twemoji-assets',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const ids = await collectEmojiIds(outDir);
        if (ids.length === 0) {
          logger.info('No twemoji references found.');
          return;
        }

        const svgDir = join(outDir, 'twemoji', 'svg');
        await mkdir(svgDir, { recursive: true });
        await mapWithLimit(ids, CONCURRENCY, async (id) => {
          const svg = await fetchSvg(id);
          await writeFile(join(svgDir, `${id}.svg`), svg);
        });

        logger.info(`Fetched ${ids.length} twemoji SVG(s) from ${twemoji.base}`);
      },
    },
  };
}
