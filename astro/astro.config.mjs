// @ts-check
import { defineConfig } from 'astro/config';

// Site metadata
export const siteMetadata = {
  title: 'MoreCuriosity',
  author: '上ちょ / uetyo',
  bioText: '都内で働くiOSエンジニア(4年目)',
  description: '辛い時は筋トレで追い込むiOSエンジニアです',
  social: {
    x: 'psnzbss',
    github: 'psbss',
    speakerDeck: 'uetyo',
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.ue-y.me/',
});
