import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ARCHIVE_DIR = fileURLToPath(new URL('../content/archive', import.meta.url));

/**
 * Slugs of the posts stored in src/content/archive.
 *
 * Content collections are not available while astro.config.mjs is evaluated,
 * so the directory is read straight from disk here.
 */
export function getArchivedSlugs() {
  return new Set(
    readdirSync(ARCHIVE_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name),
  );
}
