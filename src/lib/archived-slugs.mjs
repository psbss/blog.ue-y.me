import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOG_DIR = fileURLToPath(new URL('../content/blog', import.meta.url));

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

/**
 * Slugs of posts whose frontmatter sets `archived: true`.
 *
 * Content collections are not available while astro.config.mjs is evaluated,
 * so the frontmatter is read straight from disk here. Keep this in sync with
 * the `archived` field in src/content.config.ts.
 */
export function getArchivedSlugs() {
  const slugs = new Set();

  for (const file of walk(BLOG_DIR)) {
    const frontmatter = readFileSync(file, 'utf8').split(/^---\s*$/m)[1];
    if (!frontmatter) continue;
    if (!/^archived:\s*(?:"true"|'true'|true)\s*$/m.test(frontmatter)) continue;

    const id = relative(BLOG_DIR, file).split(/[\\/]/).join('/');
    slugs.add(id.replace(/\/index\.md$/, '').replace(/\.md$/, ''));
  }

  return slugs;
}
