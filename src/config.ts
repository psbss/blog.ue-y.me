export const siteConfig = {
  title: 'MoreCuriosity',
  defaultTitle: 'More Curiosity | Uetyo',
  author: '上ちょ / uetyo',
  bioText: '都内で働くiOSエンジニア(4年目)',
  description: '辛い時は筋トレで追い込むiOSエンジニアです',
  siteUrl: 'https://blog.ue-y.me',
  social: {
    x: 'psnzbss',
    github: 'psbss',
    speakerDeck: 'uetyo',
  },
  categories: [
    { name: 'Dev', slug: 'dev', color: '#007ab8' },
    { name: 'Life', slug: 'life', color: '#839e1a' },
    { name: 'Other', slug: 'other', color: '#6d4bf5' },
  ] as const,
};

export type CategorySlug = 'dev' | 'life' | 'other';

export function getCategoryBySlug(slug: string) {
  return siteConfig.categories.find((cat) => cat.slug === slug);
}
