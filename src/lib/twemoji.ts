import twemoji from '@twemoji/api';

export function parseEmoji(emoji: string, fallback = '🐱'): string {
  return twemoji.parse(emoji || fallback, { folder: 'svg', ext: '.svg' });
}
