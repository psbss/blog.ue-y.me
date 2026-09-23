import twemoji from '@twemoji/api';

// In production the SVGs are fetched at build time by `src/integrations/twemoji.mjs`
// and served from `/twemoji/svg/`. In dev there is no dist, so fall back to the CDN.
const base = import.meta.env.PROD ? '/twemoji/' : undefined;

export function parseEmoji(emoji: string, fallback = '🐱'): string {
  return twemoji.parse(emoji || fallback, { base, folder: 'svg', ext: '.svg' });
}
